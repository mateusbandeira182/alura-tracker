import axios, { AxiosInstance } from "axios";

const clienteHttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Content-Type' : 'application/json',
    },
});

export default clienteHttp;