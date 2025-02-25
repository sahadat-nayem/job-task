const ManageTask = () => {

        const tasks = [
          { title: "Task 1", description: "Complete UI design", category: "To-Do" },
          {
            title: "Task 1",
            description: "Complete UI design",
            category: "To-Do",
          },
          {
            title: "Task 2",
            description: "Fix backend API issues",
            category: "In Progress",
          },
          { title: "Task 3", description: "Deploy to production", category: "Done" },
        ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["To-Do", "In Progress", "Done"].map((status) => (
          <div
            key={status}
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
            {tasks
              .filter((task) => task.category === status)
              .map((task, index) => (
                <div
                  key={index}
                  className="bg-black glass  p-4 rounded-md shadow-md mb-3"
                >
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <p className="text-sm text-white">{task.description}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTask;
