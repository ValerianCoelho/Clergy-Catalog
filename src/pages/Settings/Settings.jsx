import { useEffect } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import Heading from "../../components/Heading/Heading";
import DisplayDeleted from "./components/DisplayDeleted/DisplayDeleted";

import Database from "./components/Database/Database";

function Settings() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Heading title={"Data Management"} />
      <Database />
      <Heading title={"Search Deleted Records"} />
      <DisplayDeleted />
    </>
  );
}

export default Settings;
