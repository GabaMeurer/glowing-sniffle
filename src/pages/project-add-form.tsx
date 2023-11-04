//Add Project

import { useState, useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import CreateProjectForm from '@component/components/CreateProjectForm';
import SimpleProjectListTable from '@component/components/SimpleProjectListTable';

const AddProject = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [reload, setReload] = useState(0);
  const [formError, setFormError] = useState<string | null>(null); // Add this line
  
  const handleProjectAdded = useCallback(async () => {
    setReload(reload + 1);
    setShowAlert(true);
    setFormError(null);  // Clear the form error
    setTimeout(() => setShowAlert(false), 3000);
  }, [reload]);

  const handleValidationError = () => { 
    console.log("Validation error occurred!"); // Add this
    setFormError('Please fill in the mandatory fields.');
}

  return (
    <div className="container">
      <h1 className="table-space"> Adicionar Projeto</h1>
      {showAlert && <Alert variant="success">Project adicionado com sucesso!</Alert>}
      
      <CreateProjectForm 
        onProjectAdded={handleProjectAdded} 
        errorMessage={formError} // Pass the error message to the form component
        onValidationError={handleValidationError}  // Pass the validation error handler
      />
      
      <h2 className="table-space">Projetos Adicionados recentemente</h2>
      <SimpleProjectListTable isActionHidden={true} reload={reload} />
    </div>
  );
};
export default AddProject;
