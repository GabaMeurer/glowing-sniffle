import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface CreateProjectFormProps {
  onProjectAdded: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onProjectAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
        project_end_date: endDate,
      }),
    });

    const data = await response.json();

    if (data) {
      // Clear the form
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');

      // Call the onProjectAdded function to fetch the projects again
      onProjectAdded();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProjectName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formProjectDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formProjectStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formProjectEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Project
      </Button>
    </Form>
  );
};

export default CreateProjectForm;
