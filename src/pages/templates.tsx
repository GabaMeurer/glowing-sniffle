
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

interface FieldType {
    id: number;
    sort: null | number;
    name: string;
    field_type: string;
    template_section_id: number;
    size: null | number;
  }
  
  interface TemplateSection {
    id: number;
    name: string;
    block: null | string;
    sort: number;
    project_charter_template_id: any;
    section_field_id: FieldType[];
  }
  
  interface DataItem {
    id: number;
    status: string;
    sort: null | number;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    name: string;
    description: string;
    template_section_id: TemplateSection[];
  }


const ProjectChartTemplate = () => {
const [data, setData] = useState<DataItem[] | null>(null);

  // Fetch data from API when component mounts
  useEffect(() => {
    fetch('http://0.0.0.0:8055/items/project_charter_templates?fields=*,*.*.*.*.*')
      .then(response => response.json())
      .then(data => setData(data.data));
  }, [])

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Form>
      {data.map((item, index) => (
        item.template_section_id.map((section, sectionIndex) => 
          section.section_field_id.map((field, fieldIndex) => 
            field.field_type === "date" ? (
              <Form.Group controlId={`date-${index}-${sectionIndex}-${fieldIndex}`}>
                <Form.Label>{field.name}</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            ) : (
              <Form.Group controlId={`text-${index}-${sectionIndex}-${fieldIndex}`}>
                <Form.Label>{field.name}</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            )
          )
        )
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ProjectChartTemplate;
