import * as SecureStore from 'expo-secure-store'
import axios from "axios"

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = "http://mensa-v1.herokuapp.com"

axiosInstance.interceptors.response.use(null, async function (error) {
    if (error.response.status === 401) {
        return refreshtoken().then(
            async () => {
                var config = error.config
                config.headers.Authorization = `Bearer ${await SecureStore.getItemAsync("accessToken")}`
                return await axiosInstance.request(config)
            }
        )
    }
    if (error.response.status === 422) {
        const token = await SecureStore.getItemAsync("accessToken")
        var config = error.config
        config.headers.Authorization = `Bearer ${token}`
        return await axiosInstance.request(config)
    }
    return Promise.reject(error);
});

export default async function getUser() {
    axiosInstance.defaults.headers.Authorization = "Bearer " + await SecureStore.getItemAsync("accessToken")
    return await axiosInstance.get("/api/app/user-details")
        .then((response) => {
            if (response.status == 200) {
                return response.data
            }
            return null
        })
}

async function refreshtoken() {
    const config = {
        headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync("refreshToken")}`
        }
    }
    return await axiosInstance.get("/api/app/refresh-token", config)
        .then((response) => {
            if (response.status == 200) {
                return SecureStore.setItemAsync("accessToken", response.data.accessToken).then(
                    SecureStore.setItemAsync("refreshToken", response.data.refreshToken)
                ).then(() => { return true })
            }
            return false
        })
}

export async function getAllClubs() {
    axiosInstance.defaults.headers.Authorization = "Bearer " + await SecureStore.getItemAsync("accessToken")
    return await axiosInstance.get("/api/app/get-clubs")
        .then((response) => {
            if (response.status == 200) {
                return response.data
            }
        })
}
export async function getUserBookings() {
    axiosInstance.defaults.headers.Authorization = "Bearer " + await SecureStore.getItemAsync("accessToken")
    return await axiosInstance.get("/api/app/get-bookings")
        .then((response) => {
            if (response.status == 200) {
                return response.data
            }
            return []
        })
}
export async function getAvailableSlots(club_id) {
    axiosInstance.defaults.headers.Authorization = "Bearer " + await SecureStore.getItemAsync("accessToken")
    return await axiosInstance.post("/api/app/get-available-slots", { "clubID": club_id })
        .then((response) => {
            if (response.status == 200) {
                return response.data
            }
            return []
        })
}


export async function makeBooking(slot_id) {
    axiosInstance.defaults.headers.Authorization = "Bearer " + await SecureStore.getItemAsync("accessToken")
    return await axiosInstance.post("/api/app/make-booking", { "slotID": slot_id })
        .then((response) => {
            if (response.data == "success" && response.status == 200) {
                return true
            }
            return false
        })
}
