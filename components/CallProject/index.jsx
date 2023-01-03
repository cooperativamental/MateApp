import { useEffect, useState } from "react";
import { useHost } from "../../context/host";
import ComponentButton from "../Elements/ComponentButton";
import InputSelect from "../Elements/InputSelect";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react"
import { useProgram } from "../../hooks/useProgram/index.ts"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { SystemProgram, PublicKey } from "@solana/web3.js"
import { useRouter } from "next/router";
import { web3 } from "@project-serum/anchor";


const CallProject = ({ keyProject }) => {
  const router = useRouter()
  const [project, setProject] = useState();
  const { host } = useHost()
  const [revision, setRevision] = useState(0)
  const [wallets, setWallets] = useState()
  const [selectWallet, setSelectWallet] = useState()

  const { connection } = useConnection()
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });
  // const [balance, setBalance] = useState()

  useEffect(() => {
    if (program) {
      fetch(`/api/solana/getProject?nameproject=${keyProject}`)
        .then(async res => {
          const json = await res.json()
          setProject(json.projects[0])
        })
    }
  }, [program])

  const signContract = async (membPubKey) => {
    const [pdaPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("project"), Buffer.from(project?.account.name), Buffer.from("")],
      program.programId,
    )
    const tx = await program.methods.confirmProjectParticipation()
      .accounts({
        user: new PublicKey(membPubKey),
        project: pdaPublicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    router.reload()
  }

  return (
    <div className="flex flex-col gap-4 mt-12 w-8/12">
      <div className="flex text-xl w-full justify-between font-semibold">
        <h4 >Project Name</h4>
        <h4>{project?.account.name}</h4>
      </div>
      <hr className="h-[3px] bg-slate-300 border-[1px] w-full" />

      {
        wallet &&
        <div>
          <h3>The proposal:</h3>
          {
            project?.account?.members.map(memb => {
              if (memb.pubkey === wallet?.publicKey?.toBase58()) {
                console.log(memb, project)
                return (
                  <div className={`flex items-center text-black justify-between w-full py-1 px-6 rounded-md ${memb.status === "INVITED" ? "bg-[#FA9972]" : "bg-[#3BB89F]"}`}>
                    <p>You</p>
                    <div className="flex gap-4 items-center">

                      <p>
                        {(Number(project.account.amount) * memb.amount) / 100}
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
                    {
                      memb.status === "INVITED" ?
                        <ComponentButton
                          buttonText="Sign Contract"
                          buttonEvent={() => signContract(memb.pubkey)}
                          buttonStyle="h-6 text-base"
                        />
                        :
                        <p>CONFIRMED</p>
                    }
                  </div>
                )
              }

            })

          }
        </div>
      }
      <div >
        <h3>The Team:</h3>
        <div className="flex flex-col gap-4">
          {
            project?.account?.members.map(memb => {
              if (memb.pubkey !== wallet?.publicKey?.toBase58()) {
                return (
                  <div className={`flex items-center  justify-between w-full py-1 px-6 rounded-md ${memb.status === "INVITED" ? "bg-[#FCF776] text-black" : "bg-[#3BB89F] text-white"}`}>
                    <p>Member</p>
                    <div className="flex gap-2 items-center">
                      {memb.status === "INVITED" ? "Pending" : "Signed"}
                    </div>
                    <div
                      // onDoubleClick={(e) => {
                      //   console.log(e)
                      //   navigator.clipboard.writeText(e.target.value)
                      // }}
                      className="flex text-base gap-2 w-4/12 overflow-ellipsis truncate"
                    >
                      <p className="text-[#FA9972]">Wallet: </p>
                      <p>{memb.pubkey}</p>
                    </div>
                  </div>
                )
              }

            })

          }
        </div>
      </div>

    </div >
  );
};

export default CallProject;