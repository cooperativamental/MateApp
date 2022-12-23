import { Component, useEffect, useState } from "react"
import { useRouter } from "next/router"

import InputSelect from "../../Elements/InputSelect";
import ComponentButton from "../../Elements/ComponentButton";


import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../../hooks/useProgram/index.ts"
import { PublicKey } from "@solana/web3.js";


const Budget = ({ setProject, project, confirmInfoProject, available, errors, confirmation }) => {
    const router = useRouter()
    const [reserve, setReserve] = useState(0)
    const [teams, setTeams] = useState()

    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const { program } = useProgram({ connection, wallet });

    useEffect(() => {
        setReserve((project?.ratio * (project?.totalNeto - project?.thirdParties?.amount)) / 100)
    }, [project.totalNeto, project.thirdParties, project.partners, project.ratio])


    useEffect(() => {

        setProject({
            ...project,
            totalNeto: (project.totalBruto - (project.totalBruto * (project.ratio / 100))) - project.thirdParties.amount
        })
    }, [project.totalBruto, project.thirdParties, project.ratio])

    console.log(project)

    const handleBudgetProject = (e, data) => {
        const value = Number(e.target.value)
        if (e.target.name === "thirdParties") {
            setProject({
                ...project,
                [e.target.name]: { amount: value },
            })
        } else if (e.target.name === "totalBruto") {
            setProject({
                ...project,
                [e.target.name]: value,

            })
        } else if (e.target.name === "ratio") {
            if (value > 100) {
                setProject({
                    ...project,
                    [e.target.name]: 100,
                })
            } else {
                confirmInfoProject("ASSEMBLE_TEAM", false)
                setProject({
                    ...project,
                    [e.target.name]: value,
                })
            }
        }
    }

    const handleConfirm = () => {
        confirmInfoProject("BUDGET", true)
    }

    return (
        <div className="flex flex-col w-8/12 items-center gap-3">
            <div className="flex flex-row gap-2 w-full items-center  ">
                <div className="w-5/12">
                    <p className="text-sm text-gray-100 whitespace-nowrap text-center ">* Project´s Total Budget</p>
                    <p className="text-xs text-[#3BB89F] whitespace-nowrap text-center">Invoice total amount without VAT</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border text-center rounded-xl w-full h-16 text-xl pl-4 placeholder-slate-100 ${errors?.totalNeto ? " border border-red-600 " : null} `}
                    value={!!project?.totalBruto && project?.totalBruto?.toString()}
                    type="number"
                    name="totalBruto"
                    onChange={(e) => handleBudgetProject(e)}
                    min={0}

                />
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
                <div className="w-5/12">
                    <p className="text-sm text-gray-100 whitespace-nowrap text-center ">Treasury rate</p>
                    <p className="text-xs text-[#3BB89F]  text-center">A slice of the project’s budget that will be assigned to your DAO Vault</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border rounded-xl text-center w-full h-16 text-xl pl-4 placeholder-slate-100 ${errors?.thirdParties ? " border border-red-600 " : null} `}
                    value={!!project?.ratio && project?.ratio.toString()}
                    name="ratio"
                    onChange={(e) => handleBudgetProject(e)}
                    type="number"
                    min={0}
                    max={100}
                />
            </div>


            <div className=" flex flex-row gap-2 items-center w-full">
                <div className="w-5/12">
                    <p className="text-sm text-gray-100 whitespace-nowrap text-center ">* Third party's budget</p>
                    <p className="text-xs text-[#3BB89F]  text-center">Other Expenses and not member of the project's team.</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border rounded-xl w-full h-16 text-center text-xl pl-4 placeholder-slate-100 ${errors?.thirdParties ? " border border-red-600 " : null} `}
                    value={!!project?.thirdParties?.amount && project?.thirdParties?.amount.toString()}
                    name="thirdParties"
                    onChange={(e) => handleBudgetProject(e)}
                    type="number"
                    min={0}
                />
            </div>
            <div className=" flex flex-row gap-2 items-center w-full">
                <div className="w-5/12">
                    <p className="text-sm text-gray-100 whitespace-nowrap text-center ">Project´s Net Budget</p>
                    <p className="text-xs text-[#3BB89F] text-center">Net budget is what’s left of the Total budget after treasury ratio and Thirds Parties are deducted</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border text-center rounded-xl w-full h-16 text-xl pl-4 placeholder-slate-100 ${errors?.totalNeto ? " border border-red-600 " : null} `}
                    value={project?.totalNeto?.toString()}
                    onChange={(e) => handleBudgetProject(e)}
                    type="number"
                    min={0}
                    disabled
                />
            </div>

            <ComponentButton
                buttonEvent={handleConfirm}
                buttonText="Confirm Budget"
                conditionDisabled={available < 0 || errors.thirdParties}
            />
        </div>
    )
}

export default Budget

