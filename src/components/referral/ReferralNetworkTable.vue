<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-1">
      <div>
        <p class="text-primary-text font-semibold text-base">My Referral Network</p>
        <p class="text-primary-text text-xs">Distribution across all sharing group</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-primary-text text-sm">Showing</span>
        <button class="flex items-center bg-table-header-background gap-2 border border-primary-border rounded-lg px-3 py-1.5 text-primary-text text-sm hover:text-primary-text transition-colors">
          <ArrowUpDown :size="14" />
          Sort By
          <ChevronDown :size="14" />
        </button>
        <span class="w-2 h-2 rounded-full bg-blue-500"></span>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full mt-4 ">
      <thead>
        <tr class="border-b border-primary-border bg-table-header-background">
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">NAME</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">Signup Date</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">Total Profit</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">Total Positions</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">Status</th>
          <th class="text-right text-primary-text text-xs font-medium py-2 pb-3">CREDITS EARNED</th>
          <!-- <th class="text-right text-primary-text text-xs font-medium py-2 pb-3">CREDITS EARNED</th> -->
        </tr>
      </thead>
      <tbody>
        <!-- Skeleton -->
        <template v-if="store.isLoading">
          <tr v-for="n in 4" :key="'skel-' + n" class="border-b border-primary-border last:border-0">
            <td class="py-4">
              <div class="h-3.5 w-28 bg-white/10 rounded animate-pulse mb-1"></div>
              <div class="h-2.5 w-36 bg-white/5 rounded animate-pulse"></div>
            </td>
            <td class="py-4">
              <div class="h-3.5 w-24 bg-white/10 rounded animate-pulse mb-1"></div>
              <div class="h-2.5 w-16 bg-white/5 rounded animate-pulse"></div>
            </td>
            <td class="py-4"><div class="h-3.5 w-20 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="h-3.5 w-12 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="h-6 w-16 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-4 flex justify-end"><div class="h-3.5 w-16 bg-white/10 rounded animate-pulse"></div></td>
          </tr>
        </template>
 
        <!-- Data -->
        <template v-else>
          <tr
            v-for="(referral, index) in store.networkList"
            :key="index"
            class="border-b border-primary-border last:border-0"
          >
            <td class="py-4">
              <p class="text-secondary-text text-sm font-medium">{{ referral.user_name }}</p>
              <p class="text-secondary-text text-xs">{{ referral.user_email }}</p>
            </td>
            <td class="py-4">
              <p class="text-secondary-text text-sm">{{ formatDate(referral.date) }}</p>
              <p class="text-secondary-text text-xs">{{ formatTime(referral.date) }}</p>
            </td>
            <td class="py-4 text-secondary-text text-sm">₹{{ referral.total_profit?.toFixed(2) }}</td>
            <td class="py-4 text-secondary-text text-sm">{{ referral.total_positions }}</td>
            <td class="py-4">
              <span
                :class="referral.status === 'success' ? 'bg-green-600' : 'bg-red-500'"
                class="text-white text-xs font-medium px-1 py-1 rounded capitalize"
              >
                {{ referral.status }}
              </span>
            </td>
            <td class="py-4 text-sm text-center">
              <span class="text-primary-green text-sm font-semibold">
                +{{ referral.total_referral_profit?.toFixed(2) }}
              </span>
            </td>
          </tr>
 
          <!-- Empty state -->
          <tr v-if="!store.networkList.length">
            <td colspan="6" class="py-10 text-center text-secondary-text text-sm">No referrals found.</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { useReferralStore } from '../../stores/referral';


const store = useReferralStore();

// const referrals = [
//   {
//     name: 'Kavita Bairagi',
//     email: 'kavitabairagi@gmail.com',
//     signupDate: 'Oct 12, 2026',
//     signupTime: 'at 10:45 AM',
//     status: 'Active',
//     credits: '1000.00'
//   },
//   {
//     name: 'Kavita Bairagi',
//     email: 'kavitabairagi@gmail.com',
//     signupDate: 'Oct 12, 2026',
//     signupTime: 'at 10:45 AM',
//     status: 'Active',
//     credits: '1000.00'
//   }
// ]
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
 
const formatTime = (dateStr) => {
  const d = new Date(dateStr)
  return `at ${d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`
}
</script>
