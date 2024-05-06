import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://server-bistro-boss-navy.vercel.app"
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log(token);
        // console.log('request hit by interciptors');
        config.headers.authorization = `Beared ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    // for response
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const status = error?.response?.status;
        // console.log('getting error in response ', status);
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login")
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;