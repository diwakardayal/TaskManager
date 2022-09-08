import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./listtask.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi, ListTaskApi } from "../../services/api";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import CreateUpdateTask from "../../components/createUpdateTask/CreateUpdateTask";

const ListTask = () => {
  const [tabledata, setTableData] = useState([]);
  const [nuser, setNuser] = useState();
  const [popup, setPopup] = useState(false);
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
      renderCell: (params) => {
        return (
          <>
            <div className="">
              <button onClick={() => setPopup(true)}>Delete</button>
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
          } = item;
          return {
            id,
            Username,
            userNo,
            created_on,
            due_date,
            message,
            priority,
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
      {popup ? (
        <CreateUpdateTask />
      ) : (
        <div style={{ display: "flex", overflowX: "hidden" }}>
          <Sidebar />

          <div style={{ display: "flex" }}>
            <div className="createtask">
              <h1>NICEHEADING</h1>

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
      )}{" "}
    </>
  );
};

export default ListTask;
