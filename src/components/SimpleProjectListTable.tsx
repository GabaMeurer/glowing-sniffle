import { useState, useEffect } from 'react';
import { Project } from '@component/pages/api/project';
import { Table } from 'react-bootstrap';


const SimpleProjectListTable: React.FC<{ isActionHidden?: boolean }> = ({ isActionHidden }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage] = useState(1);
  const showActions = !isActionHidden;

    const fetchProjects = async () => {
        const res = await fetch(`http://0.0.0.0:8055/items/projects?sort=-date_created&limit=5`);
      const data = await res.json();
      
      setProjects(data.data);
    };
    
    useEffect(() => {
      fetchProjects();
      
    }, [currentPage]);  


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Added Date</th>
           
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.date_created}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default SimpleProjectListTable;

// const ProjectListTable: React.FC<{ isActionHidden?: boolean, projects: Project[] }> = ({ isActionHidden, projects }) => {
//     // other code here...
  
//     useEffect(() => {
//       fetchTotalCount();
//     }, [currentPage]);
  
//     // more code here...
//   };