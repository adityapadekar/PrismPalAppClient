import axios from "axios";

const api = axios.create({
    baseURL:
        `${process.env.BACKEND_URL}/api/v1` || "http://localhost:8080/api/v1",
});

export default api;
