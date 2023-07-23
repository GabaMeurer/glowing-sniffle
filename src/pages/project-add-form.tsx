import { useEffect, useState, useCallback } from 'react';
import { NextPage } from 'next';
import CreateProjectForm from '@component/components/CreateProjectForm';
import ProjectListTable from '@component/components/ProjectListTable';
import { Project } from '@component/pages/api/project';

const AddProject: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    const response = await fetch('http://0.0.0.0:8055/items/projects');
    const data = await response.json();
    setProjects(data.data);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container">
      <h1>Add Project</h1>
      <CreateProjectForm onProjectAdded={fetchProjects} />
      <h2>Existing Projects</h2>
      <ProjectListTable projects={projects} showActions={false} />
    </div>
  );
};

export default AddProject;
