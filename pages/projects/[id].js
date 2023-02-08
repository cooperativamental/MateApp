import { useRouter } from "next/router";
import CallProject from "../../components/CallProject";
import ComponentButton from "../../components/Elements/ComponentButton";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useProgram } from "../../hooks/useProgram";
import { useEffect, useState } from "react";
import { web3 } from "@project-serum/anchor";

// import CallProject from "../../components/CallProject";
// import AdminProjects from "../../components/AdminProjects";

// import styles from "./projectid.module.scss";

const PageHomeProjects = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [projectPublicKey, setProjectPublicKey] = useState();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });

  useEffect(() => {
    if (program && id) {
      const [pdaPublicKey] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("project"), Buffer.from(id), Buffer.from("")],
        program.programId
      );
      setProjectPublicKey(pdaPublicKey);
      console.log(projectPublicKey)
    }
  }, [wallet, id, program]);

  useEffect(() => {
    if (projectPublicKey) {
      (async () => {
        const pdaProject = await program.account.project.fetch(
          projectPublicKey
        );
        console.log(pdaProject);
        const signature = await connection.getSignaturesForAddress(
          projectPublicKey
        );
        console.log(pdaProject)
      })();
    }
  }, [projectPublicKey]);


  return (
      <CallProject keyProject={id} />
  );
};

export default PageHomeProjects;
