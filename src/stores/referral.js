import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiRequest from '../api/request'
import urls from '../api/urls'

export const useReferralStore = defineStore('referral', () => {
  const networkList = ref([])
  const summary = ref({
    total_network_profit: 0,
    total_network_referral_profit: 0,
    total_referred_users: 0,
    user_refferal_code: ''
  })
  const isLoading = ref(false)

  const fetchReferralNetwork = async () => {
    isLoading.value = true

    const onSuccess = (res) => {
      networkList.value = res?.data || []
      summary.value = res?.summary || {}
      isLoading.value = false
    }

    const onFailure = (error) => {
      console.log('error in referral store', error)
      isLoading.value = false
    }

    const res = await apiRequest('get', urls.referral, {
      onSuccess,
      onFailure,
    })

    return res
  }

  fetchReferralNetwork()

  return {
    networkList,
    summary,
    isLoading,
    fetchReferralNetwork,
  }
})
