'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircle, Circle, Plus, Trash2, Edit2, Sun, Moon, Calendar, Tag, Flag, X, AlertCircle, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  
  // Application state
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardDetailsId, setCardDetailsId] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    tasks: [],
    labels: []
  });
  const [newTask, setNewTask] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [columns, setColumns] = useState([]);
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editingBoardTitle, setEditingBoardTitle] = useState('');
  
  const priorityOptions = [
    { value: 'low', label: 'Low', icon: <ArrowDown className="text-blue-500" size={16} /> },
    { value: 'medium', label: 'Medium', icon: <AlertCircle className="text-yellow-500" size={16} /> },
    { value: 'high', label: 'High', icon: <ArrowUp className="text-red-500" size={16} /> }
  ];

  const labelColors = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'yellow', class: 'bg-yellow-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'pink', class: 'bg-pink-500' },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedBoards = localStorage.getItem('kanbanBoards');
    const storedActiveBoard = localStorage.getItem('kanbanActiveBoard');
    const storedTheme = localStorage.getItem('kanbanTheme');
    
    if (storedBoards) {
      try {
        const parsedBoards = JSON.parse(storedBoards);
        setBoards(Array.isArray(parsedBoards) ? parsedBoards : []);
      } catch {
        setBoards([]);
      }
    } else {
      setBoards([]);
    }
    
    if (storedActiveBoard) setActiveBoard(JSON.parse(storedActiveBoard));
    if (storedTheme === 'dark') setDarkMode(true);
    
    // Initialize with a default board if none exists
    if (!storedBoards && boards.length === 0) {
      const defaultBoard = {
        id: generateId(),
        title: 'My First Board',
        columns: [
          {
            id: generateId(),
            title: 'To Do',
            cards: []
          },
          {
            id: generateId(),
            title: 'In Progress',
            cards: []
          },
          {
            id: generateId(),
            title: 'Done',
            cards: []
          }
        ]
      };
      setBoards([defaultBoard]);
      setActiveBoard(defaultBoard);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem('kanbanBoards', JSON.stringify(boards));
    }
    if (activeBoard) {
      localStorage.setItem('kanbanActiveBoard', JSON.stringify(activeBoard));
      // Update columns based on active board
      const currentBoard = boards.find(board => board.id === activeBoard.id);
      if (currentBoard) {
        setColumns(currentBoard.columns);
      }
    }
  }, [boards, activeBoard]);

  // Update theme in localStorage and apply body class
  useEffect(() => {
    localStorage.setItem('kanbanTheme', darkMode ? 'dark' : 'light');
    
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // DnD sensors configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  // Board operations
  function createNewBoard() {
    if (!newBoardTitle.trim()) return;
    
    const newBoard = {
      id: generateId(),
      title: newBoardTitle,
      columns: [
        {
          id: generateId(),
          title: 'To Do',
          cards: []
        },
        {
          id: generateId(),
          title: 'In Progress',
          cards: []
        },
        {
          id: generateId(),
          title: 'Done',
          cards: []
        }
      ]
    };
    
    setBoards([...boards, newBoard]);
    setActiveBoard(newBoard);
    setNewBoardTitle('');
  }

  function deleteBoard(boardId) {
    const updatedBoards = boards.filter(board => board.id !== boardId);
    setBoards(updatedBoards);
    
    if (activeBoard && activeBoard.id === boardId) {
      setActiveBoard(updatedBoards.length > 0 ? updatedBoards[0] : null);
    }
  }

  function startEditingBoard(board) {
    setEditingBoardId(board.id);
    setEditingBoardTitle(board.title);
  }

  function saveEditedBoard() {
    if (!editingBoardTitle.trim()) return;
    
    const updatedBoards = boards.map(board => 
      board.id === editingBoardId 
        ? { ...board, title: editingBoardTitle } 
        : board
    );
    
    setBoards(updatedBoards);
    
    if (activeBoard && activeBoard.id === editingBoardId) {
      setActiveBoard({ ...activeBoard, title: editingBoardTitle });
    }
    
    setEditingBoardId(null);
    setEditingBoardTitle('');
  }

  // Column operations
  function addColumn() {
    if (!newColumnTitle.trim() || !activeBoard) return;
    
    const newColumn = {
      id: generateId(),
      title: newColumnTitle,
      cards: []
    };
    
    const updatedBoard = {
      ...activeBoard,
      columns: [...activeBoard.columns, newColumn]
    };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
    setNewColumnTitle('');
  }

  function deleteColumn(columnId) {
    if (!activeBoard) return;
    
    const updatedColumns = activeBoard.columns.filter(column => column.id !== columnId);
    const updatedBoard = { ...activeBoard, columns: updatedColumns };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
  }

  function startEditingColumn(column) {
    setEditingColumnId(column.id);
    setEditingColumnTitle(column.title);
  }

  function saveEditedColumn() {
    if (!editingColumnTitle.trim() || !activeBoard) return;
    
    const updatedColumns = activeBoard.columns.map(column => 
      column.id === editingColumnId 
        ? { ...column, title: editingColumnTitle } 
        : column
    );
    
    const updatedBoard = { ...activeBoard, columns: updatedColumns };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
    setEditingColumnId(null);
    setEditingColumnTitle('');
  }

  // Card operations
  function addCard(columnId) {
    if (!activeBoard) return;
    
    const newCard = {
      id: generateId(),
      title: 'New Card',
      description: '',
      dueDate: '',
      priority: 'medium',
      tasks: [],
      labels: []
    };
    
    const updatedColumns = activeBoard.columns.map(column => 
      column.id === columnId 
        ? { ...column, cards: [...column.cards, newCard] } 
        : column
    );
    
    const updatedBoard = { ...activeBoard, columns: updatedColumns };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
    setEditingCardId(newCard.id);
    setCardFormData(newCard);
  }

  function startEditingCard(card) {
    setEditingCardId(card.id);
    setCardFormData({ ...card });
  }

  function saveEditedCard() {
    if (!activeBoard) return;
    
    const updatedColumns = activeBoard.columns.map(column => ({
      ...column,
      cards: column.cards.map(card => 
        card.id === editingCardId ? { ...cardFormData } : card
      )
    }));
    
    const updatedBoard = { ...activeBoard, columns: updatedColumns };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
    setEditingCardId(null);
    setCardFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      tasks: [],
      labels: []
    });
  }

  function deleteCard(cardId) {
    if (!activeBoard) return;
    
    const updatedColumns = activeBoard.columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => card.id !== cardId)
    }));
    
    const updatedBoard = { ...activeBoard, columns: updatedColumns };
    
    const updatedBoards = boards.map(board => 
      board.id === activeBoard.id ? updatedBoard : board
    );
    
    setBoards(updatedBoards);
    setActiveBoard(updatedBoard);
    setCardDetailsId(null);
  }

  function addTask() {
    if (!newTask.trim()) return;
    
    setCardFormData({
      ...cardFormData,
      tasks: [...cardFormData.tasks, { id: generateId(), text: newTask, completed: false }]
    });
    
    setNewTask('');
  }

  function toggleTaskCompletion(taskId) {
    setCardFormData({
      ...cardFormData,
      tasks: cardFormData.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  }

  function deleteTask(taskId) {
    setCardFormData({
      ...cardFormData,
      tasks: cardFormData.tasks.filter(task => task.id !== taskId)
    });
  }

  function addLabel() {
    if (!newLabel.trim()) return;
    
    const labelColor = labelColors[Math.floor(Math.random() * labelColors.length)].name;
    
    setCardFormData({
      ...cardFormData,
      labels: [...cardFormData.labels, { id: generateId(), text: newLabel, color: labelColor }]
    });
    
    setNewLabel('');
  }

  function deleteLabel(labelId) {
    setCardFormData({
      ...cardFormData,
      labels: cardFormData.labels.filter(label => label.id !== labelId)
    });
  }

  // Drag and Drop handlers
  function handleDragStart(event) {
    if (event.active.data.current?.type === 'card') {
      setActiveCard(event.active.data.current.card);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (!over) return;
    
    // Handling column reordering
    if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
      const oldIndex = activeBoard.columns.findIndex(column => column.id === active.id);
      const newIndex = activeBoard.columns.findIndex(column => column.id === over.id);
      
      if (oldIndex !== newIndex) {
        const updatedColumns = arrayMove(activeBoard.columns, oldIndex, newIndex);
        const updatedBoard = { ...activeBoard, columns: updatedColumns };
        
        const updatedBoards = boards.map(board => 
          board.id === activeBoard.id ? updatedBoard : board
        );
        
        setBoards(updatedBoards);
        setActiveBoard(updatedBoard);
      }
    }
    
    // Handling card reordering or moving to different column
    if (active.data.current?.type === 'card' && over.data.current?.type === 'card') {
      const sourceColumnId = active.data.current.columnId;
      const destinationColumnId = over.data.current.columnId;
      
      const sourceColumn = activeBoard.columns.find(column => column.id === sourceColumnId);
      const destinationColumn = activeBoard.columns.find(column => column.id === destinationColumnId);
      
      if (!sourceColumn || !destinationColumn) return;
      
      // Remove card from source column
      const cardToMove = sourceColumn.cards.find(card => card.id === active.id);
      const sourceColumnCards = sourceColumn.cards.filter(card => card.id !== active.id);
      
      // Add card to destination column
      const overCardIndex = destinationColumn.cards.findIndex(card => card.id === over.id);
      let destinationColumnCards = [...destinationColumn.cards];
      
      if (sourceColumnId === destinationColumnId) {
        // Same column, reorder cards
        const oldIndex = sourceColumn.cards.findIndex(card => card.id === active.id);
        const newIndex = overCardIndex;
        destinationColumnCards = arrayMove(sourceColumn.cards, oldIndex, newIndex);
      } else {
        // Different column, insert card at proper position
        destinationColumnCards.splice(overCardIndex + 1, 0, cardToMove);
      }
      
      const updatedColumns = activeBoard.columns.map(column => {
        if (column.id === sourceColumnId) {
          return { ...column, cards: sourceColumnCards };
        }
        if (column.id === destinationColumnId) {
          return { ...column, cards: destinationColumnCards };
        }
        return column;
      });
      
      const updatedBoard = { ...activeBoard, columns: updatedColumns };
      
      const updatedBoards = boards.map(board => 
        board.id === activeBoard.id ? updatedBoard : board
      );
      
      setBoards(updatedBoards);
      setActiveBoard(updatedBoard);
    }
    
    // Handle dropping card onto a column (not another card)
    if (active.data.current?.type === 'card' && over.data.current?.type === 'column') {
      const sourceColumnId = active.data.current.columnId;
      const destinationColumnId = over.id;
      
      if (sourceColumnId === destinationColumnId) return;
      
      const sourceColumn = activeBoard.columns.find(column => column.id === sourceColumnId);
      const destinationColumn = activeBoard.columns.find(column => column.id === destinationColumnId);
      
      if (!sourceColumn || !destinationColumn) return;
      
      // Remove card from source column
      const cardToMove = sourceColumn.cards.find(card => card.id === active.id);
      const sourceColumnCards = sourceColumn.cards.filter(card => card.id !== active.id);
      
      // Add card to destination column at the end
      const destinationColumnCards = [...destinationColumn.cards, cardToMove];
      
      const updatedColumns = activeBoard.columns.map(column => {
        if (column.id === sourceColumnId) {
          return { ...column, cards: sourceColumnCards };
        }
        if (column.id === destinationColumnId) {
          return { ...column, cards: destinationColumnCards };
        }
        return column;
      });
      
      const updatedBoard = { ...activeBoard, columns: updatedColumns };
      
      const updatedBoards = boards.map(board => 
        board.id === activeBoard.id ? updatedBoard : board
      );
      
      setBoards(updatedBoards);
      setActiveBoard(updatedBoard);
    }
    
    setActiveCard(null);
  }

  // Component for draggable card
  function SortableCard({ card, columnId }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ 
      id: card.id,
      data: {
        type: 'card',
        card,
        columnId,
      }
    });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    
    const completedTasks = card.tasks ? card.tasks.filter(task => task.completed).length : 0;
    const totalTasks = card.tasks ? card.tasks.length : 0;
    
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`p-3 mb-2 rounded shadow-sm ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} cursor-pointer`}
        onClick={() => setCardDetailsId(card.id)}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-start justify-between">
          <div className="font-medium mb-1">{card.title}</div>
          <div className="flex gap-1">
            {card.priority === 'high' && (
              <span className="text-red-500"><ArrowUp size={14} /></span>
            )}
            {card.priority === 'low' && (
              <span className="text-blue-500"><ArrowDown size={14} /></span>
            )}
          </div>
        </div>
        
        {card.labels && card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.slice(0, 3).map(label => (
              <div 
                key={label.id} 
                className={`px-2 py-0.5 text-xs rounded-full text-white ${label.color === 'red' ? 'bg-red-500' : 
                                                              label.color === 'blue' ? 'bg-blue-500' : 
                                                              label.color === 'green' ? 'bg-green-500' : 
                                                              label.color === 'yellow' ? 'bg-yellow-500' : 
                                                              label.color === 'purple' ? 'bg-purple-500' : 
                                                              'bg-pink-500'}`}
              >
                {label.text}
              </div>
            ))}
            {card.labels.length > 3 && (
              <div className={`px-2 py-0.5 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                +{card.labels.length - 3}
              </div>
            )}
          </div>
        )}
        
        {card.dueDate && (
          <div className={`flex items-center text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Calendar size={12} className="mr-1" />
            {new Date(card.dueDate).toLocaleDateString()}
          </div>
        )}
        
        {totalTasks > 0 && (
          <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="mr-1">
              {completedTasks}/{totalTasks}
            </div>
            <div className="w-16 h-1 rounded-full bg-gray-300 overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Component for draggable column
  function SortableColumn({ column }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ 
      id: column.id,
      data: {
        type: 'column',
      }
    });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`w-72 shrink-0 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-3`}
      >
        <div className="flex items-center justify-between mb-3 group">
          {editingColumnId === column.id ? (
            <input
              type="text"
              className={`w-full p-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              value={editingColumnTitle}
              onChange={(e) => setEditingColumnTitle(e.target.value)}
              onBlur={saveEditedColumn}
              onKeyDown={(e) => e.key === 'Enter' && saveEditedColumn()}
              autoFocus
            />
          ) : (
            <>
              <h3 
                className="font-semibold cursor-grab"
                {...attributes}
                {...listeners}
              >
                {column.title}
              </h3>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => startEditingColumn(column)}
                  className={`p-1 rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteColumn(column.id)}
                  className={`p-1 rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="column-cards min-h-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={column.cards.map(card => card.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.cards.map(card => (
                <SortableCard 
                  key={card.id} 
                  card={card} 
                  columnId={column.id} 
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        
        <button
          onClick={() => addCard(column.id)}
          className={`w-full mt-2 p-2 rounded flex items-center justify-center ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-white hover:bg-gray-50 text-gray-600'
          }`}
        >
          <Plus size={16} className="mr-1" />
          Add Card
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <header className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">KanbanLite</h1>
            
            {activeBoard && (
              <div className="ml-4">
                {editingBoardId === activeBoard.id ? (
                  <input
                    type="text"
                    className={`p-1 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    value={editingBoardTitle}
                    onChange={(e) => setEditingBoardTitle(e.target.value)}
                    onBlur={saveEditedBoard}
                    onKeyDown={(e) => e.key === 'Enter' && saveEditedBoard()}
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium">{activeBoard.title}</h2>
                    <button 
                      onClick={() => startEditingBoard(activeBoard)}
                      className={`ml-2 p-1 rounded ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className={`px-3 py-2 rounded flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}>
                {activeBoard ? activeBoard.title : 'Select a board'} <ChevronDown size={16} className="ml-2" />
              </button>
              
              <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`py-1 ${darkMode ? 'border border-gray-700' : 'border border-gray-200'} rounded-md`}>
                  {boards.map(board => (
                    <div key={board.id} className="flex items-center justify-between">
                      <button
                        className={`block px-4 py-2 text-left w-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${activeBoard && activeBoard.id === board.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                        onClick={() => setActiveBoard(board)}
                      >
                        {board.title}
                      </button>
                      <button
                        onClick={() => deleteBoard(board.id)}
                        className={`px-2 mr-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} rounded`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  
                  <div className={`px-4 py-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className={`p-1 mr-2 rounded flex-1 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                        placeholder="Board name"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && createNewBoard()}
                      />
                      <button
                        onClick={createNewBoard}
                        className={`p-1 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        {activeBoard ? (
          <>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="text"
                    className={`p-2 rounded border mr-4 w-64 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    placeholder="Add new column..."
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addColumn()}
                  />
                  <button
                    onClick={addColumn}
                    className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white flex items-center`}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Column
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto py-2">
              <div className="flex gap-4 min-h-[calc(100vh-200px)]">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={activeBoard.columns.map(column => column.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {activeBoard.columns.map(column => (
                      <SortableColumn key={column.id} column={column} />
                    ))}
                  </SortableContext>
                  
                  <DragOverlay>
                    {activeCard && (
                      <div className={`p-3 mb-2 rounded shadow-lg w-72 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="font-medium">{activeCard.title}</div>
                      </div>
                    )}
                  </DragOverlay>
                </DndContext>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-xl mb-4">No board selected. Please create a new board to get started.</p>
            <div className="flex items-center">
              <input
                type="text"
                className={`p-2 rounded border mr-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                placeholder="Board name"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createNewBoard()}
              />
              <button
                onClick={createNewBoard}
                className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white flex items-center`}
              >
                <Plus size={16} className="mr-1" />
                Create Board
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Card Details Modal */}
      {cardDetailsId && activeBoard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-lg rounded-lg shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            {activeBoard.columns.map(column => 
              column.cards.filter(card => card.id === cardDetailsId).map(card => (
                <div key={card.id}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Card Details</h2>
                    <button 
                      onClick={() => setCardDetailsId(null)}
                      className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  {editingCardId === card.id ? (
                    <div>
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                        <input
                          type="text"
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                          value={cardFormData.title}
                          onChange={(e) => setCardFormData({...cardFormData, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                        <textarea
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                          rows="3"
                          value={cardFormData.description}
                          onChange={(e) => setCardFormData({...cardFormData, description: e.target.value})}
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Due Date</label>
                        <input
                          type="date"
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                          value={cardFormData.dueDate}
                          onChange={(e) => setCardFormData({...cardFormData, dueDate: e.target.value})}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
                        <div className="flex space-x-2">
                          {priorityOptions.map(option => (
                            <button
                              key={option.value}
                              className={`px-3 py-1 rounded flex items-center ${
                                cardFormData.priority === option.value
                                  ? `${darkMode ? 'bg-gray-700' : 'bg-gray-200'} font-medium`
                                  : `${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`
                              }`}
                              onClick={() => setCardFormData({...cardFormData, priority: option.value})}
                            >
                              {option.icon}
                              <span className="ml-1">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tasks</label>
                        <div className="mb-2">
                          {cardFormData.tasks.map(task => (
                            <div key={task.id} className="flex items-center mb-2">
                              <button
                                className="mr-2"
                                onClick={() => toggleTaskCompletion(task.id)}
                              >
                                {task.completed ? (
                                  <CheckCircle size={18} className="text-green-500" />
                                ) : (
                                  <Circle size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                                )}
                              </button>
                              <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            className={`flex-1 p-2 rounded-l border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                            placeholder="Add a task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                          />
                          <button
                            onClick={addTask}
                            className={`px-3 py-2 rounded-r ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Labels</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {cardFormData.labels.map(label => (
                            <div 
                              key={label.id} 
                              className={`px-2 py-1 rounded-full flex items-center text-white ${
                                label.color === 'red' ? 'bg-red-500' : 
                                label.color === 'blue' ? 'bg-blue-500' : 
                                label.color === 'green' ? 'bg-green-500' : 
                                label.color === 'yellow' ? 'bg-yellow-500' : 
                                label.color === 'purple' ? 'bg-purple-500' : 
                                'bg-pink-500'
                              }`}
                            >
                              <span>{label.text}</span>
                              <button
                                onClick={() => deleteLabel(label.id)}
                                className="ml-1 hover:text-gray-200"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            className={`flex-1 p-2 rounded-l border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                            placeholder="Add a label..."
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addLabel()}
                          />
                          <button
                            onClick={addLabel}
                            className={`px-3 py-2 rounded-r ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                          >
                            <Tag size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingCardId(null)}
                          className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEditedCard}
                          className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                      
                      {card.description && (
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {card.description}
                        </p>
                      )}
                      
                      {card.dueDate && (
                        <div className={`flex items-center mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Calendar size={16} className="mr-2" />
                          <span>Due {new Date(card.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {card.priority && (
                        <div className={`flex items-center mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Flag size={16} className="mr-2" />
                          <span className="capitalize">
                            {card.priority} Priority
                            {card.priority === 'high' && (
                              <ArrowUp size={16} className="inline ml-1 text-red-500" />
                            )}
                            {card.priority === 'medium' && (
                              <AlertCircle size={16} className="inline ml-1 text-yellow-500" />
                            )}
                            {card.priority === 'low' && (
                              <ArrowDown size={16} className="inline ml-1 text-blue-500" />
                            )}
                          </span>
                        </div>
                      )}
                      
                      {card.tasks && card.tasks.length > 0 && (
                        <div className="mb-4">
                          <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tasks</h4>
                          {card.tasks.map(task => (
                            <div key={task.id} className="flex items-center mb-2">
                              {task.completed ? (
                                <CheckCircle size={18} className="mr-2 text-green-500" />
                              ) : (
                                <Circle size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              )}
                              <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {card.labels && card.labels.length > 0 && (
                        <div className="mb-4">
                          <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Labels</h4>
                          <div className="flex flex-wrap gap-2">
                            {card.labels.map(label => (
                              <div 
                                key={label.id} 
                                className={`px-2 py-1 rounded-full text-white ${
                                  label.color === 'red' ? 'bg-red-500' : 
                                  label.color === 'blue' ? 'bg-blue-500' : 
                                  label.color === 'green' ? 'bg-green-500' : 
                                  label.color === 'yellow' ? 'bg-yellow-500' : 
                                  label.color === 'purple' ? 'bg-purple-500' : 
                                  'bg-pink-500'
                                }`}
                              >
                                {label.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => deleteCard(card.id)}
                          className={`px-4 py-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-500 hover:bg-red-400'} text-white`}
                        >
                          <Trash2 size={16} className="mr-1 inline" />
                          Delete
                        </button>
                        <button
                          onClick={() => startEditingCard(card)}
                          className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                        >
                          <Edit2 size={16} className="mr-1 inline" />
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}