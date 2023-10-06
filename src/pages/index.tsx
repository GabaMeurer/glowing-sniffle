// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import ProjectCard from '@component/components/ProjectCard';
import Link from 'next/link';
import HomePageBackground from '@component/components/HomePageBackground';

interface Project {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    fetch('http://0.0.0.0:8055/items/projects?sort=-date_created&limit=5')
      .then((response) => response.json())
      .then((data) => setProjects(data.data));
  
    fetch('http://0.0.0.0:8055/items/homepage_background/1?fields=*,*.*')
      .then((response) => response.json())
      .then((data) => {
        // Construct the background image URL from the Directus response
        const imageUrl = `http://0.0.0.0:8055/assets/${data.data.homepage_background_image.filename_disk}.png`;
        setBackgroundImageUrl(imageUrl);
      });
  }, []);
  
  const searchBoxStyle = {
    marginTop: '8rem', // posicao margin-top para searchbox
  };

  return (
    <HomePageBackground imageUrl={backgroundImageUrl}>
      <Container>
        {/* Search Box Section */}
        <Row className="justify-content-center" style={searchBoxStyle}>
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
              title="Projetos"
              showIcon={true} // Inclui icon
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
    </HomePageBackground>
  );
};

export default Home;

