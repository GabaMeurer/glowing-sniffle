//Add Project

import { useState, useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import CreateProjectForm from '@component/components/CreateProjectForm';
import SimpleProjectListTable from '@component/components/SimpleProjectListTable';

const AddProject = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [reload, setReload] = useState(0);  // new state for reloading projects

  const handleProjectAdded = useCallback(async () => {
    // Here, instead of fetching all projects, we simply update the reload state.
    // The actual fetching of projects will be done in the SimpleProjectListTable component.
    setReload(reload + 1);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);  // hide the alert after 3 seconds
  }, [reload]);

  return (
    <div className="container">
      <h1 className="table-space"> Project</h1>
      {showAlert && <Alert variant="success">Project added successfully!</Alert>}
      <CreateProjectForm onProjectAdded={handleProjectAdded} />
      <h2 className="table-space">Last 5 added projects</h2>
      <SimpleProjectListTable isActionHidden={true} reload={reload} />
    </div>
  );
};
export default AddProject;
