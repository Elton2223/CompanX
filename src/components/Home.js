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
  const [newTask, setNewTask] = useState({
    task_ref: "",
    short_desc: "",
    category: "Project",
    assignee: "",
    time_spent: 0,
    status: "unassigned",
    due_date: "",
  });

/*
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/list-tasks", {
        method: "POST",
        body: JSON.stringify({
          status: statusFilter,
          category: categoryFilter,
          assignee: assigneeFilter,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, assigneeFilter]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 60000);
    const autoStopInterval = setInterval(async () => {
      await fetch("/api/auto-stop-timers", { method: "POST" });
      fetchTasks();
    }, 60000);
    return () => {
      clearInterval(interval);
      clearInterval(autoStopInterval);
    };
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/create-task", {
        method: "POST",
        body: JSON.stringify({ ...newTask, created_by: currentUser?.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      setSuccess("Task created successfully");
      setNewTask({
        task_ref: "",
        short_desc: "",
        category: "Project",
        assignee: "",
        time_spent: 0,
        status: "unassigned",
        due_date: "",
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleStartTimer = async (taskId) => {
    try {
      const response = await fetch("/api/start-task-timer", {
        method: "POST",
        body: JSON.stringify({ taskId, userId: currentUser?.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to start timer");
      }
      fetchTasks();
    } catch (err) {
      setError("Failed to start timer");
      console.error(err);
    }
  };
  const handleCloneTask = async (taskId) => {
    try {
      const response = await fetch("/api/clone-task", {
        method: "POST",
        body: JSON.stringify({ taskId, userId: currentUser?.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to clone task");
      }
      setSuccess("Task cloned successfully");
      fetchTasks();
    } catch (err) {
      setError("Failed to clone task");
      console.error(err);
    }
  };
  const handleAssignToMe = async (taskId) => {
    try {
      const response = await fetch("/api/update-task", {
        method: "POST",
        body: JSON.stringify({
          id: taskId,
          assignee: currentUser?.id,
          status: "in-progress",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to assign task");
      }
      setSuccess("Task assigned successfully");
      fetchTasks();
    } catch (err) {
      setError("Failed to assign task");
      console.error(err);
    }
  };
  const handleUpdateTask = async (task) => {
    if (task.assignee !== currentUser?.id) {
      setError("You can only edit your own tasks");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/update-task", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      setSuccess("Task updated successfully");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("/api/delete-task", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setSuccess("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  */

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1 className="title">Task Management System</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        {/**  onSubmit={handleCreateTask} */}
        <form     className="task-form">
          <div className="form-grid">
            <div>
              <input
                type="text"
                name="task_ref"
                placeholder="Task Reference (e.g. MD00133)"
                value={newTask.task_ref}
                onChange={(e) =>
                  setNewTask({ ...newTask, task_ref: e.target.value })
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
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
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
                value={newTask.short_desc}
                onChange={(e) =>
                  setNewTask({ ...newTask, short_desc: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div>
              <select
                name="assignee"
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
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
                value={newTask.time_spent}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
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
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
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
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
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
                    setEditingTask({ ...editingTask, task_ref: e.target.value })
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
                    setEditingTask({
                      ...editingTask,
                      short_desc: e.target.value,
                    })
                  }
                  className="form-input"
                  placeholder="Short Description"
                  required
                />
                <select
                  value={editingTask.category}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, category: e.target.value })
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
                    setEditingTask({ ...editingTask, assignee: e.target.value })
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
                      ...editingTask,
                      time_spent: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="form-input"
                  placeholder="Time Spent (minutes)"
                  min="0"
                />
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, status: e.target.value })
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
                    setEditingTask({ ...editingTask, due_date: e.target.value })
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