import { useEffect, useState } from "react";
import Link from "next/link"
import ComponentButton from "../Elements/ComponentButton";
import InputSelect from "../Elements/InputSelect";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react"
import { useProgram } from "../../hooks/useProgram/index.ts"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { SystemProgram, PublicKey } from "@solana/web3.js"
import { useRouter } from "next/router";
import { web3 } from "@project-serum/anchor";

import { HostHook } from "../../hooks/useHost";
import { useDeferredValue } from "react";

const CallProject = ({ keyProject }) => {
  const router = useRouter()
  const host = HostHook()
  const [project, setProject] = useState();
  const [txProject, setTxProject] = useState()

  const { connection } = useConnection()
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });

  useEffect(() => {
    if (program && keyProject && !project) {
      const interval = setInterval(async () => {
        const res = await fetch(`/api/solana/getProject?nameproject=${keyProject}`)
        const json = await res.json()
        setProject(json.projects[0])
      }, 1000);

      (async () => {
        const [pdaPublicKey] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from("project"), Buffer.from(keyProject), Buffer.from("")],
          program.programId,
        )

        const signature = await connection.getSignaturesForAddress(pdaPublicKey)
        setTxProject(signature[0])
      })()
    }
  }, [program, keyProject])

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


<<<<<<< HEAD

  return (
    <div className="flex flex-col gap-4 mt-12 w-8/12">
      <div className="flex w-full justify-between font-semibold">
        <h4 className="text-3xl text-violet-color">Project Name: {project?.account.name}</h4>
=======
  if (!project) {
    return (
      <div className="flex col-start-1 col-end-2 row-start-2 row-end-3 w-9/12 justify-center h-40">
        <div className="animate-spin flex  border-4 border-slate-300 border-l-4 border-l-[#5A31E1] rounded-[50%] h-10 w-10 " />
>>>>>>> dc7b6174e2f6218db4fdaccf90fb2fb27a396582
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-4 mt-12 w-8/12">
        <div className="flex w-full justify-between font-semibold">
          <h4 className="text-3xl text-violet-color">Project Name: {project?.account?.name}</h4>
        </div>
        <hr className="h-[3px] bg-slate-300 border-[1px] w-full" />

        {
          wallet &&
          <div>
            <h3>The proposal:</h3>
            {
              project?.account?.members?.map(memb => {
                if (memb?.pubkey === wallet?.publicKey?.toBase58()) {
                  return (
                    <div className={`flex items-center text-black justify-between w-full py-1 px-6 rounded-md ${memb?.status === "INVITED" ? "bg-[#FA9972]" : "bg-[#3BB89F]"}`}>
                      <p>You</p>
                      <div className="flex gap-4 items-center">

                        <p>
                          {(memb?.amount / Number(project?.account?.amount)) * 100}
                        </p>
                        <div className="flex gap-2 items-center">
                          <p>
                            {memb?.amount}
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
                        memb?.status === "INVITED" ?
                          <ComponentButton
                            buttonText="Sign Contract"
                            buttonEvent={() => signContract(memb?.pubkey)}
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
        <div className="mb-10">
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
                        //   navigator.clipboard.writeText(e.target.value)
                        // }}
                        className="flex text-base gap-2 w-4/12 overflow-ellipsis truncate"
                      >
                        <p className="text-box-color">Wallet: </p>
                        <p>{memb.pubkey}</p>
                      </div>
                    </div>
                  )
                }

              })

            }
          </div>
        </div>
<<<<<<< HEAD
      }
      <div className="mb-10">
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
                      //   navigator.clipboard.writeText(e.target.value)
                      // }}
                      className="flex text-base gap-2 w-4/12 overflow-ellipsis truncate"
                    >
                      <p className="text-box-color">Wallet: </p>
                      <p>{memb.pubkey}</p>
                    </div>
                  </div>
                )
              }

            })

          }
        </div>
      </div>
      <p className="text-white text-2xl">Send this link to your partners to sign the agreement.</p>
      <Link href={`https://${host}${router.asPath}`}>
        <a target="blank" className="w-full break-all text-xl text-orange-color">https://${host}${router.asPath}</a>
      </Link>
      <div className="flex w-full justify-around">
    
        <Link target="_blank" href={`mailto:?subject=Sign%20${project?.account?.name}&body=Hello%20Partner%20Sign%20"https://${host}${router.asPath}"`}>
          <a target="blank" className="btn flex items-center justify-center">copy link</a>
        </Link>
      </div>
      <div className="flex w-full justify-around">
        <Link target="_blank" href={`mailto:?subject=Sign%20${project?.account?.name}&body=Hello%20Partner%20Sign%20"https://${host}${router.asPath}"`}>
          <a target="blank" className="btn flex items-center justify-center">email to</a>
        </Link>
      </div>
      <p className="text-white text-xs">Solana Explorer TX: </p>
      <Link href={`https://explorer.solana.com/tx/${txProject?.signature}?cluster=devnet`}>
        <a target="blank" className="w-full break-all text-xs">https://explorer.solana.com/tx/{txProject?.signature}?cluster=devnet</a>
      </Link>
    </div >
  );
=======
        {
          project?.account?.status !== "PAID" ?
            <div className="flex w-full justify-center">
              <ComponentButton
                buttonText="Copy Invoice Link"
                buttonEvent={(e) => {
                  navigator?.clipboard?.writeText(`${host}/pay/${project?.account.name}`)
                }}
              />
            </div>
            :
            <div>
              <p className="text-white text-2xl">Send this link to your partners to sign the agreement.</p>
              <Link href={`https://${host}${router.asPath}`}>
                <a target="blank" className="w-full break-all text-xl text-orange-color">https://{host}{router.asPath}</a>
              </Link>
              <div className="flex flex-col w-full items-center gap-4">
                <ComponentButton
                  buttonEvent={() => {
                    navigator?.clipboard?.writeText(`https://${host}${router.asPath}`)
                  }}
                  buttonText="copy link"
                />
                <Link target="_blank" href={`mailto:?subject=Sign%20${project?.account?.name}&body=Hello%20Partner%20Sign%20"https://${host}${router.asPath}"`}>
                  <a target="blank" className="btn flex items-center justify-center">email to</a>
                </Link>
              </div>
              <p className="text-white text-xs">Solana Explorer TX: </p>
              <Link href={`https://explorer.solana.com/tx/${txProject?.signature}?cluster=devnet`}>
                <a target="blank" className="w-full break-all text-xs">https://explorer.solana.com/tx/{txProject?.signature}?cluster=devnet</a>
              </Link>
            </div>
        }
      </div >
    );
  }
>>>>>>> dc7b6174e2f6218db4fdaccf90fb2fb27a396582
};

export default CallProject;