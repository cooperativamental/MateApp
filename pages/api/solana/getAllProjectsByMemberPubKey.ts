import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js"
import { Transaction } from "@solana/web3.js";
import idl from "../../../hooks/useProgram/mate.json"

const getAllProjectsByPubkey = async (req, res) => {
    try {
        const connection = new web3.Connection(["devnet", "mainnet", "testnet"].includes(process.env.NEXT_PUBLIC_NETWORK ?? "") ? web3.clusterApiUrl(process.env.NEXT_PUBLIC_NETWORK as web3.Cluster ?? "devnet") : process.env.NEXT_PUBLIC_NETWORK ?? web3.clusterApiUrl("devnet"))
        const wallet = {
            signTransaction(tx: Transaction): Promise<Transaction> { return "" as unknown as Promise<Transaction> },
            signAllTransactions(txs: Transaction[]): Promise<Transaction[]> { return "" as unknown as Promise<Transaction[]> },
            publicKey: new web3.PublicKey("CUtKCTar8gb5VYCDWbX5yFMVrhbnod9aCNf4cfhD2qPK")
        }
        const anchorProvider = new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: "recent",
            commitment: "processed",
        });
        anchor.setProvider(anchorProvider);

        const MATE_PROGRAM = idl.metadata.address;
        const programID = new web3.PublicKey(MATE_PROGRAM);
        const program = new anchor.Program(idl as any, programID, anchorProvider);
        const allprojects = await program.account.project.all()
        const projects = req.query.pubkey ? allprojects.filter((project: any) =>
            project.account.members.some(payment => {
                return (payment.pubkey as web3.PublicKey).toString() == req.query.pubkey
            })
        )
            :
            allprojects
        res.status(200).send({
            projects
        })
    } catch (err) {
        res.status(500).send({ err })
    }
}

export default getAllProjectsByPubkey;
