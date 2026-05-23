import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiRequest from '../api/request'
import urls from '../api/urls'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const pagination = ref({
    has_next: false,
    has_prev: false,
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  })
  const isLoading = ref(false)

  const fetchOrders = async (page = 1) => {
    isLoading.value = true

    const onSuccess = (res) => {
      orders.value = res?.data?.orders || []
      pagination.value = res?.data?.pagination || pagination.value
      isLoading.value = false
    }

    const onFailure = (error) => {
      console.log('error in order store', error)
      isLoading.value = false
    }

    const res = await apiRequest('get', urls.orders, {
      onSuccess,
      onFailure,
      params: { page, per_page: pagination.value.per_page }
    })

    return res
  }

  fetchOrders()

  return {
    orders,
    isLoading,
    pagination,
    fetchOrders,
  }
})
