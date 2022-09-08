import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./createtask.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi, ListTaskApi, CreateTaskApi } from "../../services/api";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import moment from "moment/moment";

const createUpdateTask = () => {
  return <></>;
};

const CreateTask = () => {
  const [tabledata, setTableData] = useState([]);
  const [nuser, setNuser] = useState();

  const [timevalue, setTimevalue] = useState();

  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userNo", headerName: "userNo", width: 100 },
    { field: "Username", headerName: "Name", width: 100 },
    { field: "created_on", headerName: "CreatedOn", width: 180 },
    { field: "due_date", headerName: "dueDate", width: 180 },
    { field: "message", headerName: "message", width: 230 },
    { field: "priority", headerName: "priority", width: 130 },
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

  function createTask(e) {
    e.preventDefault();
    const { message, priority, assigned } = e.target;

    console.log(message.value, priority.value, assigned.value);
    console.log(selectedDateTime.toLocaleDateString());

    let Fdate = selectedDateTime.toLocaleDateString().replace(/\//g, "-");

    const TwentyFourFormate = moment(selectedDateTime.toLocaleTimeString(), [
      "h:mm A",
    ]).format("HH:mm:ss");

    let data = {
      message: message.value,
      due_date: Fdate + " " + TwentyFourFormate,
      priority: priority.value,
      assigned_to: assigned.value,
    };

    var myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    var formdata = new FormData();
    formdata.append("message", message.value);
    formdata.append("due_date", Fdate + " " + TwentyFourFormate);
    formdata.append("priority", priority.value);
    formdata.append("assigned_to", assigned.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/create", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Data Added!");
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div style={{ display: "flex", overflowX: "hidden" }}>
      <Sidebar />

      <div style={{ display: "flex" }}>
        <div className="createtask">
          <h1>Task Manager: Create Task </h1>

          <div className="createTask">
            <h3>Create Task</h3>
            <form className="createtask_form" onSubmit={createTask}>
              <input type="text" placeholder="Message..." id="message" />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disablePast="true"
                  renderInput={(params) => <TextField {...params} />}
                  value={selectedDateTime}
                  onChange={(value) => {
                    setSelectedDateTime(value);
                  }}
                />
              </LocalizationProvider>
              <select name="assigned" id="assigned">
                <option selected disabled>
                  Assigned To
                </option>
                {nuser?.map((item) => {
                  return (
                    <option value={item.id}>
                      {item.id}&#160;- &#160;
                      {item.name}
                    </option>
                  );
                })}
              </select>

              <select name="priority" id="priority">
                <option selected disabled>
                  Priority
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button>Submit</button>
            </form>
          </div>

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
  );
};

export default CreateTask;
