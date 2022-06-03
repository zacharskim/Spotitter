import axios from 'axios'


const baseUrl = 'http://localhost:3001/'


  const getTracks = (searchWord) => {
    const request = axios.get(`${baseUrl}/${searchWord}`)
    return request.then(res => res)
  
  }


export default { getTracks }
