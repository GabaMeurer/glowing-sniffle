import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface CreateProjectFormProps {
  onProjectAdded: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onProjectAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setETA] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('http://0.0.0.0:8055/items/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        project_start_date: startDate,
        project_eta: endDate,
      }),
    });

    const data = await response.json();

    if (data) {
      // Clear the form
      setName('');
      setDescription('');
      setStartDate('');
      setETA('');

      // Call the onProjectAdded function to fetch the projects again
      onProjectAdded();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProjectDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formProjectStartDate">
          <Form.Label>Data de Início</Form.Label>
          <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formProjectEndDate">
          <Form.Label>Projeto ETA</Form.Label>
          <Form.Control type="date" value={endDate} onChange={e => setETA(e.target.value)} />
        </Form.Group>

      <Button variant="primary" type="submit">
        Add Project
      </Button>
    </Form>
  );
};

export default CreateProjectForm;