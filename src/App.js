// one
// import React from 'react'
// import Header from "./components/Header"
// import Tasks from './components/Tasks';

// const App = () => {
//   return (
//     <div className="container">
//       {/* <Header title="hello" /> */}
//       {/* <Header /> used default Props */}
//       <Header title="Tasks Tracker" />
//       <Tasks />
//     </div>
//   );
// }

// export default App

//two
// import React from "react";
// import Header from "./components/Header";
// import Tasks from "./components/Tasks";
// import { useState } from "react";
// import AddTask from "./components/AddTask";

// const App = () => {
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       text: "Doctors Appointment",
//       day: "Feb 5th at 2:30pm",
//       reminder: true,
//     },
//     {
//       id: 2,
//       text: "Meeting at School",
//       day: "Feb 6th at 1:30pm",
//       reminder: true,
//     },
//     {
//       id: 3,
//       text: "Food Shopping",
//       day: "Feb 5th at 2:30pm",
//       reminder: false,
//     },
//   ]);

//   // Delete Task
//   const deleteTask = (id) => {
//     // console.log("delete", id);
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   //Toggle Reminder
//   const toggleReminder = async (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, reminder: !task.reminder } : task
//       )
//     );
//   };

//     // Add Task
//     const addTask = async (task) => {
//           const id = Math.floor(Math.random() * 10000) + 1 // give us a random number 
//           const newTask = { id, ...task }
//           setTasks([...tasks, newTask])
//     };

//   return (
//     <div className="container">
//       <Header
//         title="Tasks Tracker"
//         onAdd={() => setShowAddTask(!showAddTask)}
//         showAdd={showAddTask}
//       />
//       {showAddTask && <AddTask onAdd={addTask} />}
//       {tasks.length > 0 ? (
//         <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
//       ) : (
//         "No Tasks To Show"
//       )}
//     </div>
//   );
// };

// export default App;

//final code :

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };

  // Toggle Reminder ans update task
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
