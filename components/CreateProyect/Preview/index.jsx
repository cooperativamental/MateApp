import { useState } from "react";
import { useRouter } from "next/router";


import ComponentButton from "../../Elements/ComponentButton";

import { useHost } from "../../../context/host";
import { useCreateWeb3 } from "../../../functions/createWeb3.ts"
import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

const PreviewProject = ({ project, setProject, setConfirmation }) => {

    const { host } = useHost()
    const router = useRouter()
    const { createProject } = useCreateWeb3()
    const [retrySendProposal, setRetrySendProporsal] = useState({
        status: false,
    })
    
    const create = () => {
        const members = project.members.map(memb => {
            return {
                member: new PublicKey(memb.address),
                amount: new BN(memb.amount)
            }
        })
        createProject({
            name: project.nameProject,
            payments: members,
            amount: new BN(project.totalBruto)
        })
    }
    const renderInfo = (info) => {
        if (info) {
            return Object.entries(info).map(([key, value]) => {
                return (
                    <div key={key} className="flex flex-row h-10 w-full justify-between font-medium text-base items-center border-b-2 border-slate-300">
                        <label>{value.name}</label>
                        <p>{value.amount.toLocaleString('es-ar', { minimumFractionDigits: 2 })}</p>
                    </div>
                )
            })
        }
    };

    return (
        <div className="flex flex-col w-8/12 gap-y-8" >
            <div className="flex items-center justify-between w-10/12 h-12">
                <p className="flex items-start text-lg font-medium">{project.nameProject}</p>
            </div>
            <hr className="flex bg-slate-300 border-[1px] w-full" />
            <div className="flex items-center justify-between w-10/12 font-normal ">
                <p>KickOff: {new Date(project.start).toLocaleDateString('es-ar')}</p>
                <p>Deadline:  {new Date(project.end).toLocaleDateString('es-ar')}</p>
            </div>
            <hr className="flex bg-slate-300 border-[1px] w-full" />
            <div className="flex items-center h-8 w-full justify-between font-medium text-base">
                <label>Total invoice ◎</label>
                <p>{project.totalBruto}</p>
            </div>
            <div className="flex items-center h-8 w-full justify-between font-medium text-base">
                <label>Net Total ◎</label>
                <p>{project.totalNeto}</p>
            </div>
            <hr className="flex bg-slate-300 border-[1px] w-full " />
            <div className="flex items-center h-4 w-full justify-between font-medium text-base">
                <label>Third party expenses</label>
                <p>{project.thirdParties?.amount.toLocaleString('es-ar', { minimumFractionDigits: 2 })}</p>
            </div>

            <hr className="flex bg-slate-300 border-[1px] w-full " />

            <div className="flex items-center h-10 w-full justify-between font-medium text-2xl">
                <label>Team Budget ◎</label>
                <p>{(project?.totalNeto - project?.thirdParties?.amount).toLocaleString('es-ar', { minimumFractionDigits: 2 })}</p>
            </div>
            <hr className="  flex bg-slate-300 border-[1px] w-full " />

            <div className="flex items-center h-4 w-full justify-between font-light text-sm">
                <label>Reserve percentage %</label>
                {project?.ratio}
            </div>
            <div className="flex items-center h-10 w-full justify-between font-light text-base">
                <label>Reserve ◎</label>
                {`${((project?.reserve * (project?.totalNeto - project?.thirdParties?.amount)) / 100).toLocaleString('es-ar', { minimumFractionDigits: 2 })}`}
            </div>
            {
                renderInfo(project.partners)
            }
            <div className="flex flex-col items-center gap-4 m-4">

                <p className="text-base font-normal">Send proposals to your partners</p>
                <ComponentButton
                    buttonText="Edit"
                    buttonEvent={() => {
                        setConfirmation({
                            INFO_PROJECT: false,
                            BUDGET: false,
                            ASSEMBLE_TEAM: false
                        })
                    }}
                />
                {
                    retrySendProposal.status ?
                        <ComponentButton
                            buttonEvent={() => sendProposal(retrySendProposal.key)}
                            buttonText="Retry sending to Partners"
                        />
                        :
                        <ComponentButton
                            buttonText="Gather Team"
                            buttonEvent={create}
                        />

                }
            </div>

        </div>
    )
}

export default PreviewProject