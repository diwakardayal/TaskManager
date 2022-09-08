import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./listuser.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi } from "../../services/api";

const rows = [
  { id: 1, lastName: "Snow", emailId: "Jon", phoneNo: "123123", age: 35 },
  {
    id: 2,
    lastName: "Lannister",
    emailId: "Cersei",
    phoneNo: "123123",
    age: 42,
  },
  {
    id: 3,
    lastName: "Lannister",
    emailId: "Jaime",
    phoneNo: "123123",
    age: 45,
  },
  { id: 4, lastName: "Stark", emailId: "Arya", phoneNo: "123123", age: 16 },
  {
    id: 5,
    lastName: "Targaryen",
    emailId: "Daenerys",
    phoneNo: "123123",
    age: null,
  },
  { id: 6, lastName: "Melisandre", emailId: null, phoneNo: "123123", age: 150 },
  {
    id: 7,
    lastName: "Clifford",
    emailId: "Ferrara",
    phoneNo: "123123",
    age: 44,
  },
  {
    id: 8,
    lastName: "Frances",
    emailId: "Rossini",
    phoneNo: "123123",
    age: 36,
  },
  { id: 9, lastName: "Roxie", emailId: "Harvey", phoneNo: "123123", age: 65 },
];

const ListUser = () => {
  const [tabledata, setTableData] = useState([]);
  console.log(tabledata);
  const columns = [
    { field: "id", headerName: "ID", width: 30 },

    { field: "name", headerName: "Name", width: 130 },
    {
      field: "picture",
      headerName: "Profile Picture",
      width: 540,
      renderCell: (picture) => {
        console.log(picture.value);
        return (
          <div>
            <img src={picture.value} alt="" />
            <p>Not valid image are here or else it would have been displayed</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    ListUserApi()
      .then((res) => {
        let data = res.data.users?.map((item) => {
          const { id, name, picture } = item;
          return { id, name, picture };
        });
        setTableData(data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ display: "flex" }}>
        <div className="listuser">
          <h1>Task Manager : List User</h1>

          <div style={{ height: 600, width: 800 }}>
            <DataGrid
              rows={tabledata}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              // checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
