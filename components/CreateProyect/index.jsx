import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import InfoProject from "./infoProject"
import Budget from "./Budget"

import { useWallet } from '@solana/wallet-adapter-react'

import Proposal from "./Proposal";
import PreviewProject from "./Preview";
import Agreement from "./Agreement";


const CreateProject = () => {
  const router = useRouter()
  const refContainer = useRef()
  const wallet = useWallet()
  const [errors, setErrors] = useState({})
  const [available, setAvailable] = useState(0)
  const [reserve, setReserve] = useState(0)




  const [confirmation, setConfirmation] = useState({
    INFO_PROJECT: false,
    BUDGET: false,
    AGREEMENT: false,
    PROPOSAL: false
  })
  const [project, setProject] = useState({
    projectHolder: {},
    nameProject: "",

    totalBruto: 0,
    totalNeto: 0,
    thirdParties: {
      amount: 0
    },
    members: [],
    status: "ANNOUNCEMENT",
    currency: "SOL",
    invoiceDate: false,
    fiatOrCrypto: "CRYPTO",
    treasuryGroup: 0,
    team: router?.query?.team,
    reserve: 0
  })


  const confirmInfoProject = (confirm, status, next) => {
    setConfirmation({
      ...confirmation,
      [confirm]: status
    })
  }

  useEffect(() => {
    let amountTotalPartners = 0
    project?.members && Object.values(project?.members).forEach(partner => {
      amountTotalPartners += (partner?.amount || 0)
    })

    setAvailable(project?.totalNeto - Number((amountTotalPartners).toFixed(3)))
    setReserve((project?.ratio * (project?.totalNeto - project?.thirdParties?.amount)) / 100)
    setErrors({
      thirdParties: (project?.totalBruto - project?.thirdParties?.amount) < 0,
      available: !project.totalBruto || ((project?.totalNeto - project?.thirdParties?.amount) * (1 - (project.ratio / 100))) - Number((amountTotalPartners).toFixed(3)) < 0,
    })
  }, [project.totalNeto, project.thirdParties, project.partners, project.ratio, project.members])

  console.log(confirmation)

  return (
    <div
      className="flex flex-col items-center gap-4 h-full w-full overflow-y-auto scrollbar"
      ref={refContainer}
    >

      <div className="flex w-6/12 justify-between font-light text-sm">
        <p>Project Starter Wallet: {wallet?.publicKey?.toBase58()}</p>
      </div>
      {/* {

        confirmation.INFO_PROJECT && confirmation.BUDGET && confirmation.AGREEMENT &&
        <div className=" bg-slate-900 w-full  border-[1px] border-x-slate-300 flex flex-col font-bold gap-4 p-4 rounded-lg text-xl">
          <div className={`flex justify-between ${errors?.available ? " text-red-600" : ""}`}>
            <h3>
              Available Budget ◎:
            </h3>
            <h3>
              {`${available.toLocaleString('es-ar', { minimumFractionDigits: 2 })}`}
            </h3>
          </div>
          <div className={`flex justify-between ${errors?.available ? " text-red-600" : ""}`}>
            <h3>
              Reserve ◎:
            </h3>
            <h3>
              {reserve.toLocaleString('es-ar', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          {
            errors?.available &&
            <p className=" text-sm font-medium">You cannot exceed the budget available for your team.</p>
          }
        </div>
      } */}
      {
        !confirmation.INFO_PROJECT &&
        <InfoProject
          confirmInfoProject={confirmInfoProject}
          confirmation={confirmation}
          team={project.team}
          setProject={setProject}
          project={project}
        />
      }
      {
        (confirmation.INFO_PROJECT && !confirmation.BUDGET) &&
        <Budget
          available={available}
          confirmInfoProject={confirmInfoProject}
          currency={project?.currency}
          confirmation={confirmation}
          setProject={setProject}
          project={project}
          errors={errors}
        />
      }
      {
        (confirmation.INFO_PROJECT && confirmation.BUDGET && !confirmation.AGREEMENT) &&
        <Agreement
          available={available}
          errors={errors}
          confirmInfoProject={confirmInfoProject}
          confirmation={confirmation}
          currency={project?.currency}
          setProject={setProject}
          project={project}
        />
      }
      {
        (confirmation.INFO_PROJECT && confirmation.BUDGET && confirmation.AGREEMENT && !confirmation.PROPOSAL) &&
        <Proposal
          available={available}
          errors={errors}
          confirmInfoProject={confirmInfoProject}
          confirmation={confirmation}
          currency={project?.currency}
          setProject={setProject}
          project={project}
        />
      }
      {
        confirmation.INFO_PROJECT && confirmation.BUDGET && confirmation.AGREEMENT && confirmation.PROPOSAL &&
        <PreviewProject setConfirmation={setConfirmation} project={project} setProject={setProject} />
      }
    </div >
  )
}

export default CreateProject
