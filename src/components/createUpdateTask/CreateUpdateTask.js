import react, { useState, useEffect } from "react";
import "./createUpdateTask.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { CreateTaskApi, ListUserApi } from "../../services/api";

const CreateUpdateTask = ({ state }) => {
  const [nuser, setNuser] = useState();
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

  return (
    <div className="super">
      <div className="parent_center">
        <div className="createUpdateTask">
          <div onClick={() => state(false)}>x</div>
          <h3>Update Task</h3>
          <form className="createtask_form">
            <input type="text" placeholder="Message..." />
            <DatePicker
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
            />
            <select name="assigned">
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

            <select name="priority">
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
