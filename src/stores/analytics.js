import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiRequest from '../api/request'
import urls from '../api/urls'

export const useAnalyticsStore = defineStore('analytics', () => {
  const pnlData = ref({})
  const isLoading = ref(false)

  const fetchPnlSummary = async ({ from_date, to_date } = {}) => {
    isLoading.value = true

    const onSuccess = (res) => {
      pnlData.value = res?.data || {}
      isLoading.value = false
    }

    const onFailure = (error) => {
      console.log('error in analytics store', error)
      isLoading.value = false
    }

    const res = await apiRequest('get', urls.pnlSummary, {
      onSuccess,
      onFailure,
      params: { from_date, to_date }
    })

    return res
  }

  return {
    pnlData,
    isLoading,
    fetchPnlSummary,
  }
})