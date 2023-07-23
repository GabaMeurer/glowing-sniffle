import { GetServerSideProps } from 'next';
import { Project } from '@component/pages/api/project';
import ProjectListTable from '../components/ProjectListTable';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="container">
      <h1>Project List</h1>
      <ProjectListTable projects={projects} />
    </div>
  );
};

export default ProjectList;

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://0.0.0.0:8055/items/projects');
    const data = await res.json();
  
    console.log(data); // Log the data to check its structure
  
    const projects: Project[] = data.data || []; // If data.data is undefined, default to an empty array
  
    return {
      props: { projects },
    }
  }
  