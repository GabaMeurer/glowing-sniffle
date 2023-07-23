import React from 'react';
import { Table } from 'react-bootstrap';
import { Project } from '@component/pages/api/project';

interface ProjectListTableProps {
  projects: Project[];
}

const ProjectListTable: React.FC<ProjectListTableProps> = ({ projects }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
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
  </Table>
);

export default ProjectListTable;
