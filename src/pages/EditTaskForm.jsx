
import React, { useState, useEffect } from "react";

export default function EditTaskForm({ task, updateTask, cancelEdit, users = [] }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignee: "",
    priority: "Medium",
    status: "Pending",
  });


  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        assignee: task.assignee || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
      });
    }
  }, [task]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    updateTask({ ...task, ...form });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      <h3>Edit Task</h3>

      <label>Title:</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Description:</label>
      <input name="description" value={form.description} onChange={handleChange} />

      <label>Due Date:</label>
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

      <label>Assignee:</label>

      {users && users.length > 0 ? (
        <select name="assignee" value={form.assignee} onChange={handleChange}>

          <option value="">Unassigned</option>
          {users.map((u, idx) => (
            <option key={idx} value={u}>
              {u}
            </option>
          ))}
        </select>
      ) : (
        <input name="assignee" value={form.assignee} onChange={handleChange} />
      )}

      <label>Priority:</label>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Status:</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button type="submit">Save</button>
        <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}
