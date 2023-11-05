import { useState, useEffect } from 'react';
import { Project } from '@component/pages/api/project';
import { Table } from 'react-bootstrap';
import { formatDateOrTimeAgo } from '@component/utils/formatDateOrTimeAgo';

const SimpleProjectListTable: React.FC<{ isActionHidden?: boolean, reload: number }> = ({ isActionHidden, reload }) => {
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
  }, [currentPage, reload]);  // Reload the data whenever 'reload' changes

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Adicionado</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{formatDateOrTimeAgo(project.date_created)}</td>
              {showActions && <td>{/* Actions here */}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SimpleProjectListTable;


