import axios from "axios";

const baseUrl = "https://spotitter-back.fly.dev/getData";

//need to put some error handling here...
const sendHandle = (handle) => {
  console.log("handle from axios is", handle);
  const request = axios.get(`${baseUrl}/${handle}`);
  return request.then((response) => response);
};

export default sendHandle;
