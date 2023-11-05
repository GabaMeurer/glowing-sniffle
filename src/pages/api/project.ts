  export interface Project {
    id: number;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    name: string;
    description: string | null;
    project_start_date: string;
    project_end_date: string;
    project_status: string;
  }
  