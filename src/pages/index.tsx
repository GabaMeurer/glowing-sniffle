// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import ProjectCard from '@component/components/ProjectCard';
import Link from 'next/link';

// Define an interface for the project data
interface Project {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('http://0.0.0.0:8055/items/projects?sort=-date_created&limit=5')
      .then((response) => response.json())
      .then((data) => setProjects(data.data));
  }, []);

  return (
    <Container>
      {/* Search Box Section */}
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <InputGroup>
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Card Section */}
      <Row className="mt-5">
        <Col xs={12} md={6} lg={3}>
          <ProjectCard title="Agenda" content="" />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <ProjectCard
            title="Projects"
            content={projects.map((project) => (
              <div key={project.id}>
                <Link href={`/project-detail/${project.id}`}>{project.name}</Link>
              </div>
            ))}
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <ProjectCard title="Atalhos" content="" />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <ProjectCard title="Anúncios" content="" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

