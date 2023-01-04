import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import InputSelect from "../../Elements/InputSelect";
import ComponentButton from "../../Elements/ComponentButton"

const InfoProject = ({ setProject, project, team, confirmInfoProject }) => {
  // const [project, setProject] = useState({
  //   start: "",
  //   end: "",
  //   nameProject: "",
  //   client: ""
  // })
  const [clients, setClients] = useState()
  const [errors, setErrors] = useState({
    nameProject: true,
  })
  const [loading, setLoading] = useState(true)
  const refDateStart = useRef()
  const refDateEnd = useRef()
  const router = useRouter()

  const handlerProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let err = {}
    Object.keys(errors).map(prop => {
      err = {
        ...err,
        [prop]: !project[prop]
      }
    })
    setErrors(err)
  }, [project])

  const handlerConfirm = () => {
    if (!Object.values(errors).find(error => !!error)) {
      confirmInfoProject("INFO_PROJECT", true, "BUDGET")
    }
  };


  return (
    <div className="pt-2 flex flex-col items-center gap-8 w-8/12">
      <div className="flex flex-col w-full text-center">
        <InputSelect
          conditionError={errors?.nameProject}
          type="text"
          name="nameProject"
          placeholder="Project name"
          value={project?.nameProject}
          onChange={handlerProject}
          subtitle="Up to 100 characters"
          styleSubtitle="text-xs pl-5 text-center"
          inputStyle="text-center"
        />
      </div>

      <div className=" flex w-full flex-col items-center gap-2 mt-6">

        <ComponentButton
          conditionDisabled={Object.values(errors).find(error => !!error)}
          buttonStyle="w-min"
          buttonText="Start"
          buttonEvent={handlerConfirm}
        />
        {
          Object.keys(errors).length > 0 &&
          <p className="flex flex-col items-center text-xs justify-center">Add a name to the project.</p>
        }
      </div>
    </div >
  );
};

export default InfoProject;


