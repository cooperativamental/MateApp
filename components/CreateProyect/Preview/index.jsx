import { useState } from "react";
import { useRouter } from "next/router";


import ComponentButton from "../../Elements/ComponentButton";

import { useHost } from "../../../context/host";
import { useCreateWeb3 } from "../../../functions/createWeb3.ts"
import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import InputSelect from "../../Elements/InputSelect";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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
    const renderInfo = info => {
        console.log(project)
        return (
            <div className="flex flex-col gap-4">
                {
                    project?.members.map(memb => {
                        return (
                            <div className={`flex items-center  justify-between w-full py-1 px-6 rounded-md bg-[#FCF776] text-black `}>
                                <p>Member</p>
                                <div className="flex gap-4 items-center">
                                    <p>
                                        {(Number(project?.totalBruto) * memb.amount) / 100}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                        <p>
                                            {memb.amount}
                                        </p>
                                        <div className="text-[.5rem]">
                                            <p>
                                                USDC
                                            </p>
                                            <p>SOL</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    // onDoubleClick={(e) => {
                                    //   console.log(e)
                                    //   navigator.clipboard.writeText(e.target.value)
                                    // }}
                                    className="flex text-base gap-2 w-4/12 overflow-ellipsis truncate"
                                >
                                    <p className="text-[#FA9972]">Wallet: </p>
                                    <p>{memb.address}</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        )
    };


    console.log(project)

    return (
        <div className="flex flex-col w-8/12 gap-y-8" >
            <div className="flex items-center justify-between h-12">
                <p>Project</p>
                <p className="flex items-start text-lg font-medium">{project.nameProject}</p>
            </div>
            <hr className="flex bg-slate-300 border-[1px] w-full" />
            <div className="flex items-center justify-between h-12">
                <p>Members</p>
                <p>{project?.members?.length}</p>
            </div>
            <div className="flex items-center h-8 w-full justify-between font-medium text-base">
                <label>Total invoice ◎</label>
                <p>{project.totalBruto}</p>
            </div>
            <hr className="flex bg-slate-300 border-[1px] w-full " />

            {
                renderInfo(project.members)
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