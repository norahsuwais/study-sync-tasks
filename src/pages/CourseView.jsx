
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function CourseView() {
  const { courseId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [filters, setFilters] = useState({
    assignee: "All",
    priority: "All",
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignee: "",
    priority: "",
    status: "incomplete",
  });

  useEffect(() => {
  if (!courseId) return;

  const q = query(
    collection(db, "tasks"),
    where("courseId", "==", courseId)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setTasks(docs);
  });

  return () => unsubscribe();
}, [courseId]);


  const filteredTasks = tasks
    .filter((task) => {
      if (filters.assignee !== "All" && task.assignee !== filters.assignee)
        return false;
      if (filters.priority !== "All" && task.priority !== filters.priority)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    await addDoc(collection(db, "tasks"), {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate || null,
      assignee: newTask.assignee || "",
      priority: newTask.priority || "Medium",
      status: newTask.status || "incomplete",
      courseId,
      createdAt: serverTimestamp(),
    });

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      assignee: "",
      priority: "",
      status: "incomplete",
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;

    const { id, ...data } = editingTask;
    await updateDoc(doc(db, "tasks", id), data);
    setEditingTask(null);
  };

  const handleStatusChange = async (task, newStatus) => {
    await updateDoc(doc(db, "tasks", task.id), { status: newStatus });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", backgroundColor: "#b3d1e4" , }}>
      <h1 className="site-title">Study Sync</h1>
      <h1>Course Tasks - {courseId}</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select
          value={filters.assignee}
          onChange={(e) =>
            setFilters({ ...filters, assignee: e.target.value })
          }
        >
          <option value="All">All Assignees</option>
          <option value="You">You</option>
          <option value="Friend">Friend</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <form
        onSubmit={addTask}
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h2>Add Task</h2>

        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          required
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={newTask.description}
          required
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />

        <input
          type="date"
          value={newTask.dueDate}
          required
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Assignee (You / Friend)"
          value={newTask.assignee}
          required
          onChange={(e) =>
            setNewTask({ ...newTask, assignee: e.target.value })
          }
        />

        <select
          value={newTask.priority}
          required
          onChange={(e) =>
            setNewTask({ ...newTask, priority: e.target.value })
          }
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {editingTask && (
        <form
          onSubmit={updateTask}
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h2>Edit Task</h2>

          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />

          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                description: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={editingTask.dueDate || ""}
            onChange={(e) =>
              setEditingTask({ ...editingTask, dueDate: e.target.value })
            }
          />

          <input
            type="text"
            value={editingTask.assignee || ""}
            onChange={(e) =>
              setEditingTask({ ...editingTask, assignee: e.target.value })
            }
          />

          <select
            value={editingTask.priority || "Medium"}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingTask(null)}>
            Cancel
          </button>
        </form>
      )}

      <h2>Tasks</h2>
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #fdfcfcff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Assignee: {task.assignee}</p>
          <p>Priority: {task.priority}</p>

          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task, e.target.value)}
          >
            <option value="incomplete">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => setEditingTask(task)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
