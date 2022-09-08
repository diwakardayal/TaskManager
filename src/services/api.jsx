import react from "react";
import axios from "axios";
var qs = require("qs");

const url = "https://devza.com/tests/tasks";
const apiKey = "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a";

export const ListUserApi = async () => {
  return axios
    .get(`${url}/listusers`, {
      headers: {
        AuthToken: apiKey,
      },
    })
    .then((res) => res)
    .catch((e) => console.log(e));
};

export const CreateTaskApi = async (data) => {
  return axios
    .post(
      `${url}/create`,
      {
        message: "YES",
      },
      {
        headers: {
          AuthToken: apiKey,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

export const UpdateTaskApi = async (data) => {
  return axios
    .post(`${url}/update`, data, {
      headers: {
        AuthToken: apiKey,
      },
    })
    .then((res) => res)
    .catch((e) => console.log(e));
};

export const DeleteTaskApi = async (receivedData) => {
  var data = qs.stringify({
    receivedData,
  });
  return axios
    .post(`${url}/delete`, data, {
      headers: {
        AuthToken: apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res)
    .catch((e) => console.log(e));
};

export const ListTaskApi = async () => {
  return axios
    .get(`${url}/list`, {
      headers: {
        AuthToken: apiKey,
      },
    })
    .then((res) => res)
    .catch((e) => console.log(e));
};
