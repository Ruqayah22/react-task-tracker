/// one 
// const tasks = [
//   {
//     id: 1,
//     text: "Doctors Appointment",
//     day: "Feb 5th at 2:30pm",
//     reminder: true,
//   },
//   {
//     id: 2,
//     text: "Meeting at School",
//     day: "Feb 6th at 1:30pm",
//     reminder: true,
//   },
//   {
//     id: 3,
//     text: "Food Shopping",
//     day: "Feb 5th at 2:30pm",
//     reminder: false,
//   }
// ];


// const Tasks = () => {
//   return (
//     <>
//       {tasks.map((task)=> (
//         <h3 key={task.id}>{task.text}</h3>
//       ))}
//     </>
//   )
// }

// export default Tasks

// two 
// import { useState } from "react";


// const Tasks = () => {
//   const [tasks, setTasks] = useState([
//   {
//     id: 1,
//     text: "Doctors Appointment",
//     day: "Feb 5th at 2:30pm",
//     reminder: true,
//   },
//   {
//     id: 2,
//     text: "Meeting at School",
//     day: "Feb 6th at 1:30pm",
//     reminder: true,
//   },
//   {
//     id: 3,
//     text: "Food Shopping",
//     day: "Feb 5th at 2:30pm",
//     reminder: false,
//   }
// ])

//   return (
//     <>
//       {tasks.map((task)=> (
//         <h3 key={task.id}>{task.text}</h3>
//       ))}
//     </>
//   )
// }

// export default Tasks

// three 
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;



// final code : 

// import Task from './Task'

// const Tasks = ({ tasks, onDelete, onToggle }) => {
//   return (
//     <>
//       {tasks.map((task, index) => (
//         <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
//       ))}
//     </>
//   )
// }

// export default Tasks
