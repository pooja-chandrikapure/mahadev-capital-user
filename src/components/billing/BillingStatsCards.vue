<template>
  <div class="grid grid-cols-3 gap-4">
    <!-- Total Saved Via Referral -->
    <div class="bg-card-background border border-primary-border rounded-xl p-5">
      <p class="text-primary-text text-sm mb-1">Total Saved Via Referral</p>
      <!-- <p class="text-primary-text text-2xl font-bold">₹1,19,932.87</p>
      <p class="text-primary-text text-xs mt-1">Combined Net Gain from 100 Referrals</p> -->
      <template v-if="store.isLoading">
        <div class="h-8 w-36 bg-black/10 rounded animate-pulse mt-2 mb-2"></div>
        <div class="h-3 w-44 bg-black/10 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <p class="text-secondary-text text-2xl font-bold">₹{{ formatAmount(store.summary.total_saved_via_referral.amount) }}</p>
        <p class="text-secondary-text text-xs mt-1">
          From {{ store.summary.total_saved_via_referral.from_referrals }} Referrals
        </p>
      </template>
    </div>

    <!-- Next Bill Forecast -->
    <div class="bg-card-background border border-primary-border rounded-xl p-5">
      <p class="text-primary-text text-sm mb-1">Next Bill Forecast</p>
      <template v-if="store.isLoading">
        <div class="h-8 w-36 bg-black/10 rounded animate-pulse mt-2 mb-2"></div>
        <div class="h-3 w-44 bg-black/10 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <p class="text-secondary-text text-2xl font-bold">₹{{ formatAmount(store.summary.next_bill_forecast.amount) }}</p>
        <p class="text-secondary-text text-xs mt-1">
          Due in {{ store.summary.next_bill_forecast.days_until_due }} Days
          · {{ formatDate(store.summary.next_bill_forecast.due_date) }}
        </p>
      </template>
    </div>

    <!-- Total Net Bill Paid -->
    <div class="bg-card-background border border-primary-border rounded-xl p-5">
      <p class="text-primary-text text-sm mb-1">Total Net Bill Paid</p>
      <template v-if="store.isLoading">
        <div class="h-8 w-36 bg-black/10 rounded animate-pulse mt-2 mb-2"></div>
        <div class="h-3 w-44 bg-black/10 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <p class="text-secondary-text text-2xl font-bold">₹{{ formatAmount(store.summary.total_net_bill_paid.amount) }}</p>
        <p class="text-secondary-text text-xs mt-1">
          <template v-if="store.summary.total_net_bill_paid.period_start && store.summary.total_net_bill_paid.period_end">
            {{ formatDate(store.summary.total_net_bill_paid.period_start) }} -
            {{ formatDate(store.summary.total_net_bill_paid.period_end) }}
          </template>
          <template v-else>No billing period available</template>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useBillingStore } from '../../stores/billing';

const store = useBillingStore();

const formatAmount = (val) => {
  return Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
 
const formatDate = (dateStr) => {
  if (!dateStr) return '--'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>
