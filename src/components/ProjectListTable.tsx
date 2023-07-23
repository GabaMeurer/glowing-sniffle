import { Project } from '@component/pages/api/project';
import { Table, Button } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

// In your ProjectListTable component
const ProjectListTable: React.FC<{ projects: Project[], showActions?: boolean }> = ({ projects, showActions = true }) => {
  // ...

  return (
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
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectListTable;

