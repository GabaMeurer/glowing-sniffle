import React, { useEffect, useState } from 'react';


interface Project {
  id: number;
  name: string;
  description: string;
  project_start_date: string;
  project_end_date: string;
}

function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Replace with your Directus API URL
      const apiUrl = 'http://0.0.0.0:8055/items/projects';
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data) {
          setProjects(data.data);
        } else {
          // There was a problem. The error information will be in data.errors
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.project_start_date}</td>
            <td>{project.project_end_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjectListPage;