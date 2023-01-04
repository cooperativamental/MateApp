import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js"
import { SystemProgram } from "@solana/web3.js"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react"
import { useProgram } from "../hooks/useProgram/index"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Mate } from "../types/mate";

export const useCreateWeb3 = () => {
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const { program } = useProgram({ connection, wallet });

    const createProject = async (
        { name, payments, amount }
        ) => {

        const ratio = 0
        const common_expenses = new anchor.BN(0)
        const currency = "SOL"
        const milestones = 0;
        const client = wallet.publicKey
    
        const [pdaPublicKey] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from("project"), Buffer.from(name), Buffer.from("")],
          program.programId,
        )
    
        const tx = await program.methods
          .createProject(
            name,
            "",
            "",
            ratio,
            payments,
            common_expenses,
            currency,
            amount,
            milestones,
            new anchor.BN(Date.now()),
            new anchor.BN(Date.now()),
            client
          )
          .accounts({
            project: pdaPublicKey,
            payer: wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
          })
          .rpc()
    
        return {
            tx,
            keyProject: pdaPublicKey.toBase58(),
            keyTreasury: pdaPublicKey
        }
    }

    return { createProject: createProject }

} 