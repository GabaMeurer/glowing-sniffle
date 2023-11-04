import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface CreateProjectFormProps {
  onProjectAdded: () => void;
  errorMessage?: string | null;
  onValidationError: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ 
  onProjectAdded, 
  errorMessage, 
  onValidationError 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setETA] = useState('');

  const isFormValid = () => {
    return name.trim().length > 0 && startDate.trim().length > 0 && endDate.trim().length > 0;
};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!isFormValid()) {
      onValidationError();
      return;
  }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      project_start_date: startDate.trim() || null,
      project_eta: endDate.trim() || null
    };

    const response = await fetch('http://0.0.0.0:8055/items/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Clear the form
      setName('');
      setDescription('');
      setStartDate('');
      setETA('');
      onProjectAdded();
    } else {
      console.error(data.message);
      onValidationError();  // Trigger the error handler for validation errors.
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

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}  {/* Display error message */}

        <Button variant="primary" type="submit" className="mt-3 mb-3" disabled={!isFormValid()}>
          Adicionar Projeto
        </Button>
    </Form>
  );
};

export default CreateProjectForm;

