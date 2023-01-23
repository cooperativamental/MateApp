import { Component, useEffect, useState } from "react"
import { useRouter } from "next/router"

import InputSelect from "../../Elements/InputSelect";
import ComponentButton from "../../Elements/ComponentButton";


import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../../hooks/useProgram/index.ts"
import { PublicKey } from "@solana/web3.js";


const Budget = ({ setProject, project, confirmInfoProject }) => {
    const router = useRouter()
    const [reserve, setReserve] = useState(0)
    const [teams, setTeams] = useState()
    const [errors, setErrors] = useState({})

    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const { program } = useProgram({ connection, wallet });

    useEffect(() => {
        setReserve((project?.ratio * (project?.totalNeto - project?.thirdParties?.amount)) / 100)
    }, [project.totalNeto, project.thirdParties, project.partners, project.ratio])


    useEffect(() => {

        setProject({
            ...project,
            totalNeto: (project.totalBruto - (project.totalBruto * (project.treasuryGroup / 100))) - project.thirdParties.amount
        })
        setErrors({
            thirdParties: (project?.totalBruto - project?.thirdParties?.amount) < 0,
            unavailable: !project.totalBruto || ((project?.totalBruto - project?.thirdParties?.amount) * (1 - (project.treasuryGroup / 100))) < 0,
            totalNeto: (project.totalBruto - (project.totalBruto * (project.treasuryGroup / 100))) - project.thirdParties.amount <= 0
        })
    }, [project.totalBruto, project.thirdParties, project.treasuryGroup])

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
        } else if (e.target.name === "treasuryGroup") {
            if (value > 100) {
                setProject({
                    ...project,
                    [e.target.name]: 100,
                })
            } else {
                setProject({
                    ...project,
                    [e.target.name]: value,
                })
            }
        }
        if (e.target.id === "currency") {
            const options = e.target.options;

            for (let i = 0; options.length > i; i++) {
                if (options[i].selected) {
                    setProject({
                        ...project,
                        [e.target.id]: options[i].value,
                    })
                }
            }

        }
    }

    const handleConfirm = () => {
        confirmInfoProject("BUDGET", true)
    }

    console.log(project)


    return (
        <div className="flex flex-col w-8/12 items-center gap-3">
            <div className="flex w-full items-center justify-between">
                <div className="w-5/12 p-4">
                    <p className="text-lg text-gray-100 whitespace-nowrap ">* Project´s Net Budget</p>
                    <p className="text-xs text-[#3BB89F]">Invoice total amount without VAT and third parties costs. Only team´s budget.</p>
                </div>
                <div className="flex items-center w-6/12">
                    <InputSelect
                        inputStyle={`flex  appearance-none border text-center rounded-xl h-16 text-xl pl-4 placeholder-slate-100`}
                        value={!!project?.totalBruto && project?.totalBruto?.toString()}
                        type="number"
                        name="totalBruto"
                        onChange={(e) => handleBudgetProject(e)}
                        min={0}

                    />
                    <p>
                        {project.currency}
                    </p>
                </div>
            </div>
            <div className="flex w-full items-center justify-between">
                <div className="w-5/12 p-4">
                    <p className="text-lg text-gray-100 whitespace-nowrap ">Currency</p>
                </div>
                <div className="flex items-center w-6/12">
                    <InputSelect
                        select
                        inputStyle={`flex  appearance-none border text-center rounded-xl h-16 text-xl pl-4 placeholder-slate-100`}
                        id="currency"
                        onChange={handleBudgetProject}
                    >
                        <option selected={project?.currency === "SOL"}>SOL</option>
                        <option selected={project?.currency === "BONK"}>BONK</option>
                        <option selected={project?.currency === "USDC"}>USDC</option>
                    </InputSelect>
                    <p>
                        {project.currency}
                    </p>
                </div>
            </div>
            {/* <div className="flex w-full items-center">
                <div className="w-4/12 p-4">
                    <p className="text-lg text-gray-100 whitespace-nowrap">Treasury rate</p>
                    <p className="text-xs text-[#3BB89F]">A slice of the project’s budget that will be assigned to your DAO.</p>
                </div>
                <div className="flex w-8/12 items-center gap-1">
                    <InputSelect
                        inputStyle={`flex w-8/12 appearance-none border rounded-xl text-center h-16 text-xl pl-4 placeholder-slate-100`}
                        value={!!project?.treasuryGroup && project?.treasuryGroup.toString()}
                        name="treasuryGroup"
                        onChange={(e) => handleBudgetProject(e)}
                        type="number"
                        min={0}
                        max={100}
                    />
                    <p className="text-center text-sm text-gray-100 ">Add DAO Wallet</p>
                    <InputSelect
                        inputStyle={`flex w-3/12 appearance-none border rounded-xl text-centere !h-7 text-xl pl-4 placeholder-slate-100`}
                        name="group"
                        onChange={(e) => handleBudgetProject(e)}
                    />
                </div>
            </div> */}


            {/* <div className=" flex flex-row items-center w-full">
                <div className="w-4/12 p-4">
                    <p className="text-sm text-gray-100 whitespace-nowrap ">* Third party's budget</p>
                    <p className="text-xs text-[#3BB89F]  ">Other Expenses and not member of the project's team.</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border rounded-xl w-8/12 h-16 text-center text-xl pl-4 placeholder-slate-100 ${errors?.thirdParties ? " border border-red-600 focus:border-red-600" : null} `}
                    value={!!project?.thirdParties?.amount && project?.thirdParties?.amount.toString()}
                    name="thirdParties"
                    onChange={(e) => handleBudgetProject(e)}
                    type="number"
                    min={0}
                />
            </div> */}
            {/* <div className=" flex flex-row items-center w-full">
                <div className="w-4/12 p-4">
                    <p className="text-sm text-gray-100 whitespace-nowrap  ">Project´s Net Budget</p>
                    <p className="text-xs text-[#3BB89F] ">Net budget is what’s left of the Total budget after treasury ratio and Thirds Parties are deducted</p>
                </div>
                <InputSelect
                    inputStyle={`flex appearance-none border text-center rounded-xl w-8/12 h-16 text-xl pl-4 placeholder-slate-100 ${errors?.totalNeto ? " border border-red-600 " : null} `}
                    value={project?.totalNeto?.toString()}
                    onChange={(e) => handleBudgetProject(e)}
                    type="number"
                    min={0}
                    disabled
                />
            </div> */}

            <ComponentButton
                buttonEvent={handleConfirm}
                buttonText="Confirm Budget"
                conditionDisabled={errors.unavailable || errors.thirdParties || errors.totalNeto}
            />
        </div>
    )
}

export default Budget

