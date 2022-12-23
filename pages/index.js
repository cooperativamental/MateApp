import { useState, useEffect } from "react";
import { useRouter } from "next/router";


import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react"
import { useProgram } from "../hooks/useProgram/index.ts"

import Projects from "../components/Projects";
import HeadBar from "../components/Elements/HeadTab"
import ComponentButton from "../components/Elements/ComponentButton";
import { Processor } from "postcss";

const PageHomeProjects = () => {
  const router = useRouter()

  const { connection } = useConnection()
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });

  const [showProject, setShowProject] = useState(
    (() => {
      let showPrj = ""
      if (router.query.holder) {
        router.query.holder === "true" ?
          showPrj = "OPEN"
          :
          showPrj = "CLOSED"
      } else {
        showPrj = "OPEN"
      }
      return showPrj
    })()
  )
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([]);
  const [tabs, setTabs] = useState([
    { name: 'Open', current: true, value: "HOSTING" },
    { name: 'Invited', current: false, value: "INVITED" },
  ])
  const [listProjects, setListProjects] = useState([]);

  useEffect(() => {
    if(wallet){
      console.log(wallet.publicKey.toBase58())
      fetch(`/api/solana/getAllProjectsByPubkey?pubkey=${wallet.publicKey.toBase58()}`)
      .then(async (res)=>{
        const projects = await res.json()
        console.log(projects)
      })
    }
  }, [wallet])

  return (
    <div className="flex flex-col w-8/12 items-center gap-8">
      <ComponentButton
        buttonStyle="w-max"
        buttonText="Start a project"
        buttonEvent={() => router.push("/createproject")}
      />
      <h3 className="text-2xl font-bold">Projects Contracts</h3>
      <HeadBar
        event={(value) => {
          setShowProject(value)
          const setTab = tabs.map(tab => {
            if (tab.value === value) {
              tab.current = true
            } else {
              tab.current = false
            }
            return tab
          })
          setTabs(setTab)
        }}
        tabs={tabs}
      />
      <Projects showModel={true} projects={listProjects} />
    </div>
  );
};

export default PageHomeProjects;
