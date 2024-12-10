import { useState, useEffect } from "react";

function TodoList() {
    const [text, setText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
      reloadList();
    }, []);
  
    const handleTextChange = (e: any) => {
      setText(e.target.value);
    };

    async function reloadList() {
      let response = await fetch('http://localhost:5050/tasks');

      if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          console.error(message);
          return;
      }

      let retrievedObjs = await response.json();
      setTasks(retrievedObjs);

      response = await fetch('http://localhost:5050/tasks/ttl');

      if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          console.error(message);
          return;
      }

      retrievedObjs = await response.json();
      setCompletedTasks(retrievedObjs);
    }
  
    async function handleSubmit(e: any) {
      e.preventDefault();

      const newTask = {
        task: text,
      };

      try {
          const response = await fetch("http://localhost:5050/tasks", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(newTask),
          });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('A problem occurred with your fetch operation: ', error);
      }

      setText('');
      reloadList();
    };

    async function handleDelete(id: string) {
      const response = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
          const message = `An error occurred while deleting: ${response.statusText}`;
          console.error(message);
          return;
      }

      reloadList();
    };

    async function handleUndoDelete(id: string) {
      const response = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
          const message = `An error occurred while updating: ${response.statusText}`;
          console.error(message);
          return;
      }

      reloadList();
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={handleTextChange}
            required
            placeholder="Enter task"
          />    
          <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add
            </button>
          </div>
        </form>

        <div>
          <h1 className="text-white text-sm">Todo List:</h1>
          <ul>
            {tasks.map((obj) => (
              <li key={obj['_id']} className="text-white text-sm">
                <input 
                  type="checkbox" 
                  onChange={(e) => handleDelete(obj['_id'])}
                />
                {obj['task']}
              </li>
            ))}
          </ul>
          <h1 className="text-white text-sm">Completed:</h1>
          <ul>
            {completedTasks.map((obj) => (
              <li key={obj['_id']} className="text-white text-sm">
                <input 
                  type="checkbox"
                  defaultChecked={true} 
                  onChange={(e) => handleUndoDelete(obj['_id'])}
                />
                {obj['task']}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default TodoList;