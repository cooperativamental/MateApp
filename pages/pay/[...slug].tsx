import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as web3 from "@solana/web3.js"
import { PublicKey, SystemProgram } from "@solana/web3.js"
import { useProgram } from "../../hooks/useProgram/index"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { createQR, encodeURL, fetchTransaction } from "@solana/pay";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Comment = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [pda, setPda] = useState<String | null>();
  const { connection } = useConnection()
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const qrRef = useRef(null)
  const { publicKey } = useWallet();

  // Generate the unique reference which will be used for this transaction
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  const searchParams = new URLSearchParams();

  // Add it to the params we'll pass to the API
  searchParams.append('reference', reference.toString());

  searchParams.append('pdaPublicKey', pda?.toString());

  async function getTransaction() {
    if (!publicKey) {
      return;
    }

    type MakeTransactionInputData = {
      account: string,
    }

    const body: MakeTransactionInputData = {
      account: publicKey.toString(),
    }

    const response = await fetch(`/api/makeTransaction?${searchParams.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })

    type MakeTransactionOutputData = {
      transaction: string,
      message: string,
    }

    const json = await response.json() as MakeTransactionOutputData

    if (response.status !== 200) {
      console.error(json);
      return;
    }

    // Deserialize the transaction from the response
    const transaction = Transaction.from(Buffer.from(json.transaction, 'base64'));
    setTransaction(transaction);
    console.log(transaction);
  }

  useEffect(() => {
    if (program && slug.length) {
      console.log(slug)
      const [pdaPublicKey] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("project"), Buffer.from(slug[0]), Buffer.from("")],
        program.programId,
      )
      setPda(pdaPublicKey.toString())
      const urlParams = {
        recipient: new PublicKey(pda ?? "CUtKCTar8gb5VYCDWbX5yFMVrhbnod9aCNf4cfhD2qPK"),
        pdaPublicKey: pda,
        label: "Mate Protocol",
        message: "Thanks for using the Mate Protocol",
      }

      // Encode the params into the format shown
      const url = encodeURL(urlParams)
      console.log({ url })
      const qr = createQR(url, 512, 'transparent')
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        qr.append(qrRef.current)
      }
    }
  }, [slug, program])
  useEffect(() => {
    getTransaction()
  }, [publicKey])


  const payProject = async (pda) => {
    console.log("pda", pda)
    const project = await program.account.project.fetch(pda)
    console.log(project)
    const members = (project.members as any)?.map((payment) => payment.pubkey)

    const [group] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("group"), Buffer.from("")],
      program.programId,
    )
      console.log(members)
    const tx = await program.rpc.payProject({
      accounts: {
        payer: publicKey,
        group,
        project: pda,
        member0: members.length > 0 ? members[0] : pda,
        member1: members.length > 1 ? members[1] : pda,
        member2: members.length > 2 ? members[2] : pda,
        member3: members.length > 3 ? members[3] : pda,
        member4: members.length > 4 ? members[4] : pda,
        member5: members.length > 5 ? members[5] : pda,
        member6: members.length > 6 ? members[6] : pda,
        member7: members.length > 7 ? members[7] : pda,
        member8: members.length > 8 ? members[8] : pda,
        member9: members.length > 9 ? members[9] : pda,
        systemProgram: SystemProgram.programId,
      }
    })
    const cluster = ["devnet", "mainnet", "testnet"].includes(process.env.NEXT_PUBLIC_NETWORK) ? process.env.NEXT_PUBLIC_NETWORK : `custom&customUrl=${process.env.NEXT_PUBLIC_NETWORK}`

    console.log(`https://explorer.solana.com/tx/${tx}?cluster=${cluster}`)
    const payedProject = await program.account.project.fetch(pda)
    // commonExpenses para terceros.
    console.log(payedProject)
    await fetch("/api/updateProject",
      {
        method: "POST",
        body: JSON.stringify({
          pda: `${pda}`,
          status: "DISTRIBUTED"
        }),
        headers: {
          "Content-Type": "json",
        },
      }
    )
  }

  // Send the fetched transaction to the connected wallet
  async function trySendTransaction() {
    if (!transaction) {
      return;
    }
    try {

    } catch (e) {
      console.error(e)
    }
  }

  // Send the transaction once it's fetched
  useEffect(() => {
    trySendTransaction()
  }, [transaction])

  return (
    <>
      {

        (!connection || !wallet) ?
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
          :
          <>
            <button onClick={() => payProject(pda)}>pay project</button>
          </>
      }
    </>
  )
}

export default Comment