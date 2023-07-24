import { useState, useEffect } from 'react';
import { Project } from '@component/pages/api/project';
import { Table, Button } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { FiFolder } from 'react-icons/fi';
import PaginationComponent from './Pagination';

const ProjectListTable: React.FC<{ isActionHidden?: boolean }> = ({ isActionHidden }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const projectsPerPage = 10;
  const showActions = !isActionHidden;
  //console.log(typeof(projectsPerPage));
  //useEffect(() => {
    // const fetchProjects = async () => {
    //   const res = await fetch(`http://0.0.0.0:8055/items/projects?limit=${projectsPerPage}&page=${currentPage}`);
    //   //http://0.0.0.0:8055/items/projects/?meta=total_count

    //   //const res = await fetch(`http://0.0.0.0:8055/items/projects?limit=10&page=2`);

    //   const data = await res.json();
    //   console.log(data)
    //   setProjects(data.data);
      
    //   if (data && data.meta) {
    //     setTotalPages(Math.ceil(data.meta.total_count / projectsPerPage));
    //   } else {
    //     console.log('data or data.meta is undefined');
    //   }
    // };

    const fetchProjects = async () => {
      const res = await fetch(`http://0.0.0.0:8055/items/projects?limit=${projectsPerPage}&page=${currentPage}`);
      const data = await res.json();
      
      setProjects(data.data);
    };
    
    const fetchTotalCount = async () => {
      const res = await fetch(`http://0.0.0.0:8055/items/projects/?meta=total_count`);
      const data = await res.json();
      
      if (data && data.meta) {
        setTotalPages(Math.ceil(data.meta.total_count / projectsPerPage));
      } else {
        console.log('data or data.meta is undefined');
      }
    };
    
    useEffect(() => {
      fetchProjects();
      fetchTotalCount();
    }, [currentPage]);  // or whatever your dependency array should be
  console.log('totalPages:', totalPages);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.project_start_date}</td>
              <td>{project.project_end_date}</td>
              {showActions && (
                <td className="center-content">
                  <Button variant="primary" size="sm" className="button-space">
                    <BsEye />
                  </Button>
                  <Button variant="success" size="sm" className="button-space">
                    <BsPencil />
                  </Button>
                  <Button variant="danger" size="sm" className="button-space">
                    <BsTrash />
                  </Button>
                  <Button variant="primary" size="sm" className="mr-2">
                    <FiFolder />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
     <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
export default ProjectListTable;