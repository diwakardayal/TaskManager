import react, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./listuser.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ListUserApi } from "../../services/api";
import { useQueries, useQuery } from "react-query";

async function fetchData() {}

const ListUser = () => {
  const [tabledata, setTableData] = useState([]);
  const [input, setInput] = useState();
  const [display, setDisplay] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },

    { field: "name", headerName: "Name", width: 130 },
    {
      field: "picture",
      headerName: "Profile Picture",
      width: 540,
      renderCell: (picture) => {
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
  console.log(input);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="searchbar"
          style={{ paddingTop: "1.2rem", paddingLeft: "2rem", zIndex: "999" }}
        >
          <input
            type="text"
            placeholder="search..."
            onFocus={() => {
              setTimeout(() => {
                setDisplay(false);
              }, 2500);
              setDisplay(true);
            }}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target === document.activeElement) {
                setDisplay(true);
              } else {
                setDisplay(false);
              }
            }}
          />

          <div style={{ marginTop: "", width: "10rem" }}>
            {display ? (
              <div style={{ padding: "1px 2px", backgroundColor: "white" }}>
                {tabledata
                  .filter((item) => {
                    return item.name.toLowerCase().includes(input);
                  })
                  .map((data) => {
                    return <div>{data.name}</div>;
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
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
