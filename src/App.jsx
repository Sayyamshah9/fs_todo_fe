import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// const dummyData = [
//   {
//     title: "task1",
//     description: "Description of Task 1",
//     isCompleted: false,
//   },
//   {
//     title: "task2",
//     description: "Description of Task 2",
//     isCompleted: true,
//   },
//   {
//     title: "task3",
//     description: "Description of Task 3",
//     isCompleted: false,
//   },
// ];

const baseUrl = "http://localhost:3001/";

const App = () => {
  const [taskData, setTaskdata] = useState([]);
  const [data, setData] = useState({});

  const handler = (e) => {
    e.preventDefault();
    const payload = {
      title: e.target.taskInput.value,
      description: "",
      isCompleted: false,
    };
    setData(payload);
    axios
      .post(baseUrl + "post", payload)
      .then((response) => {})
      .catch((error) => {
        console.lof(error.message);
      });
  };
  const handleTaskStatus = (isChecked, id) => {
    const payload = {
      id: id,
      data: {
        isCompleted: isChecked,
      },
    };
    setData(payload?.data);
    axios
      .put(baseUrl + "put", payload)
      .then((response) => {})
      .catch((error) => {
        console.lof(error.message);
      });
  };

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/get")
        .then((response) => {
          setTaskdata(response?.data);
        })
        .catch((error) => {
          console.log(error?.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <>
      <div className="shadow-lg p-5">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Task ☻
          </label>
          <form onSubmit={handler} autoComplete="off">
            <div className="flex justify-center items-center gap-3">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add Task"
                name="taskInput"
                required
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </form>
          <hr className="mt-5" />
          <div>
            {taskData.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center mt-3"
                >
                  <p
                    className={`${
                      data?.isCompleted ? "line-through text-[#808080]" : ""
                    }`}
                  >
                    {data?.title}
                  </p>
                  <input
                    id="remember"
                    type="checkbox"
                    name="taskStatus"
                    value=""
                    checked={data?.isCompleted}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    onClick={(e) =>
                      handleTaskStatus(e.target.checked, data?._id)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
