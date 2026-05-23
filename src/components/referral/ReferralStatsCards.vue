<template>
  <div class="grid grid-cols-3 gap-4">
    <!-- Total Network Profit -->
    <div class="bg-card-background border border-primary-border rounded-xl p-5">
      <p class="text-secondary-text text-sm mb-1">Total Network Profit</p>
      <template v-if="store.isLoading">
        <div class="h-8 w-36 bg-white/10 rounded animate-pulse mt-2 mb-2"></div>
        <div class="h-3 w-48 bg-white/5 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <p class="text-secondary-text text-2xl font-bold">₹{{ formatAmount(store.summary.total_network_profit) }}</p>
        <p class="text-secondary-text text-xs mt-1">Combined Net Gain from {{ store.summary.total_referred_users }} Referrals</p>
      </template>
    </div>

    <!-- Accumulated Credits -->
    <div class="bg-card-background border border-primary-border rounded-xl p-5">
      <p class="text-secondary-text text-sm mb-1">Accumulated Credits</p>
      <template v-if="store.isLoading">
        <div class="h-8 w-36 bg-white/10 rounded animate-pulse mt-2 mb-2"></div>
        <div class="h-3 w-40 bg-white/5 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <p class="text-secondary-text text-2xl font-bold">₹{{ formatAmount(store.summary.total_network_referral_profit) }}</p>
        <p class="text-secondary-text text-xs mt-1">Ready for automated deductions</p>
      </template>
    </div>

    <!-- Referral Code -->
    <div class="rounded-xl p-5 relative overflow-hidden" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
      <p class="text-white text-xs uppercase tracking-widest mb-3">Your Referral Code</p>
      <template v-if="store.isLoading">
        <div class="h-10 w-40 bg-white/10 rounded animate-pulse"></div>
      </template>
      <template v-else>
        <div class="flex items-center gap-3 bg-white/10 border border-primary-border rounded-lg px-4 py-2 w-fit">
          <span class="text-white font-mono font-semibold text-base tracking-wider">{{ store.summary.user_refferal_code }}</span>
          <button @click="copyCode" class="text-white hover:text-white transition-colors">
            <Copy :size="16" />
          </button>
        </div>
      </template>
      <div class="absolute right-0 top-0 w-24 h-24 opacity-10" style="background: radial-gradient(circle, #fff 0%, transparent 70%);"></div>
    </div>
  </div>
</template>

<script setup>
import { Copy } from 'lucide-vue-next'
import { useReferralStore } from '../../stores/referral'

const store = useReferralStore()

const copyCode = () => {
  navigator.clipboard.writeText(store.summary.user_refferal_code)
}

const formatAmount = (val) => {
  return Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
