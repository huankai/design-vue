import axios from "axios"

var JSONBigInt = require("json-bigint");

axios.defaults.timeout = 5000;
const instance = axios.create({
  baseURL: "/"
});
instance.interceptors.response.use(response => {
  console.log("==============")
  console.log(response)
  return response.data;
});

export function defaultRequest(options) {
  return instance(options);
}

/**
 * emi
 * @type {AxiosInstance}
 */
const emiInstance = axios.create({
  baseURL: "/emi",
  transformResponse: [function (data, headers) {
    return JSONBigInt.parse(data);
  }],
});
emiInstance.interceptors.response.use(response => {
  console.log(response);
  return response.data;
});

export function emiRequest(options) {
  return emiInstance(options);
}
