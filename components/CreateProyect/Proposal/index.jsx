import { useEffect, useState } from "react"
import { useRouter } from "next/router"


import ComponentButton from "../../Elements/ComponentButton"
import InputSelect from "../../Elements/InputSelect"

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../../hooks/useProgram/index.ts"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { TokenPocketWalletAdapter } from "@solana/wallet-adapter-wallets"

const AssembleTeam = ({ project, setProject, confirmInfoProject, available, errors, confirmation }) => {
    const router = useRouter()

    const [assembleTeam, setAssembleTeam] = useState()
    const [nMembers, setNmembers] = useState([])
    const [selectPartners, setSelectPartners] = useState()

    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const { program } = useProgram({ connection, wallet });

    useEffect(() => {
        const newArrayMembers = new Array(project.nMembers).fill(0)
        const members = newArrayMembers.map((e, index) => {
            if (index === 0) {
                return {
                    address: wallet?.publicKey?.toBase58()
                }
            } else {
                return {
                    address: ""
                }
            }
        })
        setProject({
            ...project,
            members: members
        })

    }, [wallet])

    const handlerMembers = (e, index) => {
        const value = Number(e.target.value)

        if (e.target.name === "address") {
            const statemembers = project.members.map((e, i) => {
                if (index === i) {
                    return {
                        ...e,
                        address: value
                    }
                }
            })

            setProject({
                ...project,
                members: statemembers
            })
        }
        if (e.target.name === "percentage") {
            const statemembers = project.members.map((e, i) => {
                if (index === i) {
                    return {
                        ...e,
                        percentage: value,
                        amount: (value * project.totalNeto) / 100
                    }
                } else {
                    return e
                }
            })
            setProject({
                ...project,
                members: statemembers
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

    return (
        <div className="flex flex-col text-center gap-8 items-center w-8/12" >
            <div className="flex w-full justify-between">
                <p>Available</p>
                <p className="text-xl">{available}</p>
            </div>
            <div className="w-full overflow-hidden rounded-md">

                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 1
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 1 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    1
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 2
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 2 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    2
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 3
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 3 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    3
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 4
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 4 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    4
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 5
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 5 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    5
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 6
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 6 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    6
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 7
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border text-sm font-medium focus:z-20 ${nMembers.length === 7 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    7
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 8
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers.length === 8 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    8
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 9
                        })
                    }}
                    className={`relative  w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers.length === 9 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    9
                </button>
                <button
                    onClick={() => {
                        setProject({
                            ...project,
                            nMembers: 10
                        })
                    }}
                    className={`relative w-[10%] h-12 items-center border  text-sm font-medium focus:z-20 ${nMembers === 10 ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"}`}
                >
                    10
                </button>
            </div>
            <div className="flex flex-col w-full gap-4">
                {
                    nMembers?.map((e, index) => {
                        return (
                            <div className="flex flex-col gap-4 p-4 bg-[#1A1735]">
                                <p className="text-[#FA9972]">
                                    Member {index + 1}
                                </p>
                                <div className="flex w-full gap-4">
                                    <div className="flex h-min items-center w-2/12">
                                        <InputSelect
                                            type="number"
                                            inputStyle="w-full !h-10 rounded-md"
                                            name="percentage"
                                            onChange={(e) => handlerMembers(e, index)}
                                        />
                                        <p>%</p>
                                    </div>
                                    <div className="w-3/12">
                                        <InputSelect
                                            inputStyle="w-full !h-10 rounded-md"
                                            value={e?.amount}
                                        />
                                        <p className="text-xs font-thin">USDC -SOL</p>
                                    </div>
                                    <div className="w-6/12">
                                        {
                                            !wallet && index === 0 ?
                                                <WalletMultiButton className='!h-10 !w-max !bg-[#FA9972] hover:!bg-slate-700 !rounded-md !font-thin' />
                                                :
                                                <InputSelect
                                                    inputStyle="w-full !h-10 rounded-md"
                                                    placeHolder={e.address}
                                                    disabled={index === 0}
                                                    name="address"
                                                />

                                        }
                                        <p className="text-xs font-thin">Member Wallet</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p>Confirm Project Budget</p>
            <ComponentButton
                buttonEvent={handleConfirm}
                buttonText="Confirm Team"
                buttonStyle={`h-14 ${(!!Object.values(errors).find(error => !!error)) ? "bg-[grey]" : "bg-[#5A31E1]"}`}
                conditionDisabled={errors.members}
            />
        </div >

    )
}

export default AssembleTeam