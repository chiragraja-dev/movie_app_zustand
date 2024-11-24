import axios from 'axios';
import flavor from '@/flavor';

const appversion = "1.0.0";

const axiosClient = axios.create({
    baseURL: flavor()?.BASE_URL,
    headers: {
        "App-Version": appversion
    }
});

export default axiosClient