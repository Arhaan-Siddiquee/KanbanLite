"use client";
import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates, 
  rectSortingStrategy, 
  SortableContext 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function KanbanBoard() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Board states
  const [boards, setBoards] = useState({
    todo: [],
    pending: [],
    completed: []
  });

  // Goals state
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  // Highlights state
  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState('');

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Profile dropdown state
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('todo');

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBoards = localStorage.getItem('kanbanBoards');
    const savedTheme = localStorage.getItem('kanbanTheme');
    const savedGoals = localStorage.getItem('kanbanGoals');
    const savedHighlights = localStorage.getItem('kanbanHighlights');
    
    if (savedBoards) setBoards(JSON.parse(savedBoards));
    if (savedTheme) setIsDarkMode(JSON.parse(savedTheme));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('kanbanBoards', JSON.stringify(boards));
    localStorage.setItem('kanbanTheme', JSON.stringify(isDarkMode));
    localStorage.setItem('kanbanGoals', JSON.stringify(goals));
    localStorage.setItem('kanbanHighlights', JSON.stringify(highlights));
  }, [boards, isDarkMode, goals, highlights]);

  // Drag end handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeColumn = Object.keys(boards).find(
      column => boards[column].some(item => item.id === active.id)
    );
    const targetColumn = Object.keys(boards).find(
      column => column === over.id || 
      boards[column].some(item => item.id === over.id)
    );

    if (activeColumn !== targetColumn) {
      setBoards(prevBoards => {
        const newBoards = { ...prevBoards };
        
        const movingItem = newBoards[activeColumn].find(
          item => item.id === active.id
        );
        
        newBoards[activeColumn] = newBoards[activeColumn].filter(
          item => item.id !== active.id
        );
        
        if (targetColumn) {
          newBoards[targetColumn] = [
            ...newBoards[targetColumn], 
            { ...movingItem, column: targetColumn }
          ];
        }
        
        return newBoards;
      });
    }
  };

  // Add new task
  const addTask = (title, description, column) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      column,
      createdAt: new Date().toISOString()
    };

    setBoards(prevBoards => ({
      ...prevBoards,
      [column]: [...prevBoards[column], newTask]
    }));
  };

  // Delete task
  const deleteTask = (taskId, column) => {
    setBoards(prevBoards => ({
      ...prevBoards,
      [column]: prevBoards[column].filter(task => task.id !== taskId)
    }));
  };

  // Add goal
  const addGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: uuidv4(),
        text: newGoal,
        createdAt: new Date().toISOString()
      };
      setGoals([...goals, goal]);
      setNewGoal('');
    }
  };

  // Delete goal
  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // Add highlight
  const addHighlight = () => {
    if (newHighlight.trim()) {
      const highlight = {
        id: uuidv4(),
        text: newHighlight,
        createdAt: new Date().toISOString()
      };
      setHighlights([...highlights, highlight]);
      setNewHighlight('');
    }
  };

  // Delete highlight
  const deleteHighlight = (highlightId) => {
    setHighlights(highlights.filter(highlight => highlight.id !== highlightId));
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      className={`
        min-h-screen p-6 transition-colors duration-300 
        ${isDarkMode 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-100 text-gray-900'
        }
      `}
    >
      {/* Header with Theme Toggle and Profile */}
      <header className="flex justify-between items-center mb-6">
        <h1 
          className={`
            text-3xl font-bold 
            ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
          `}
        >
          Kanban Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className={`
              p-2 rounded-full transition-colors 
              ${isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'
              }
            `}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className={`
                p-2 rounded-full 
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              👤
            </button>
            {isProfileDropdownOpen && (
              <div 
                className={`
                  absolute right-0 mt-2 w-48 rounded-lg shadow-lg 
                  ${isDarkMode 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-900'
                  }
                `}
              >
                <div className="p-4">
                  <p>User Profile</p>
                  <p>Email: user@example.com</p>
                  <button 
                    className={`
                      mt-2 w-full py-1 rounded 
                      ${isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                      }
                    `}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Calendar Section */}
          <div 
            className={`
              p-4 rounded-lg shadow-md 
              ${isDarkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
              }
            `}
          >
            <h2 
              className={`
                text-xl font-semibold mb-4 
                ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
              `}
            >
              Calendar
            </h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              className={`
                w-full 
                ${isDarkMode 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-900'
                }
              `}
            />
          </div>

          {/* Goals Section */}
          <div 
            className={`
              p-4 rounded-lg shadow-md 
              ${isDarkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
              }
            `}
          >
            <h2 
              className={`
                text-xl font-semibold mb-4 
                ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
              `}
            >
              Goals
            </h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal"
                className={`
                  flex-grow p-2 rounded-l-md 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                  }
                `}
              />
              <button
                onClick={addGoal}
                className={`
                  p-2 rounded-r-md 
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-500' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white
                `}
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className={`
                    flex justify-between items-center p-2 rounded 
                    ${isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>{goal.text}</span>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className={`
                      text-red-500 hover:text-red-700 
                      ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
                      p-1 rounded
                    `}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          <div 
            className={`
              p-4 rounded-lg shadow-md 
              ${isDarkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
              }
            `}
          >
            <h2 
              className={`
                text-xl font-semibold mb-4 
                ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
              `}
            >
              Highlights
            </h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add a new highlight"
                className={`
                  flex-grow p-2 rounded-l-md 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                  }
                `}
              />
              <button
                onClick={addHighlight}
                className={`
                  p-2 rounded-r-md 
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-500' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white
                `}
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {highlights.map((highlight) => (
                <div 
                  key={highlight.id} 
                  className={`
                    flex justify-between items-center p-2 rounded 
                    ${isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>{highlight.text}</span>
                  <button 
                    onClick={() => deleteHighlight(highlight.id)}
                    className={`
                      text-red-500 hover:text-red-700 
                      ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
                      p-1 rounded
                    `}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="md:col-span-2">
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(boards).map(([columnName, tasks]) => (
                <SortableContext 
                  key={columnName} 
                  items={tasks.map(task => task.id)}
                  strategy={rectSortingStrategy}
                >
                  <div 
                    className={`
                      rounded-lg p-4 shadow-md 
                      ${isDarkMode 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-900'
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-900'
                      }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 
                        className={`
                          text-xl font-semibold capitalize 
                          ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
                        `}
                      >
                        {columnName}
                      </h2>
                      <button
                        onClick={() => {
                          setCurrentColumn(columnName);
                          setIsAddModalOpen(true);
                        }}
                        className={`
                          p-1 rounded 
                          ${isDarkMode 
                            ? 'bg-blue-600 hover:bg-blue-500' 
                            : 'bg-blue-500 hover:bg-blue-600'
                          } text-white
                        `}
                      >
                        +
                      </button>
                    </div>
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className={`
                            p-4 rounded-lg shadow-sm 
                            ${isDarkMode 
                              ? 'bg-gray-700 hover:bg-gray-600' 
                              : 'bg-gray-100 hover:bg-gray-200'
                            }
                          `}
                        >
                          <h3 className="font-semibold mb-2">{task.title}</h3>
                          <p className="text-sm mb-2">{task.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs opacity-70">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                            <button 
                              onClick={() => deleteTask(task.id, columnName)}
                              className={`
                                text-red-500 hover:text-red-700 
                                ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
                                p-1 rounded
                              `}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SortableContext>
              ))}
            </div>
          </DndContext>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div 
          className={`
            fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 
            ${isDarkMode ? 'bg-opacity-70' : 'bg-opacity-30'}
          `}
        >
          <div 
            className={`
              p-6 rounded-lg w-96 
              ${isDarkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
              }
            `}
          >
            <h2 
              className={`
                text-xl font-semibold mb-4 
                ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}
              `}
            >
              Add New Task
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const title = e.target.title.value;
              const description = e.target.description.value;
              addTask(title, description, currentColumn);
              setIsAddModalOpen(false);
            }}>
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                required
                className={`
                  w-full p-2 mb-4 rounded 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                  }
                `}
              />
              <textarea
                name="description"
                placeholder="Task Description"
                className={`
                  w-full p-2 mb-4 rounded h-24 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                  }
                `}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className={`
                    py-2 px-4 rounded 
                    ${isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                    }
                  `}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`
                    py-2 px-4 rounded 
                    ${isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-blue-500 hover:bg-blue-600'
                    } text-white
                  `}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}