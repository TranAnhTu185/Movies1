import axios from "axios";
import apiConfig from "./apiConfig";
import queryString from "query-string";


const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apikey})
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if( response && response.data) {
        return response.data;
    }
    return response;
}, (e) => {
    throw e;
})

export default axiosClient;