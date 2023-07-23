import { NextPage } from 'next';
import CreateProjectForm from '@component/components/CreateProjectForm';

const AddProject: NextPage = () => {
  return (
    <div className="container">
      <h1>Add Project</h1>
      <CreateProjectForm />
    </div>
  );
};

export default AddProject;

  