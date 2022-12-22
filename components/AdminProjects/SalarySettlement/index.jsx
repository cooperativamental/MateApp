 import { MultiSelect } from "../../MultiSelect";
import { useRouter } from "next/router";
import { sendEmail } from "../../../functions/sendMail"
import { useHost } from "../../../context/host";
import InputSelect from "../../Elements/InputSelect"
import ComponentButton from "../../Elements/ComponentButton";

const SalarySettlement = ({ keyPrj, project }) => {

  const router = useRouter()
  const { host } = useHost()
  const [teams, setTeams] = useState()
  const [partners, setPartners] = useState({
    state: false,
    data: {}
  })
  const [selectPartners, setSelectPartners] = useState({})
  const [salarySettlement, setSalarySettlement] = useState({})
  const [validation, setValidation] = useState()
  const [error, setError] = useState({})

  useEffect(() => {
    if (user) {
      get(ref(db, "teams"))
        .then(res => {
          setTeams(res.val())
        })
    }
  }, [db, user])

  const handlerSalarySettlement = (e, userId) => {
    const value = Number(e.target.value)
    let total = 0
    Object.entries(salarySettlement?.partners)
      .forEach(([key, val]) => {
        key === userId
          ?
          (total += value)
          :
          (total += val.amount)
      })
    e.target.name === "thirdParties" ? total += value : total += salarySettlement.thirdParties.amount
    if (e.target.name === "thirdParties") {
      setSalarySettlement({ ...salarySettlement, thirdParties: { amount: value } })
    } else {
      setSalarySettlement(
        {
          ...salarySettlement,
          partners: {
            ...salarySettlement.partners,
            [userId]: {
              ...salarySettlement.partners[userId],
              amount: value
            }
          }
        }
      )
    }
  }

  useEffect(() => {
    if (user) {
      if (salarySettlement.partners) {
        let allAmount = 0
        Object.entries(salarySettlement.partners).map(([key, value]) => {
          allAmount += value.amount
        })
        if (salarySettlement.thirdParties.amount > 0) {
          allAmount += salarySettlement.thirdParties.amount
        }
        setValidation(validation => ({
          ...validation,
          available: Number(((project?.totalNeto / project?.percentage) - allAmount).toFixed(2)),
          salarySettlement: allAmount === Number((project?.totalNeto / project?.percentage).toFixed(2)),
        }))
      }
    }
  }, [db, user, salarySettlement])

  const confirmSalarySettlement = () => {
    const newDate = new Date();
    const date = [
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
    ].join("-");

    update(ref(db, `projects/${keyPrj}`), { status: "PAID" })
      .then(res => {
        if (!validation?.thirdParties) {
          update(
            ref(db, `projects/${keyPrj}/thirdParties/`),
            {
              salarysettlement: Number((project.thirdParties.salarysettlement ?
                project.thirdParties.salarysettlement + salarySettlement.thirdParties.amount :
                salarySettlement.thirdParties.amount).toFixed(2))
            }
          )
        }
        Object.entries(salarySettlement.partners).map(([partnerUID, valuePartner]) => {
          if (valuePartner.amount > 0) {
            const SalarySettlementRef = ref(db, "salarysettlement/" + partnerUID);
            const pushSalarySettlement = push(SalarySettlementRef);

            set(pushSalarySettlement, {
              client: project.client,
              nameProject: project.nameProject,
              amount: valuePartner.amount,
              name: valuePartner.name,
              date: date,
              currency: project.currency,
              createdAt: serverTimestamp(),
            })
              .then((snapshot) => {
                update(
                  ref(db,
                    `projects/${keyPrj}/partners/${partnerUID}`),
                  {
                    salarysettlement: project.partners[partnerUID].salarysettlement ?
                      Number((project.partners[partnerUID].salarysettlement + valuePartner.amount).toFixed(2)) :
                      valuePartner.amount
                  }
                )

                update(ref(db,
                  `users/${partnerUID}/projects/${keyPrj}`),
                  {
                    salarysettlement: project.partners[partnerUID].salarysettlement ?
                      Number((project.partners[partnerUID].salarysettlement + valuePartner.amount).toFixed(2)) :
                      valuePartner.amount
                  }
                )
                  .then(res => {
                    get(ref(db, `balance/${partnerUID}`))
                      .then(res => res.val())
                      .then(res => {
                        update(ref(db, `balance/${partnerUID}`),
                          (
                            project.currency === "USD" ?
                              {
                                balanceUSD: res.balanceUSD + valuePartner.amount
                              }
                              :
                              {
                                balance: res.balance + valuePartner.amount
                              }
                          )
                        )
                          .then(res => {
                            const pushNoti = push(ref(db, `notifications/${partnerUID}`))
                            let projOwn = ""
                            Object.values(project.projectHolder).forEach(val => projOwn = val.name)
                            let cliName = ""
                            Object.values(project.client).forEach(client => cliName = client.clientName)
                            set(pushNoti,
                              {
                                type: "PAID",
                                projectID: keyPrj,
                                projectHolder: projOwn,
                                salarysettlement: valuePartner.amount,
                                client: cliName,
                                nameProject: project.nameProject,
                                viewed: false,
                                open: false,
                                showCard: false,
                                currency: project.currency,
                                createdAt: serverTimestamp()
                              }
                            ).then(res => {
                              sendEmail({
                                from: {
                                  name: user.name,
                                  email: user.email
                                },
                                to: {
                                  name: valuePartner.name,
                                  email: valuePartner.email
                                },
                                subject: `New income`,
                                redirect: `${host}/projects/${keyPrj}`,
                                text: [
                                  `Your payment is available ${project.currency} ${valuePartner.amount}`,
                                  `from project ${project.nameProject} commissioned by ${cliName}`
                                ],
                              })
                              router.push(router.pathname)
                            })

                          })
                      })
                  }
                  )
                  .catch(error => console.error(error))
              })
              .catch((error) => {
                // The write failed...
                console.error(error);
              });
          }
        })
      })
  };

  const addPartner = (e, { uid, partner }) => {
    setSalarySettlement({
      ...salarySettlement,
      partners: {
        ...salarySettlement.partners,
        [uid]: {
          amount: Number(e.target.value),
          name: partner.name,
          status: "CONFIRMED"
        }
      }
    })
  }

  const removeSelect = (idPartner) => {
    // const filterSelect = selectPartners.filter(slc=> slc.value !== select)
    const { [idPartner]: _, ...restPartners } = selectPartners
    setSelectPartners(restPartners)
  }

  const getPartners = (team) => {
    get(query(ref(db, 'users'), orderByChild("team"), equalTo(team)))
      .then(res => {
        if(res.hasChildren){
          let listPartnersSelect = {}
          Object.entries(res.val()).forEach(([key, value]) => {
            if (Object.keys(project.partners).find(keyPartner => key !== keyPartner)) {
              const { name: name, ...resUser } = value
              listPartnersSelect = {
                ...listPartnersSelect,
                [key]: {
                  ...resUser,
                  name
                }
              }
            }
          })
          setPartners(listPartnersSelect)
        }
      })

  }

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar w-11/12 items-center gap-4">
      <div className="flex w-full justify-between text-xl font-semibold">
        <p>Total Neto:</p>
        <p>{project?.currency && project?.totalNeto.toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}</p>
      </div>
      <hr className=" h-[3px] flex bg-slate-300 border-[1px] w-full " />
      <div className="flex w-full justify-between text-xl font-semibold">
        <p>Cobrado: </p>
        <p>
          {
            project?.currency &&
            `${(project?.totalNeto / project?.percentage).toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}
              `
          }
        </p>
      </div>
      <hr className=" h-[3px] flex bg-slate-300 border-[1px] w-full " />
      <div className="sticky top-0 z-10 flex flex-col w-full bg-slate-100 p-2 shadow-sm justify-between text-xl font-semibold gap-4">
        <div className="flex justify-between">
          <p>Disponible para liquidar: </p>
          <p>{project?.currency && validation?.available?.toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}</p>
        </div>
        {
          validation?.available < 0 &&
          <span className="self-center">Por favor revise los montos a liquidar.</span>
        }
        <hr className=" h-[3px] flex bg-slate-300 border-[1px] w-full " />
      </div>
      <div className="flex w-full justify-between text-xl font-semibold">
        <p>Pactado con Terceros: </p>
        <p>{project?.currency && project?.thirdParties.amount.toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}</p>
      </div>
      {
        project?.thirdParties?.amount > project?.thirdParties?.salarysettlement || !project?.thirdParties?.salarysettlement ?
          <>
            {
              project?.thirdParties?.salarysettlement ?
                <div className="flex w-full justify-between text-xl font-semibold">
                  <>
                    <p>Monto restante: </p>
                    <p>
                      {
                        `
                        ${(project?.thirdParties?.amount - project?.thirdParties?.salarysettlement).toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}
                        `
                      }
                    </p>
                  </>
                </div>
                :
                null
            }
            <div className="flex w-full items-center gap-4 text-xl font-semibold">
              <h2>
                {project?.currency}
              </h2>
              <InputSelect
                min={0}
                type="number"
                name="thirdParties"
                value={salarySettlement?.thirdParties?.amount.toString()}
                onChange={(e) => handlerSalarySettlement(e)}
              />
            </div>
          </>
          :
          <h4>Monto Saldado.</h4>
      }
      <div className="flex flex-col items-center w-full gap-8">
        <h2 className="text-xl font-semibold">Socios y Asociados</h2>
        {
          project?.partners &&
          Object.entries(project?.partners)?.map(([key, values]) => {
            return (
              <div key={key} className="flex flex-col w-full justify-between gap-4 bg-slate-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold">{values.name}</h3>
                {
                  values.amount === values.salarysettlement || values.amount < values.salarysettlement ?
                    <h4>Monto Saldado</h4>
                    :
                    <>
                      {
                        values.amount > values.salarysettlement
                          ?
                          <div className="flex w-full">
                            <div className="flex justify-between w-full">
                              <p>Monto pactado: </p>
                              <p>{values.amount.toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className="flex justify-between w-full">
                              <p>Restante a Liquidar: </p>
                              <p>
                                {
                                  `
                                        ${values.salarysettlement ?
                                    (values.amount - values.salarysettlement)
                                      .toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })
                                    :
                                    values.amount
                                      .toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })
                                  }
                                      `
                                }
                              </p>
                            </div>

                          </div>
                          :
                          <div className="flex w-full">
                            <div className="flex justify-between w-full">
                              <p>Monto pactado: </p>
                              <p>
                                {
                                  values.amount
                                    .toLocaleString('es-ar', { style: 'currency', currency: project?.currency, minimumFractionDigits: 2 })
                                }
                              </p>
                            </div>

                          </div>
                      }
                      <hr className=" h-[3px] flex bg-slate-300 border-[1px] w-full " />
                      <div className="flex items-center gap-4">
                        <p>{project?.currency}</p>
                        <InputSelect
                          min={0}
                          type="number"
                          value={salarySettlement?.partners?.[key]?.amount.toString()}
                          onChange={(e) => handlerSalarySettlement(e, key)}
                          inputStyle={error?.partners?.[key] ? "border-red border-[2px]" : undefined}
                        />
                      </div>
                    </>
                }
              </div>

            )
          })
        }
        <select defaultValue={0} onChange={(e) => getPartners(e.target.value)}>
          <option value={0} disabled>Seleccione el grupo a elegir</option>
          {
            teams && Object.entries(teams).map(([key, team]) => {
              return (
                <option key={key} value={key}>
                  {team.businessName}
                </option>
              )
            })
          }
        </select>
        <MultiSelect
          label="Seleccionar los socios que desee agregar"
          options={partners}
          setSelectState={setSelectPartners}
          selectState={selectPartners}
        />
        {
          Object.entries(selectPartners).map(([key, partner]) => {
            return (
              <div key={key} className="flex flex-col items-center rounded-xl gap-4 w-9/12 bg-gray-200 p-2">
                <label className="flex flex-row justify-between w-full bg-gray-300 rounded-xl text-lg font-normal h-12 p-2" htmlFor="partners">
                  {partner.name}
                  <button onClick={() => removeSelect(key)}>
                    x
                  </button>
                </label>
                <div className="flex w-full items-center gap-4">
                  <p className="text-lg font-semibold">{project?.currency}</p>
                  <InputSelect
                    type="number"
                    name="partners"
                    min={0}
                    value={salarySettlement?.[key]?.amount}
                    onChange={(e) => addPartner(e, { uid: key, partner: partner })}
                  />
                </div>
                <span>Propuesta de Honorarios o Remuneración Pactada.  </span>
              </div>
            )
          })
        }
      </div>
      {
        (validation?.allPartners && validation?.thirdParties) ?
          <div>
            <p>Todos los saldos fueron liquidados previamente. No se generaran más liquidaciones</p>
            <p>Confirma para continuar.</p>
            <button onClick={confirmSalarySettlement}>Confirmar</button>
          </div>
          :
          <ComponentButton
            buttonEvent={confirmSalarySettlement}
            conditionDisabled={!validation?.salarySettlement || Object.keys(error).length !== 0}
            buttonStyle={!validation?.salarySettlement || Object.keys(error).length !== 0 ?
              "bg-gray" :
              ""
            }
            buttonText="Confirmar Liquidación"
          />
      }
    </div>


  )
}

export default SalarySettlement