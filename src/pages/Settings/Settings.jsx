import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import Heading from "../../components/Heading/Heading";
import DisplayDeleted from "./components/DisplayDeleted/DisplayDeleted";

import Database from "./components/Database/Database";

function Settings() {
  const [createDbDialog, setCreateDbDialog] = useState(false);
  const [loadDbDialog, setLoadDbDialog] = useState(false);
  const [importDbDialog, setImportDbDialog] = useState(false);
  const [exportDbDialog, setExportDbDialog] = useState(false);
  const [exportCsvDbDialog, setExportCsvDbDialog] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Heading title={"Data Management"} />
      <Database/>
      <Heading title={"Deleted Records"} />
      <DisplayDeleted />
    </>
  );
}

export default Settings;
