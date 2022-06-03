import axios from 'axios'

const baseUrl = '/getData'



const sendHandle = (handle) => {
    console.log('handle from axios is', handle)
    const request = axios.get(`${baseUrl}/${handle}`)
    return request.then(response => response)
  }


export default { sendHandle }


