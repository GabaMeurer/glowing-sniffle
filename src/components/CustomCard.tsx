import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Process } from '@component/pages/api/pmbok_process';
import ListGroup from 'react-bootstrap/ListGroup';

interface CustomCardProps {
  process: Process;
}

const CustomCard: React.FC<CustomCardProps> = ({ process }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Header>{process.process_name}</Card.Header>
      <Card.Body style={{ overflowY: 'auto' }}>
        <Card.Title>Entradas</Card.Title>
        <ListGroup variant="flush">
          {process.inputs?.map((input, index) => (
            <ListGroup.Item key={index}>{input.input_name}</ListGroup.Item>
          ))}
        </ListGroup>
        
        <Card.Title>Ferramentas e Técnicas</Card.Title>
        <ListGroup variant="flush">
          {process.tools_techniques?.map((tool, index) => (
            <ListGroup.Item key={index}>{tool.tt_name}</ListGroup.Item>
          ))}
        </ListGroup>
        
        <Card.Title>Saídas</Card.Title>
        <ListGroup variant="flush">
          {process.outputs?.map((output, index) => (
            <ListGroup.Item key={index}>{output.output_name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const ProcessPage = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8055/items/pmbok_processes?fields=*,*.*');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProcesses(data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {processes.map((process) => (
        <CustomCard key={process.id} process={process} />
      ))}
    </div>
  );
};

export default ProcessPage;






