import React, { useEffect, useState } from "react";
import { Form, Col, Row, Container, Card, Button } from "react-bootstrap";

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://0.0.0.0:8055/items/project_charter_templates?fields=*,*.*.*.*.*");
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="p-4">
            {data?.map((item, index) => (
              <div key={index}>
                {item.template_section_id.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h2>{section.name}</h2>
                    <Row>
                      {section.section_field_id.map((field, fieldIndex) => (
                        <Col md={field.size === 1 ? 6 : 12} key={fieldIndex}>
                          <Form.Group>
                            <Form.Label>{field.name}</Form.Label>
                            {field.field_type === "text" && <Form.Control type="text" placeholder={`Enter ${field.name}`} />}
                            {field.field_type === "date" && <Form.Control type="date" />}
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectChartTemplate;

