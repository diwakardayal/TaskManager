import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./deletetask.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi, ListTaskApi } from "../../services/api";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import CreateUpdateTask from "../../components/createUpdateTask/CreateUpdateTask";

const DeleteTask = () => {
  const [spinner, setSpinner] = useState(false);
  const [tabledata, setTableData] = useState([]);
  const [nuser, setNuser] = useState();
  const [popup, setPopup] = useState(false);
  const [taskId, setTaskId] = useState();

  console.log(taskId?.id);

  //delete function
  async function deletefn() {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      console.log(taskId?.id);
    }, 1000);

    var myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("taskid", taskId.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/delete", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Task Deleted!");
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userNo", headerName: "userNo", width: 100 },
    { field: "Username", headerName: "Name", width: 100 },
    { field: "created_on", headerName: "CreatedOn", width: 180 },
    { field: "due_date", headerName: "dueDate", width: 180 },
    { field: "message", headerName: "message", width: 150 },
    { field: "priority", headerName: "priority", width: 130 },
    {
      field: "Delete",
      headerName: "Delete Task",
      width: 300,
      renderCell: (id) => {
        return (
          <>
            <div className="">
              <button
                onClick={() => {
                  setTaskId(id);
                  deletefn();
                }}
              >
                Delete
              </button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    ListTaskApi()
      .then((res) => {
        let data = res.data.tasks.map((item) => {
          const {
            id,
            assigned_name: Username,
            assigned_to: userNo,
            created_on,
            due_date,
            message,
            priority,
            id: Delete,
          } = item;

          return {
            id,
            Username,
            userNo,
            created_on,
            due_date,
            message,
            priority,
            Delete,
          };
        });
        console.log(data);
        setTableData(data);
      })
      .catch((e) => console.log(e));

    ListUserApi().then((res) => {
      console.log(res.data.users);
      let nUser = res.data.users.map((item) => {
        const { id, name } = item;

        return {
          id,
          name,
        };
      });

      console.log(nUser);
      setNuser(nUser);
    });
  }, []);

  return (
    <>
      <div>
        {spinner && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#88888853",
            }}
          >
            <div className="bg">
              <div className="spinner "></div>
            </div>
          </div>
        )}
      </div>
      {popup ? (
        <CreateUpdateTask />
      ) : (
        <div style={{ display: "flex", overflowX: "hidden" }}>
          <Sidebar />

          <div style={{ display: "flex" }}>
            <div className="createtask">
              <h1>Task Manager : Delete Task</h1>

              <div className="createTask"></div>

              <div style={{ height: 600, width: 1000 }} className="tasklist">
                <h3>
                  Task List -
                  {taskId?.id
                    ? `Task Id selected ${taskId.id}`
                    : "No Task selected"}
                </h3>
                <span style={{ fontSize: ".9rem" }}>
                  *Double Click required to delete the task
                </span>
                <DataGrid
                  rows={tabledata}
                  columns={columns}
                  pageSize={9}
                  rowsPerPageOptions={[5]}
                  // checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTask;
