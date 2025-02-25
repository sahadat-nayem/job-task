import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Task:", data);
          if (data) {
            setTask(data);
          } else {
            console.error("Task not found");
          }
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      // Show SweetAlert2 success message after task update
      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "Your task has been successfully updated.",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/"); // Redirect to home page after the user closes the alert
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Show SweetAlert2 error message if there's an issue
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the task.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-5">
        <span>Update</span>
        <span className="text-blue-500">Task</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="glass bg-black text-white p-2 rounded-md"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
