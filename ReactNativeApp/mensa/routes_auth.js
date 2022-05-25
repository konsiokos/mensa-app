import axios from "axios"

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = "http://mensa-v1.herokuapp.com"
export default async function login(email, password) {
    const data = {
        "email": email,
        "password": password
    }
    return await axiosInstance.post("/api/app/login", data)
        .then(async (response) => {
            if (response.data.authenticated == "true") {
                return response.data
            } else if (response.data.authenticated == "false") {
                return false
            }
            return false
        })
}

export async function registerUser(email, password, firstname, lastname) {
    const data = {
        "email": email,
        "password": password,
        "firstName": firstname,
        "lastName": lastname,
    }
    return axiosInstance.post("/api/app/register", data)
        .then((response) => {
            return response.data
        })
}
