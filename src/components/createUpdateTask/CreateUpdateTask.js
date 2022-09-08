import react, { useState, useEffect } from "react";
import "./createUpdateTask.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { CreateTaskApi, ListUserApi } from "../../services/api";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import moment from "moment/moment";

const CreateUpdateTask = ({ state, ID }) => {
  const [nuser, setNuser] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState();

  useEffect(() => {
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

  async function updateTask(e) {
    e.preventDefault();

    console.log(ID);
    const { message, priority, assigned } = e.target;

    if (message.value === "") {
      alert("type your message");
    }

    console.log(message.value, priority.value, assigned.value);
    console.log(selectedDateTime.toLocaleDateString());

    let Fdate = selectedDateTime.toLocaleDateString().replace(/\//g, "-");

    const TwentyFourFormate = moment(selectedDateTime.toLocaleTimeString(), [
      "h:mm A",
    ]).format("HH:mm:ss");

    var myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    var formdata = new FormData();
    formdata.append("message", message.value);
    formdata.append("due_date", Fdate + " " + TwentyFourFormate);
    formdata.append("priority", priority.value);
    formdata.append("assigned_to", assigned.value);
    formdata.append("taskid", ID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/update", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Task Update!");
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="super">
      <div className="parent_center">
        <div className="createUpdateTask">
          <div onClick={() => state(false)}>x</div>
          <h3>Update Task</h3>
          <form className="createtask_form" onSubmit={updateTask}>
            <input type="text" placeholder="Message..." id="message" />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disablePast={true}
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
      </div>
    </div>
  );
};

export default CreateUpdateTask;
