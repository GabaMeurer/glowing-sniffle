// ProjectCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaFolder } from 'react-icons/fa'; // Importing Font Awesome folder icon

interface MyCardProps {
  title: string;
  content: string | JSX.Element | JSX.Element[];
  showIcon?: boolean; // Optional prop to conditionally render the icon
}

const ProjectCard: React.FC<MyCardProps> = ({ title, content, showIcon }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>
        {title} {showIcon && <FaFolder />} {/* Conditionally render the icon */}
      </Card.Title>
      <Card.Text>{content}</Card.Text>
    </Card.Body>
  </Card>
);

export default ProjectCard;