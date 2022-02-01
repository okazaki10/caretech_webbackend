import axios from "axios";
export const URL = 'http://localhost:5000'
const axiosFetch = axios.create({
    baseURL: URL
});
export default axiosFetch
