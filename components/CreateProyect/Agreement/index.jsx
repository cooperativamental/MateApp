import { Component, useState } from "react"
import { useEffect } from "react"
import ComponentButton from "../../Elements/ComponentButton"
import InputSelect from "../../Elements/InputSelect"
import { useAnchorWallet } from "@solana/wallet-adapter-react";


const Agreement = ({ setProject, project, confirmInfoProject }) => {
    const [available, setAvailable] = useState()
    const [nMembers, setNmembers] = useState()
    const wallet = useAnchorWallet();

    useEffect(() => {
        setAvailable(project.totalNeto * (1 - (project?.reserve / 100)))
    }, [project.reserve])

    const handleConfirm = (agreement) => {

        const newArrayMembers = new Array(nMembers).fill({})
        const members = newArrayMembers.map((memb, index) => {
            if (index === 0) {
                return {
                    address: wallet?.publicKey?.toBase58(),
                    amount: agreement === "EQUAL_PARTS" ?
                        project.totalNeto / nMembers
                        :
                        0,
                    percentage: agreement === "EQUAL_PARTS" ?
                        100 / nMembers
                        :
                        0,
                }
            } else if (!memb.address) {
                return {
                    address: "",
                    amount: agreement === "EQUAL_PARTS" ?
                        project.totalNeto / nMembers
                        :
                        0,
                    percentage: agreement === "EQUAL_PARTS" ?
                        100 / nMembers
                        :
                        0,
                }
            }
        })
        setProject({
            ...project,
            members: members,
            typeAgreement: agreement,
            availableTeam: available
        })
        confirmInfoProject("AGREEMENT", true)
    }

    return (
        <div className="flex flex-col items-center w-8/12 p-4 gap-8">
            <div className="flex w-full justify-between items-center text-lg">
                <p>Available Budget (1)</p>
                <div className="flex items-center gap-4">
                    <InputSelect
                        disabled
                        value={available}
                        inputStyle="text-center text-4xl ring-0"
                    />
                    <div>
                        <p className="text-2xl">{project.currency}</p>
                    </div>
                </div>
            </div>
            {/* <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-sm text-gray-100 whitespace-nowrap">Treasury rate</p>
                    <p className="text-xs text-[#3BB89F]">
                        A slice of the project’s budget that will be assigned to your DAO Vault
                    </p>
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <InputSelect
                            type="number"
                            inputStyle="!rounded-lg !h-16 w-20"
                            name="reserve"
                            onChange={(e) => setProject({
                                ...project,
                                reserve: Number(e.target.value)
                            })}
                        />
                        <p className="text-4xl">%</p>
                    </div>
                    <p>USDC-SOL: {(project.totalNeto * project.reserve) / 100}</p>
                </div>
            </div> */}
            <div className="flex w-full items-center">
                <div className="w-4/12 p-1">
                    <p className="text-xl text-gray-100 whitespace-nowrap">Members (n):</p>
                    <p className="text-xs text-[#3BB89F]">
                        How many partners are involved in the project?
                    </p>
                </div>
                <div className="w-[22.5rem] overflow-hidden rounded-md">
                    <button
                        onClick={() => {
                            setNmembers(2)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 2 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(3)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 3 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        3
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(4)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 4 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        4
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(5)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 5 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        5
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(6)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 6 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        6
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(7)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers === 7 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        7
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(8)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 8 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        8
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(9)
                        }}
                        className={`relative  w-[2.5rem] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 9 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        9
                    </button>
                    <button
                        onClick={() => {
                            setNmembers(10)
                        }}
                        className={`relative w-[2.5rem] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 10 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                        10
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-full gap-4">
                <p className="text-xl text-gray-100 whitespace-nowrap">Agreement for this project</p>
                <p className="text-xs text-[#3BB89F]">
                    Always remember that performance is a team job.
                </p>
                <div className="flex gap-4">
                    <p className="text-xs text-[#3BB89F]">
                        x = available budget (1)
                    </p>
                    <p className="text-xs text-[#3BB89F]">
                        n = number of members
                    </p>

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#3BB89F]">
                    <div className="flex flex-col pb-4 items-center bg-[#1A1735] rounded-md gap-4">
                        <div className="h-4/5 p-4">
                            <p>
                                All members receive the same amount.
                            </p>
                            <p>
                                amount = x / n
                            </p>
                        </div>
                        <ComponentButton
                            buttonStyle="w-min !max-w-full text-xs p-2"
                            buttonText="Equal Parts"
                            buttonEvent={() => {
                                handleConfirm("EQUAL_PARTS")
                            }}
                            conditionDisabled={!nMembers}

                        />
                    </div>
                    <div className="flex flex-col pb-4 items-center bg-[#1A1735] rounded-md gap-4">
                        <div className="h-4/5 p-4" >
                            <p>
                                One member receive amountFM  = x / (n - 1)
                            </p>
                            <p>
                                Rest members receive
                                amount = (x - (x / (n-1))) / (n - 1)
                            </p>
                        </div>
                        <ComponentButton
                            buttonStyle="w-min !max-w-full text-xs p-2"
                            buttonText="First Minority"
                            buttonEvent={() => {
                                handleConfirm("FIRST_MINORITY")
                            }}
                            conditionDisabled={nMembers < 3 || !nMembers}
                        />
                    </div>
                    <div className="flex flex-col pb-4 items-center bg-[#1A1735] rounded-md gap-4">
                        <div className="h-4/5 max-w-full p-4 ">
                            <p>
                                One member receive amountCM  = (x - (x / n-1)) / n
                            </p>
                            <p>
                                Rest members receive
                                amount = (x - amountCM) / (n - 1)
                            </p>
                        </div>
                        <ComponentButton
                            buttonStyle="w-min !max-w-full text-xs p-2"
                            buttonText="Coach Mode"
                            buttonEvent={() => {
                                handleConfirm("COACH_MODE")
                            }}
                            conditionDisabled={nMembers < 3 || !nMembers}

                        />
                    </div>
                    <div className="flex flex-col pb-4 items-center bg-[#1A1735] rounded-md gap-4">
                        <div className="h-4/5 p-4">
                            <p>
                                Allocate your own compensations proposals.
                            </p>
                        </div>
                        <ComponentButton
                            buttonStyle="w-min !max-w-full text-xs"
                            buttonText="Other"
                            conditionDisabled={!nMembers}
                            buttonEvent={() => {
                                handleConfirm("OTHER")
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* <ComponentButton
                buttonText="Confirm Members"
                buttonEvent={handleConfirm}
                buttonStyle=""
            /> */}
        </div>
    )
}

export default Agreement