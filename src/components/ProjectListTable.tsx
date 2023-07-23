import React from 'react';
import { Project } from '@component/pages/api/project';

interface ProjectListTableProps {
  projects: Project[];
}

const ProjectListTable: React.FC<ProjectListTableProps> = ({ projects }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.project_start_date}</td>
            <td>{project.project_end_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectListTable;
