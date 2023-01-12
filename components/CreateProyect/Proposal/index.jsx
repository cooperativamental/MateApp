import { useEffect, useState } from "react"

import ComponentButton from "../../Elements/ComponentButton"
import InputSelect from "../../Elements/InputSelect"
import ToogleSwitch from "../../Elements/ToggleSwitch"

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

const AssembleTeam = ({ project, setProject, confirmInfoProject, available, errors, confirmation }) => {
    const [nMembers, setNmembers] = useState([])
    const [selectPartners, setSelectPartners] = useState()
    const [priorityMember, setPriorityMember] = useState(null)
    const wallet = useAnchorWallet();

    useEffect(() => {
        const members = project.members.map((memb, index) => {
            if (index === 0) {
                return {
                    ...memb,
                    address: wallet?.publicKey?.toBase58() || ""
                }
            } else {
                return memb
            }
        })
        setProject({
            ...project,
            members: members
        })

    }, [wallet])

    useEffect(() => {
        if (priorityMember !== null) {
            if (project.typeAgreement === "FIRST_MINORITY") {
                const members = project.members.map((memb, index) => {
                    if (index === priorityMember) {
                        return {
                            ...memb,
                            amount: project.totalNeto / project.members.length - 1,
                            percentage: ((project.totalNeto / project.members.length - 1) * 100) / project.totalNeto
                        }
                    } else {
                        return {
                            ...memb,
                            amount: (project.totalNeto - (project.totalNeto / project.members.length - 1)) / project.members.length - 1,
                            percentage: (((project.totalNeto - (project.totalNeto / project.members.length - 1)) / project.members.length - 1) * 100) / project.totalNeto
                        }
                    }
                })
                setProject({
                    ...project,
                    members
                })
            }
            if (project.typeAgreement === "COACH_MODE") {
                const members = project.members.map((memb, index) => {
                    const amountCM = (project.totalNeto - (project.totalNeto / (project.members.length-1))) / project.members.length
                    if (index === priorityMember) {
                        return {
                            ...memb,
                            amount: amountCM,
                            percentage: (amountCM * 100) / project.totalNeto
                        }
                    } else {
                        console.log((((project.totalNeto - amountCM) / (project.members.length - 1)) * 100) / project.totalNeto )
                        console.log((project.totalNeto - amountCM) / (project.members.length - 1))
                        return {
                            ...memb,
                            amount: (project.totalNeto - amountCM) / (project.members.length - 1),
                            percentage: (((project.totalNeto - amountCM) / (project.members.length - 1)) * 100) / project.totalNeto 
                        }
                    }
                })
                setProject({
                    ...project,
                    members
                })
            }
        }
    }, [priorityMember])


    const handleNmember = (num) => {
        const newArrayMembers = new Array(num).fill({})
        console.log(newArrayMembers)
        const members = newArrayMembers.map((memb, index) => {
            if (index === 0) {
                return {
                    address: wallet?.publicKey?.toBase58(),
                    amount: 0
                }
            } else if (project?.members[index]) {
                return {
                    ...project?.members[index],
                    amount: 0
                }
            } else {
                return {
                    ...memb,
                    amount: 0
                }
            }
        })
        setPriorityMember(null)
        setProject({
            ...project,
            members: members,
            availableTeam: available
        })
    }

    const handlerMembers = (e, index) => {
        const value = Number(e.target.value)

        if (e.target.name === "address") {
            const statemembers = project.members.map((memb, i) => {
                if (index === i) {
                    return {
                        ...memb,
                        address: e.target.value
                    }
                } else {
                    return memb
                }
            })

            setProject({
                ...project,
                members: statemembers
            })
        }
        if (e.target.name === "percentage") {
            const statemembers = project.members.map((memb, i) => {
                if (index === i) {
                    return {
                        ...memb,
                        amount: (value * project.totalNeto) / 100,
                        percentage: value
                    }
                } else {
                    return memb
                }
            })
            setProject({
                ...project,
                members: statemembers,
                typeAgreement: "OTHER"
            })
        }
    }

    const removeSelect = (idPartner) => {
        const { [idPartner]: _, ...restPartners } = selectPartners
        setSelectPartners(restPartners)
        const { [idPartner]: __, ...resInfoPartners } = project.members
        setProject({
            ...project,
            members: resInfoPartners
        })
    }



    const handleConfirm = () => {
        confirmInfoProject("PROPOSAL", true)
    }


    console.log(priorityMember)

    return (
        <div className="flex flex-col text-center gap-8 items-center w-8/12" >
            <div className="flex w-full justify-between items-center text-lg">
                <p>Available Budget (1)</p>
                <div className="flex items-center gap-4">
                    <InputSelect
                        disabled
                        value={available}
                        inputStyle="text-center"
                    />
                    <div>
                        <p className="text-2xl">◎ SOL</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-lg text-gray-100 whitespace-nowrap">Members (n)</p>
                    <p className="text-xs text-[#3BB89F]">
                        How many partners are involved in the project.
                    </p>
                </div>
                <div className="w-full overflow-hidden rounded-md">

                    <button
                        onClick={() => {
                            handleNmember(1)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(2)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 2 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(3)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 3 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        3
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(4)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 4 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        4
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(5)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 5 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        5
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(6)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 6 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        6
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(7)
                        }}
                        className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 7 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        7
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(8)
                        }}
                        className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 8 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        8
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(9)
                        }}
                        className={`relative  w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 9 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        9
                    </button>
                    <button
                        onClick={() => {
                            handleNmember(10)
                        }}
                        className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 10 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        10
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
                {
                    project?.members?.map((e, index) => {
                        return (
                            <div className="flex flex-col gap-4 p-4 bg-[#1A1735]">
                                <p className="text-[#FA9972]">
                                    Member {index + 1}
                                </p>
                                <div className="flex w-full gap-4">
                                    <div className="flex h-min items-center w-2/12">
                                        <InputSelect
                                            type="number"
                                            value={e?.percentage?.toString()}
                                            inputStyle="w-full !h-10 rounded-md"
                                            name="percentage"
                                            onChange={(e) => handlerMembers(e, index)}
                                        />
                                        <p>%</p>
                                    </div>
                                    <div className="flex flex-col w-3/12 gap-2 items-center">
                                        <InputSelect
                                            inputStyle="w-full !h-10 rounded-md"
                                            value={e?.amount}
                                        />
                                        <p>
                                            ◎ SOL
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-6/12 gap-2 items-center">
                                        {
                                            !wallet && index === 0 ?
                                                <WalletMultiButton className='!h-10 !w-max !bg-[#FA9972] hover:!bg-slate-700 !rounded-md !font-thin' />
                                                :
                                                <InputSelect
                                                    inputStyle="w-full !h-10 rounded-md"
                                                    placeHolder={e?.address}
                                                    disabled={index === 0}
                                                    name="address"
                                                    onChange={(e) => handlerMembers(e, index)}
                                                />

                                        }
                                        <p className="text-xs font-thin">Member Wallet</p>
                                    </div>
                                    <div className="flex items-center h-10">
                                        {
                                            (project.typeAgreement === "FIRST_MINORITY" || project.typeAgreement === "COACH_MODE") &&
                                            <ToogleSwitch
                                                enabled={priorityMember === index}
                                                onChange={() => {
                                                    setPriorityMember(index)
                                                }}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p>Confirm Partners Agreement</p>
            <ComponentButton
                buttonEvent={handleConfirm}
                buttonText="View Proposal"
                buttonStyle={`h-14 ${(!!Object.values(errors).find(error => !!error)) ? "bg-[grey]" : "bg-[#5A31E1]"}`}
                conditionDisabled={errors.members}
            />
        </div >

    )
}

export default AssembleTeam