import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUser from "./pages/listuser/listuser";
import CreateTask from "./pages/createtask/createtask";
import DeleteTask from "./pages/deletetask/deletetask";
import UpdateTask from "./pages/updatetask/updatetask";
import ListTask from "./pages/listtasks/listtasks";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();
// const posts = queryClient.getQueryData("posts");

// async function fetchUser() {
//   const res = await fetch("https://devza.com/tests/tasks/listusers", {
//     method: "GET",
//     headers: {
//       AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
//     },
//   })
//     .then((res) => console.log(res.json()))
//     .catch((e) => console.log(e));
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ListUser />} />
          <Route path="/listuser" element={<ListUser />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/UpdateTask" element={<UpdateTask />} />
          <Route path="/DeleteTask" element={<DeleteTask />} />
          <Route path="/ListTask" element={<ListTask />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
