import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import  * as anchor from "@project-serum/anchor";
import  { AnchorProvider } from "@project-serum/anchor";


import idl from "./mate.json"

const MATE_PROGRAM = idl.metadata.address;
const programID = new PublicKey(MATE_PROGRAM);

export interface Wallet {
  signTransaction(
    tx: anchor.web3.Transaction
  ): Promise<anchor.web3.Transaction>;
  signAllTransactions(
    txs: anchor.web3.Transaction[]
  ): Promise<anchor.web3.Transaction[]>;
  publicKey: anchor.web3.PublicKey;
}

type ProgramProps = {
  connection: Connection;
  wallet: Wallet;
};

export const useProgram = ({ connection, wallet }: ProgramProps) => {
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();

  useEffect(() => {
    updateProgram();
  }, [connection, wallet]);

  const updateProgram = () => {
    const provider = new anchor.Provider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });
    const program = new anchor.Program(idl as any, programID, provider);
    setProgram(program);
  };

  return {
    program,
  };
};






