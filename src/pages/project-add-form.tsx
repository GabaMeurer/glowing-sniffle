//Add Project

import { useState, useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import CreateProjectForm from '@component/components/CreateProjectForm';
import SimpleProjectListTable from '@component/components/SimpleProjectListTable';

const AddProject = () => {
  const [showAlert, setShowAlert] = useState(false);

  const fetchProjects = useCallback(async () => {
    const response = await fetch('http://0.0.0.0:8055/items/projects');
    const data = await response.json();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // hide the alert after 3 seconds
  }, []);

  return (
    <div className="container">
      <h1 className="table-space"> Project</h1>
      {showAlert && <Alert variant="success">Project added successfully!</Alert>}
      <CreateProjectForm onProjectAdded={fetchProjects} />
      <h2 className="table-space">Last 5 added projects</h2>
      <SimpleProjectListTable isActionHidden={true} />
    </div>
  );
};
export default AddProject;