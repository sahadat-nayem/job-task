import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const socket = io("http://localhost:5000");

const ManageTask = () => {
  const [taskData, setTaskData] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  });

  const fetchTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        const categorizedTasks = { "To-Do": [], "In Progress": [], Done: [] };
        data.forEach((task) => {
          categorizedTasks[task.category].push(task);
        });
        setTaskData(categorizedTasks);
      });
  };

  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", fetchTasks);

    return () => {
      socket.off("taskUpdated");
    };
  }, []);

  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;
    const sourceItems = [...taskData[sourceCategory]];
    const destinationItems = [...taskData[destinationCategory]];

    const [movedTask] = sourceItems.splice(source.index, 1);
    movedTask.category = destinationCategory; // ক্যাটাগরি আপডেট

    destinationItems.splice(destination.index, 0, movedTask);

    setTaskData({
      ...taskData,
      [sourceCategory]: sourceItems,
      [destinationCategory]: destinationItems,
    });

    // **Update Full Task Data in Database**
    await fetch(`http://localhost:5000/tasks/${movedTask._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movedTask), // পুরো অবজেক্ট পাঠানো
    });

    socket.emit("taskUpdated");
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });
        fetchTasks();
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["To-Do", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gradient-to-r bg-black p-4 rounded-lg shadow-lg"
                >
                  <h2
                    className={`text-lg font-semibold mb-3 ${
                      status === "To-Do"
                        ? "text-blue-600"
                        : status === "In Progress"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {status}
                  </h2>
                  {taskData[status].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-black glass p-4 rounded-md shadow-md mb-3"
                        >
                          <h3 className="font-semibold text-xl text-white">
                            {task.title}
                          </h3>
                          <p className="text-md text-white">
                            {task.description}
                          </p>
                          <p className="text-sm text-gray-300">
                            {task.timestamp}
                          </p>
                          <div className="flex justify-between">
                            <Link
                              to={`/updateTask/${task._id}`}
                              className="text-blue-500 text-xl mt-5"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-red-500 text-xl mt-5"
                            >
                              <RiDeleteBin2Fill />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ManageTask;
