import { defineStore } from "pinia";
import { ref } from "vue";
import apiRequest from "../api/request";
import urls from "../api/urls";

export const useProfileStore = defineStore('profile', () => {

    const profile = ref({});
    const isConnected = ref(false);
    const broker = ref(null);

    const getProfile = async () => {
        const onSuccess = (res) => {
            profile.value = res.data.user;
            isConnected.value = !!res.data.is_connected
            broker.value = res.data.broker; 
        }

        const onFailure = (error) => {
            console.log(error)
            profile.value = {}
        }

        await apiRequest('get', urls.profile, {
            onSuccess,
            onFailure
        })
    }

    const updateProfile = async (data) => {
        const onSuccess = (res) => {
            getProfile()
        }

        const onFailure = (error) => {
            console.log(error)
        }

        return await apiRequest('put', urls.profile, {
            data,
            onSuccess,
            onFailure
        })
    }

    const changePassword = async (data) => {

        return await apiRequest('put', urls.changePassword, {
            data,
            onSuccess: () => null,

            onFailure: () => null
        })
    }

    getProfile();

    return {
        profile,
        isConnected,
        broker,
        getProfile,
        updateProfile,
        changePassword
    }

})
