import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CardList from "../Elements/CardList";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Projects = ({ projects, fnProjects, queryId }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(queryId ? queryId : false);
  const [listProject, setListProjects] = useState([])
  const [sorting, setSorting] = useState(undefined)
  const wallet = useAnchorWallet();

  const refProject = useRef()

  useEffect(() => {
    setListProjects(projects)
  }, [projects])

  const selectProject = ({ id, project }) => {
    fnProjects(id),
      setSelected(id)
  };


  const sort = (e) => {
    if (sorting === e.target.id) {
      const newList = [...listProject].reverse()
      setListProjects(newList)
    } else {
      setSorting(e.target.id)
      setListProjects(listProject.sort((a, b) => {

        const alow = a[e.target.id] && a[e.target.id].toLowerCase()
        const blow = b[e.target.id] && b[e.target.id].toLowerCase()
        if (!alow && blow) {
          return -1
        }
        if (alow > blow) {
          return 1;
        }
        if (alow < blow) {
          return -1
        }
        return 0
      }
      ))
    }
  }


  return (
    <div className="w-full text-center table-fixed border-slate-200">
      {
        wallet
          ?
          <>
            <CardList list={listProject} noResults="No projects yet" />
          </>
          :
          <p className="text-orange-color">Connect your wallet to see your projects.</p>

      }
    </div>
  );
};

export default Projects;
