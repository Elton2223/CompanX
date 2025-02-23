import "./LandingPage.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  
  const [task_ref, setTaskref] = useState(null);
  const [short_desc, setShortdesc] = useState(null);
  const [category, setCategory] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [time_spent, setTimespent] = useState(null);
  const [status, setStatus] = useState(null);
  const [due_date, setDuedate] = useState(null);

  //create a task 
  const handleCreateTask = () =>{
    fetch("http://localhost:8000/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          task_ref, 
          short_desc, 
          category,
          assignee,
          time_spent, 
          status, 
          due_date 
        })
    })
    .then((res) => res.json())
    .then((data) => {

      if(data)
      {
        alert("Task Created");
      }
      
    })
  }


  //manipulate the cookie effects 
  const [cookies, removeCookie] = useCookies(["myToken"]);

  useEffect(() => {
    if (!cookies.myToken) {
      navigate("/"); // Redirect to login if no token is found
    }
  }, [cookies.myToken]);

  const handleLogout = () => {
    removeCookie("myToken");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/");
  }

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1 className="title">Task Management System</h1>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <form className="task-form" onSubmit={handleCreateTask}>
          <div className="form-grid">
            <div>
              <input
                type="text"
                name="task_ref"
                placeholder="Task Reference (e.g. MD00133)"
                value={task_ref}
                onChange={(e) =>
                  setTaskref(e.target.value )
                }
                className="form-input"
                required
                pattern="^[A-Z]{2}\d{5}$"
                title="Task reference must be 2 uppercase letters followed by 5 digits"
              />
            </div>
            <div>
              <select
                name="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="form-select"
                required
              >
                <option value="Project">Project</option>
                <option value="Maint/Support">Maint/Support</option>
                <option value="Admin">Admin</option>
                <option value="HBL">HBL</option>
              </select>
            </div>
            <div className="form-full-width">
              <input
                type="text"
                name="short_desc"
                placeholder="Short Description"
                value={short_desc}
                onChange={(e) =>
                  setShortdesc(e.target.value)
                }
                className="form-input"
                required
              />
            </div>
            <div>
              <select
                name="assignee"
                value={assignee}
                onChange={(e) =>
                  setAssignee(e.target.value)
                }
                className="form-select"
              >
                <option value="">Select Assignee</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                name="time_spent"
                placeholder="Time Spent (minutes)"
                value={time_spent}
                onChange={(e) =>
                  setTimespent({
                    time_spent: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className="form-input"
                min="0"
              />
            </div>
            <div>
              <select
                name="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="form-select"
                required
              >
                <option value="unassigned">Unassigned</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div>
              <input
                type="date"
                name="due_date"
                value={due_date}
                onChange={(e) =>
                  setDuedate(e.target.value)
                }
                className="form-input"
              />
            </div>
            <div className="form-full-width">
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </div>
        </form>

        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="unassigned">Unassigned</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Project">Project</option>
            <option value="Maint/Support">Maint/Support</option>
            <option value="Admin">Admin</option>
            <option value="HBL">HBL</option>
          </select>

          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Assignees</option>
            {assignees.map((assignee) => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {success && <div className="success-message">{success}</div>}

        {/* <div className="task-list">
          {loading && !tasks.length ? (
            <div className="loading">
              <i className="fas fa-spinner fa-spin loading-icon"></i>
            </div>
          ) : tasks.length === 0 ? (
            <div className="no-tasks">No tasks found</div>
          ) : (
             tasks.map((task) => (
               <TaskCard
                key={task.id}
                task={task}
                onEdit={
                  task.assignee === currentUser?.id ? setEditingTask : undefined
                }
                onDelete={
                  task.assignee === currentUser?.id
                  ? handleDeleteTask
                    : undefined
                }
                onStartTimer={handleStartTimer}
                onCloneTask={handleCloneTask}
                onAssignToMe={handleAssignToMe} 
                currentUser={currentUser}
              />
            ))
          )}
        </div>*/}

        {editingTask && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="modal-title">Edit Task</h2>
              <div className="modal-form">
                <input
                  type="text"
                  value={editingTask.task_ref}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-input"
                  placeholder="Task Reference"
                  pattern="^[A-Z]{2}\d{5}$"
                  title="Task reference must be 2 uppercase letters followed by 5 digits"
                  required
                />
                <input
                  type="text"
                  value={editingTask.short_desc}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-input"
                  placeholder="Short Description"
                  required
                />
                <select
                  value={editingTask.category}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-select"
                  required
                >
                  <option value="Project">Project</option>
                  <option value="Maint/Support">Maint/Support</option>
                  <option value="Admin">Admin</option>
                  <option value="HBL">HBL</option>
                </select>
                <select
                  value={editingTask.assignee}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-select"
                >
                  <option value="">Select Assignee</option>
                  {assignees.map((assignee) => (
                    <option key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={editingTask.time_spent}
                  onChange={(e) =>
                    setEditingTask({
                      time_spent: Math.max(0, parseInt(e.target.value) || 0)
                    })
                  }
                  className="form-input"
                  placeholder="Time Spent (minutes)"
                  min="0"
                />
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-select"
                  required
                >
                  <option value="unassigned">Unassigned</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
                <input
                  type="date"
                  value={editingTask.due_date?.split("T")[0]}
                  onChange={(e) =>
                    setEditingTask(e.target.value)
                  }
                  className="form-input"
                />
                <div className="modal-buttons">
                  <button
                    // onClick={() => handleUpdateTask(editingTask)}
                    disabled={loading}
                    className="modal-submit"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="modal-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;