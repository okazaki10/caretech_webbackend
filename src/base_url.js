import axios from "axios";
export const SERVER = 'http://localhost:5000'
const axiosFetch = axios.create({
    baseURL: SERVER
});
export default axiosFetch
