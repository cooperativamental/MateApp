import { useRouter } from "next/router";
import { useEffect } from "react";
import CallProject from "../../components/CallProject";
import ComponentButton from "../../components/Elements/ComponentButton";

// import CallProject from "../../components/CallProject";
// import AdminProjects from "../../components/AdminProjects";

// import styles from "./projectid.module.scss";

const PageHomeProjects = () => {
  const router = useRouter();
  const { id } = router?.query;



  return (
      <CallProject keyProject={id} />
  );
};

export default PageHomeProjects;
