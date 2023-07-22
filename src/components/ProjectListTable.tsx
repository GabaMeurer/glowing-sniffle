import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

interface Project {
  id: number;
  name: string;
  description: string;
  project_start_date: string;
  project_end_date: string;
}

function ProjectListTable() {
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.project_start_date}</TableCell>
              <TableCell>{project.project_end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectListTable;
