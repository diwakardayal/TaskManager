import react from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <Link to="/listuser">
          <li>
            <div>List User</div>
          </li>
        </Link>
      </ul>{" "}
      <ul>
        <Link to="/CreateTask">
          <li>
            <div>Create Task</div>
          </li>
        </Link>
      </ul>
      <ul>
        <Link to="/UpdateTask">
          <li>
            <div>Update Task</div>
          </li>
        </Link>
      </ul>
      <ul>
        <Link to="/DeleteTask">
          <li>
            <div>Delete Task</div>
          </li>
        </Link>
      </ul>{" "}
      <ul>
        <Link to="/ListTask">
          <li>
            <div>List Task</div>
          </li>
        </Link>
      </ul>
      <ul>
        <li>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
