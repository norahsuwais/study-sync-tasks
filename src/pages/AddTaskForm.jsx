
import React, { useState } from "react";

export default function AddTaskForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }


    const newTask = {
      id: Date.now(), 
      title: title.trim(),
      description: description.trim(),
      dueDate,
      assignee: assignee.trim(),
      priority,
      status,
    };


    addTask(newTask);


    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignee("");
    setPriority("Medium");
    setStatus("Pending");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>

      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />


      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" />


      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />


      <label>Assignee:</label>
      <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assigned to..." />


      <label>Priority:</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>


      <button type="submit">Add Task</button>
    </form>
  );
}
