import {useState} from 'react'
import './index.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        name: inputValue,
        status: 'pending',
      }
      setTasks([...tasks, newTask])
      setInputValue('')
    }
  }

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, status: newStatus} : task,
    )
    setTasks(updatedTasks)
  }

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
  }

  return (
    <div className="todo-container">
      <h1>Task List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter task..."
        />
        <button type="button" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="tasks-container">
        <div className="task-header">
          <div>Serial Number</div>
          <div>Task Name</div>
          <div>Status</div>
          <div>Delete</div>
        </div>
        {tasks.map((task, index) => (
          <div key={task.id} className={`task ${task.status}`}>
            <div>{index + 1}</div>
            <div>{task.name}</div>
            <div>
              <select
                value={task.status}
                onChange={e => handleStatusChange(task.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            <div
              className="delete"
              onClick={() => deleteTask(task.id)}
              tabIndex={0}
              role="button"
            >
              &#x2715;
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
