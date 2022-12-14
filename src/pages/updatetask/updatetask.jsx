import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./updatetask.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi, ListTaskApi } from "../../services/api";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import CreateUpdateTask from "../../components/createUpdateTask/CreateUpdateTask";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const popUp = () => {};

const UpdateTask = () => {
  const [tabledata, setTableData] = useState([]);
  const [nuser, setNuser] = useState();
  const [popup, setPopup] = useState(false);
  const [currentId, setCurrentId] = useState();
  console.log(popup);

  function buttonfn(id) {}
  console.log(currentId?.id);

  function deletefn() {}

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userNo", headerName: "userNo", width: 100 },
    { field: "Username", headerName: "Name", width: 100 },
    { field: "created_on", headerName: "CreatedOn", width: 180 },
    { field: "due_date", headerName: "dueDate", width: 180 },
    { field: "message", headerName: "message", width: 250 },
    { field: "priority", headerName: "priority", width: 130 },
    {
      field: "update",
      headerName: "Update Task",
      width: 300,
      renderCell: (id) => {
        return (
          <>
            <div className="">
              <button
                onClick={() => {
                  setPopup(true);
                  setCurrentId(id);
                }}
              >
                Update
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
            id: update,
          } = item;
          return {
            id,
            Username,
            userNo,
            created_on,
            due_date,
            message,
            priority,
            update,
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
    <div>
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Sidebar />

        <div style={{ display: "flex", zIndex: "9" }}>
          {popup && <CreateUpdateTask state={setPopup} ID={currentId?.id} />}
          <div className="createtask">
            <h1>Task Manager : Update Task</h1>

            <div className="createTask"></div>
            <div style={{ height: 600, width: 1000 }} className="tasklist">
              <h3>Task List</h3>
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
    </div>
  );
};

export default UpdateTask;
