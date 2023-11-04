
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsThreeDots, BsPencil, BsTrash } from 'react-icons/bs';

type ProjectProps = {
    id: number;
    name: string;
    description?: string | null; // Allow string, undefined, or null
    date_updated?: string; // Optional property
    image?: string; // Optional property
  };

  const ProjectCardView: React.FC<{ project: ProjectProps }> = ({ project }) => {
    // Formatting the date here for last updated, adjust as needed
    const formatDate = (date: string | undefined) => {
      return date ? new Date(date).toLocaleDateString() : 'Unknown';
    };
  // Use placeholder image or actual image path from project data
  const imageUrl = project.image || '/path-to-your-placeholder-image.jpg';

  return (
    <Card style={{ width: '18rem' }} className="mb-4">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          {project.description || 'No description provided.'}
        </Card.Text>
        <Button variant="secondary" className="mr-2">
          <BsThreeDots />
        </Button>
        <Button variant="outline-primary" className="mr-2">
          <BsPencil />
        </Button>
        <Button variant="outline-danger">
          <BsTrash />
        </Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated {formatDate(project.date_updated)}</small>
      </Card.Footer>
    </Card>
  );
};


export default ProjectCardView;

