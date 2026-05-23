import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiRequest from '../api/request'
import urls from '../api/urls'

export const useBillingStore = defineStore('billing', () => {
  const summary = ref({
    next_bill_forecast: { amount: 0, days_until_due: 0, due_date: null },
    total_net_bill_paid: { amount: 0, period_start: null, period_end: null },
    total_saved_via_referral: { amount: 0, from_referrals: 0 }
  })
  const ledger = ref([])
  const pagination = ref({
    has_next: false,
    has_prev: false,
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  })
  const isLoading = ref(false)
  const isLedgerLoading = ref(false)

  const fetchBillingSummary = async () => {
    isLoading.value = true

    const onSuccess = (res) => {
      summary.value = res?.data || summary.value
      isLoading.value = false
    }

    const onFailure = (error) => {
      console.log('error in billing store', error)
      isLoading.value = false
    }

    const res = await apiRequest('get', urls.billingSummary, {
      onSuccess,
      onFailure,
    })

    return res
  }

  const fetchLedger = async (page = 1) => {
    isLedgerLoading.value = true
 
    const onSuccess = (res) => {
      ledger.value = res?.data?.ledger || []
      pagination.value = res?.data?.pagination || pagination.value
      isLedgerLoading.value = false
    }
 
    const onFailure = (error) => {
      console.log('error in billing ledger', error)
      isLedgerLoading.value = false
    }
 
    const res = await apiRequest('get', urls.billingLedger, {
      onSuccess,
      onFailure,
      params: { page, per_page: pagination.value.per_page }
    })
 
    return res
  }

  fetchBillingSummary()
  fetchLedger()

  return {
    summary,
    ledger,
    pagination,
    isLoading,
    isLedgerLoading,
    fetchBillingSummary,
    fetchLedger,
  }
})