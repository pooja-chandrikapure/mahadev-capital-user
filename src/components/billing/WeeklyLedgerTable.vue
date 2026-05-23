<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-1">
      <div>
        <p class="text-primary-text font-semibold text-base">Weekly Ledger</p>
        <p class="text-primary-text text-xs">Distribution across all sharing group</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-primary-text/80 text-sm">Showing</span>
        <button class="flex items-center bg-table-header-background gap-2 border border-primary-border rounded-lg px-3 py-1.5 text-primary-text text-sm hover:text-primary-text transition-colors">
          <ArrowUpDown :size="14" />
          Sort By
          <ChevronDown :size="14" />
        </button>
        <span class="w-2 h-2 rounded-full bg-primary-blue"></span>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full mt-4">
      <thead>
        <tr class="border-b border-primary-border bg-table-header-background">
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">INVOICE</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">DATE RANGE</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">TOTAL PROFIT</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">GROSS (10%)</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">REFERRAL DEDUCATION</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">NET PAYABLE</th>
          <th class="text-left text-primary-text text-xs font-medium py-2 pb-3">STATUS</th>
          <th class="text-right text-primary-text text-xs font-medium py-2 pb-3">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <!-- Skeleton -->
        <template v-if="store.isLedgerLoading">
          <tr v-for="n in 5" :key="'skel-' + n" class="border-b border-primary-border last:border-0">
            <td class="py-2"><div class="h-3.5 w-28 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-3.5 w-32 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-3.5 w-20 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-3.5 w-16 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-3.5 w-20 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-3.5 w-20 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2"><div class="h-6 w-16 bg-white/10 rounded animate-pulse"></div></td>
            <td class="py-2 flex justify-end"><div class="h-7 w-20 bg-white/10 rounded animate-pulse"></div></td>
          </tr>
        </template>
        <!-- Data -->
        <template v-else>
          <tr
            v-for="(item, index) in store.ledger"
            :key="item.id || index"
            class="border-b border-primary-border last:border-0"
          >
            <!-- Invoice -->
            <td class="py-2">
              <p class="text-secondary-text text-sm font-medium">{{ item.invoice_number }}</p>
              <p class="text-secondary-text text-xs mt-0.5">{{ item.group_name }}</p>
            </td>
 
            <!-- Date Range -->
            <td class="py-2 text-secondary-text text-sm">
              {{ formatDate(item.period_start) }} - {{ formatDate(item.period_end) }}
            </td>
 
            <!-- Total Profit -->
            <td class="py-2">
              <span :class="item.total_profit >= 0 ? 'text-primary-green' : 'text-primary-red'" class="text-sm font-medium">
                {{ item.total_profit >= 0 ? '+' : '' }}{{ formatAmount(item.total_profit) }}
              </span>
            </td>
 
            <!-- Gross -->
            <td class="py-2 text-secondary-text text-sm">{{ formatAmount(item.gross_amount) }}</td>
 
            <!-- Referral Deduction -->
            <td class="py-2">
              <span class="text-primary-red text-sm font-medium">
                {{ item.referral_deduction > 0 ? '-' : '' }}{{ formatAmount(item.referral_deduction) }}
              </span>
            </td>
 
            <!-- Net Payable -->
            <td class="py-2">
              <span :class="item.net_payable >= 0 ? 'text-primary-green' : 'text-primary-red'" class="text-sm font-medium">
                {{ formatAmount(item.net_payable) }}
              </span>
            </td>
 
            <!-- Status -->
            <td class="py-2">
              <span :class="statusClass(item.status)" class="text-white text-xs font-medium px-3 py-1 rounded-md">
                {{ item.status }}
              </span>
            </td>
 
            <!-- Action -->
            <td class="py-2 text-right">
              <button
                v-if="item.status === 'PAID'"
                class="border border-primary-border text-secondary-text text-xs px-3 py-1 rounded-md hover:bg-white/5 transition-colors"
              >
                View Invoice
              </button> 
              <button
                v-else
                class="bg-primary-blue hover:bg-primary-blue text-white text-xs px-3 py-1 rounded-md transition-colors"
              >
                Pay Bill
              </button>
            </td>
          </tr>
 
          <!-- Empty -->
          <tr v-if="!store.ledger.length">
            <td colspan="8" class="py-10 text-center text-secondary-text text-sm">No ledger records found.</td>
          </tr>
        </template>
        <!-- <tr
          v-for="(ledger, index) in ledgers"
          :key="index"
          class="border-b border-primary-border last:border-0"
        >
          <td class="py-4 text-primary-text text-sm">{{ ledger.invoice }}</td>
          <td class="py-4 text-primary-text text-sm">{{ ledger.dateRange }}</td>
          <td class="py-4 text-primary-green text-sm font-medium">{{ ledger.totalProfit }}</td>
          <td class="py-4 text-primary-text text-sm">{{ ledger.gross }}</td>
          <td class="py-4 text-primary-red text-sm font-medium">{{ ledger.referralDeduction }}</td>
          <td class="py-4 text-primary-green text-sm font-medium">{{ ledger.netPayable }}</td>
          <td class="py-4">
            <span
              :class="ledger.status === 'PAID'
                ? 'bg-primary-green text-secondary-text'
                : 'bg-primary-red text-secondary-text'"
              class="text-xs font-medium px-3 py-1 rounded"
            >
              {{ ledger.status }}
            </span>
          </td>
          <td class="py-4 text-right">
            <button
              v-if="ledger.status === 'PAID'"
              class="bg-table-header-background border-1 border-dashed border-black text-primary-text text-xs font-bold px-3 py-1 rounded-full hover:bg-white/5 transition-colors"
            >
              View Invoice
            </button>
            <button
              v-else
              class="bg-primary-blue hover:bg-primary-blue text-secondary-text text-xs px-3 py-1 rounded-full transition-colors"
            >
              Pay Bill
            </button>
          </td>
        </tr> -->
      </tbody>
    </table>
    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 pt-4 border-t border-primary-border">
      <p class="text-secondary-text text-xs">
        Showing {{ rangeStart }}–{{ rangeEnd }} of {{ store.pagination.total }} records
      </p>
      <div class="flex items-center gap-1">
        <button
          @click="changePage(store.pagination.page - 1)"
          :disabled="!store.pagination.has_prev"
          class="flex items-center justify-center w-8 h-8 rounded-lg border border-primary-border text-secondary-text hover:text-secondary-text hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft :size="14" />
        </button>
 
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="page === store.pagination.page
            ? 'bg-primary-blue text-white border-blue-600'
            : 'text-secondary-text hover:text-secondary-text hover:bg-white/5 border-primary-border'"
          class="w-8 h-8 rounded-lg border text-xs font-medium transition-colors"
        >
          {{ page }}
        </button>
 
        <button
          @click="changePage(store.pagination.page + 1)"
          :disabled="!store.pagination.has_next"
          class="flex items-center justify-center w-8 h-8 rounded-lg border border-primary-border text-secondary-text hover:text-secondary-text hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowUpDown, ChevronDown ,  ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useBillingStore } from '../../stores/billing';

const store = useBillingStore()
 
const grossLabel = computed(() => {
  if (!store.ledger.length) return '10%'
  return `${store.ledger[0].profit_sharing_percent}%`
})
 
const changePage = (page) => {
  if (page < 1 || page > store.pagination.total_pages) return
  store.fetchLedger(page)
}
 
const statusClass = (status) => {
  const map = {
    PAID: 'bg-primary-green',
    PENDING: 'bg-primary-red',
    OVERDUE: 'bg-primary-red',
    CANCELLED: 'bg-gray-500',
  }
  return map[status] || 'bg-gray-500'
}
 
const formatDate = (dateStr) => {
  if (!dateStr) return '--'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
 
const formatAmount = (val) => {
  return Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
 
const rangeStart = computed(() => {
  const { page, per_page } = store.pagination
  return (page - 1) * per_page + 1
})
 
const rangeEnd = computed(() => {
  const { page, per_page, total } = store.pagination
  return Math.min(page * per_page, total)
})
 
const visiblePages = computed(() => {
  const { page, total_pages } = store.pagination
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(total_pages, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
</script>
