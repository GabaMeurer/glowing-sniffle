import React, { useState, useEffect } from 'react';
import CustomCard from '@component/components/CustomCard';
import { Process } from './api/pmbok_process';



const Initializing = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    // Fetch data from the API
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

export default Initializing;

