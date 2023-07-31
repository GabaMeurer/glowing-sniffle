// ProjectCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';


interface MyCardProps {
  title: string;
  content: string | JSX.Element[]; // Allow an array of JSX elements
}

const ProjectCard: React.FC<MyCardProps> = ({ title, content }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{content}</Card.Text>
    </Card.Body>
  </Card>
);

export default ProjectCard;

