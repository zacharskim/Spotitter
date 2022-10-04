import axios from "axios";

const baseUrl = "https://spotitter-back.fly.dev/";

const getTracks = (searchWord) => {
  const request = axios.get(`${baseUrl}/${searchWord}`);
  return request.then((res) => res);
};

export default getTracks;
