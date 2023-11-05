import React from 'react';
import { useState, useEffect } from 'react';
import { Project } from '@component/pages/api/project';
import { Table, Button, Dropdown } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { FiFolder } from 'react-icons/fi';
import PaginationComponent from './Pagination';
import ProjectCardView from './ProjectCardView';
import { formatDate } from '@component/utils/formatDate';

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
    <Table className="fixed-layout-table" striped bordered hover>
      <thead>
        <tr>
          <th className="number-column">#</th>
          <th className="name-column">Nome</th>
          <th className="description-column">Descrição</th>
          <th className="date-column">Inicio do Projeto</th>
          <th className="status-column">Status do Projeto</th>
          {showActions && <th className="actions-column">Ações</th>}
        </tr>
      </thead>
      <tbody>

        {projects.map((project, index) => (
          <tr key={project.id}>
            
            <td>{index + 1}</td>
            <td>{project.name}</td>
            <td className="long-text">{project.description}</td>
            <td>{formatDate(project.project_start_date)}</td>
            <td>{project.project_status}</td>
            {showActions && (
              <td className="center-content">
                <Button variant="secondary" size="sm" className="button-space">
                  <BsEye />
                </Button>
                <Button variant="secondary" size="sm" className="button-space">
                  <BsPencil />
                </Button>
                <Button variant="danger" size="sm" className="button-space">
                  <BsTrash />
                </Button>
                <Button variant="secondary" size="sm" className="mr-2">
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
      <div className="card-container">
        {projects.map((project) => (
          <ProjectCardView key={project.id} project={project} />
        ))}
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
