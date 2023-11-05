import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Process } from '@component/pages/api/pmbok_process';

interface CustomCardProps {
  process: Process;
}

const CustomCard: React.FC<CustomCardProps> = ({ process }) => {
  return (
    <Card>
      <Card.Header>{process.process_name}</Card.Header>
      <Card.Body>
        <Card.Title>Inputs</Card.Title>
        {process.inputs?.map((input, index) => (
          <Card.Text key={index}>{input.input_name}</Card.Text>
        ))}
        <Card.Title>Tools & Techniques</Card.Title>
        {process.tools_techniques?.map((tool, index) => (
          <Card.Text key={index}>{tool.tt_name}</Card.Text>
        ))}
        <Card.Title>Outputs</Card.Title>
        {process.outputs?.map((output, index) => (
          <Card.Text key={index}>{output.output_name}</Card.Text>
        ))}
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

export default CustomCard;





