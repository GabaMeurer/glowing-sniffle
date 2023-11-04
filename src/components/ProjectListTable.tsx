import { useState, useEffect } from 'react';
import { Project } from '@component/pages/api/project';
import { Table, Button, Dropdown } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { FiFolder } from 'react-icons/fi';
import PaginationComponent from './Pagination';

const ProjectListTable: React.FC<{ isActionHidden?: boolean }> = ({ isActionHidden }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const projectsPerPage = 10;
  const showActions = !isActionHidden;
  const [viewMode, setViewMode] = useState('lista');

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
  }, [currentPage]);

  const renderProjectList = () => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Data de Criação</th>
          <th>Status do Projeto</th>
          {showActions && <th>Ações</th>}
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
  );

  // Placeholder function for rendering cards view
  const renderProjectCards = () => {
    return (
      <div>
        {/* Map through your projects array and create card components */}
        {/* This is where you would create your card layout */}
        <p>Card layout not implemented</p>
      </div>
    );
  };

  return (
    <div>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Visualização
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setViewMode('lista')}>Lista</Dropdown.Item>
          <Dropdown.Item onClick={() => setViewMode('cards')}>Cards</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {viewMode === 'lista' ? renderProjectList() : renderProjectCards()}

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProjectListTable;
