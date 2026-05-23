import { defineStore } from "pinia";
import { ref } from "vue";
import apiRequest from "../api/request";
import urls from "../api/urls";

export const useUserStore = defineStore('users', () => {
    const users = ref([]);
    const profitSummary = ref({
        client_profit: 0,
        company_profit: 0,
        referal_profit: 0,
        total_active_clients: 0,
        total_manual_profit: 0
    })

    const idToDelete = ref(null);
    const selectedUser = ref(null);

    const showBrokerAddModal = ref(false);
    const showDeleteModal = ref(false);
    const showAddEditModal = ref(false)

    const currentPage = ref(1);
    const totalPages = ref(0);


    const getUsers = async () => {
        const onSuccess = (res) => {
            users.value = res.data.users;
        }

        const onFailure = (error) => {
            console.log('error in userstore', error);
        }

        await apiRequest('get', urls.users, {
            onSuccess,
            onFailure,
            params: {}
        })
    }

    const addEditUser = async (payload) => {
        const onSuccess = (res) => {
            getUsers();
            return true;
        }

        const onFailure = (error) => {
            console.log('error in creating user', error);
            return false
        }

        const method = selectedUser.value ? 'put' : 'post'
        const res = await apiRequest(method, urls.users, {
            onSuccess,
            onFailure,
            data: payload,
            ...(selectedUser.value && {
                look_up_key: selectedUser.value.id,
            }),
        })
        if (res.data) { return res.data }
    }

    const deleteUser = async () => {
        if (!idToDelete.value) return;
        const onSuccess = (res) => {
            idToDelete.value = false;
            showDeleteModal.value = false;
            getUsers();
            return true;
        }

        const onFailure = (error) => {
            console.log('error in deleting user', error);
            return false
        }

        const res = await apiRequest('delete', urls.users, {
            onSuccess,
            onFailure,
            look_up_key: idToDelete.value
        })
        if (res.data) { return res.data }
    }

    const getProfitSummary = async () => {
        const onSuccess = (response) => {
            profitSummary.value = response.data;
            return true;
        }

        const onFailure = (error) => {
            console.log('error in profile store', error);
            return false;
        }

        const res = await apiRequest('get', urls.profitSummary, {
            onSuccess,
            onFailure
        })

        return res
    }

    getUsers();

    return {
        users,
        profitSummary,
        idToDelete,
        showAddEditModal,
        showDeleteModal,
        selectedUser,
        showBrokerAddModal,
        getUsers,
        addEditUser,
        deleteUser,
        getProfitSummary
    }
})