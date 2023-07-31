// pages/project-detail/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  // Add other properties as needed
}

const ProjectDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://0.0.0.0:8055/items/projects/${id}`)
        .then((response) => response.json())
        .then((data) => setProject(data.data));
    }
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      {/* Display other project details here */}
    </div>
  );
};

export default ProjectDetail;
