import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { FiFolder } from 'react-icons/fi';
import { formatDate } from '@component/utils/formatDate';

type ProjectProps = {
  id: number;
  name: string;
  description?: string | null;
  date_created?: string;
  date_updated?: string;
  project_header_image?: string;
};

const IMAGE_BASE_URL = 'http://0.0.0.0:8055/assets/';

const ProjectCardView: React.FC<{ project: ProjectProps }> = ({ project }) => {
  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8055/files?filter[folder]=e2e7ba70-f4f9-4749-85d2-668819a39843');
        const data = await response.json();
        
        const imageUrls = data.data.map((file: any) => IMAGE_BASE_URL + file.id);
        setRandomImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const getRandomImage = () => {
    return randomImages.length > 0
      ? randomImages[Math.floor(Math.random() * randomImages.length)]
      : '/path-to-your-default-placeholder-image.jpg'; // Preciso arrumar uma imagem default
  };

  const imageUrl = project.project_header_image
    ? `${IMAGE_BASE_URL}${project.project_header_image}`
    : getRandomImage();

  // Inline styles
  const cardStyle = {
    width: '18rem',
    marginBottom: '1rem'
  };

  const imageStyle = {
    height: '120px',
    objectFit: 'cover' as 'cover',
  };

  const cardBodyStyle = {
    overflowY: 'auto' as 'auto',
  };

  const cardFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={imageUrl} style={imageStyle} />
      <Card.Body style={cardBodyStyle}>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          {project.description || 'No description provided.'}
        </Card.Text>
        <Button variant="primary" size="sm">
          <BsEye />
        </Button>
        {' '}
        <Button variant="success" size="sm">
          <BsPencil />
        </Button>
        {' '}
        <Button variant="danger" size="sm">
          <BsTrash />
        </Button>
        {' '}
        <Button variant="info" size="sm">
          <FiFolder />
        </Button>
      </Card.Body>
      <Card.Footer style={cardFooterStyle}>
  <small className="text-muted">
    {project.date_updated
      ? `Last updated: ${formatDate(project.date_updated, true)}`
      : `Created on: ${formatDate(project.date_created, true)}`}
  </small>
</Card.Footer>

    </Card>
  );
};

export default ProjectCardView;
