import React, { useState, useEffect } from 'react';
import { Plus, Minus, Arrow } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', progress: 50, deadline: '2023-03-01' },
    { id: 2, name: 'Task 2', progress: 30, deadline: '2023-03-15' },
    { id: 3, name: 'Task 3', progress: 80, deadline: '2023-04-01' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', contribution: 20 },
    { id: 2, name: 'Jane Doe', contribution: 30 },
    { id: 3, name: 'Bob Smith', contribution: 50 },
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState(teamMembers);

  const [dateFilter, setDateFilter] = useState('');
  const [milestoneFilter, setMilestoneFilter] = useState('');

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      if (dateFilter && task.deadline !== dateFilter) return false;
      if (milestoneFilter && task.name !== milestoneFilter) return false;
      return true;
    });
    setFilteredTasks(filteredTasks);
  }, [dateFilter, milestoneFilter, tasks]);

  useEffect(() => {
    const filteredTeamMembers = teamMembers.filter((member) => {
      if (milestoneFilter && member.name !== milestoneFilter) return false;
      return true;
    });
    setFilteredTeamMembers(filteredTeamMembers);
  }, [milestoneFilter, teamMembers]);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      progress: 0,
      deadline: '2023-01-01',
    };
    setTasks([...tasks, newTask]);
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: teamMembers.length + 1,
      name: `Member ${teamMembers.length + 1}`,
      contribution: 0,
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleMilestoneFilterChange = (event) => {
    setMilestoneFilter(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Project Management Tool</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTeamMember}
        >
          Add Team Member
        </button>
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="bg-gray-200 p-2 rounded"
        />
        <input
          type="text"
          value={milestoneFilter}
          onChange={handleMilestoneFilterChange}
          className="bg-gray-200 p-2 rounded"
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id} className="mb-2">
                <div className="flex justify-between">
                  <span>{task.name}</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline: {task.deadline}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <ul>
            {filteredTeamMembers.map((member) => (
              <li key={member.id} className="mb-2">
                <div className="flex justify-between">
                  <span>{member.name}</span>
                  <span>{member.contribution}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
