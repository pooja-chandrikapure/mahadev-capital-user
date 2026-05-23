<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-1">
      <div>
        <p class="text-secondary-text font-semibold text-base">Overall Position</p>
        <p class="text-secondary-text text-xs">Distribution across all sharing group</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-secondary-text text-sm">Showing</span>
        <div class="relative">
          <button
            @click="toggleStatusDropdown"
            class="flex items-center gap-2 border border-primary-border rounded-lg px-3 py-1.5 text-secondary-text text-sm hover:text-secondary-text transition-colors"
          >
            <ArrowUpDown :size="14" />
            {{ selectedStatus || 'All Status' }}
            <ChevronDown :size="14" />
          </button>
          <div
            v-if="isStatusDropdownOpen"
            class="absolute right-0 top-10 z-20 bg-card-background border border-primary-border rounded-lg shadow-lg py-1 min-w-[140px]"
          >
            <button
              @click="setStatusFilter(null)"
              :class="!selectedStatus ? 'bg-white/10' : ''"
              class="w-full text-left text-secondary-text text-sm px-4 py-2 hover:bg-white/5 transition-colors"
            >
              All Status
            </button>
            <button
              v-for="status in statusOptions"
              :key="status"
              @click="setStatusFilter(status)"
              :class="selectedStatus === status ? 'bg-white/10' : ''"
              class="w-full text-left text-secondary-text text-sm px-4 py-2 hover:bg-white/5 transition-colors capitalize"
            >
              {{ status }}
            </button>
          </div>
        </div>
        <!-- <span class="w-2 h-2 rounded-full bg-primary-blue"></span> -->
      </div>
    </div>

    <!-- Table -->
    <table class="w-full mt-4">
      <thead>
        <tr class="border-b border-primary-border">
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">TRADING SYMBOL/SCRIPT</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">ENTRY/ EXIT</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">Qty</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">Side</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">STATUS</th>
          <th class="text-right text-secondary-text text-xs font-medium py-2 pb-3">ACTIONS</th>
        </tr>
      </thead>
      <tbody>

        <!-- Skeleton -->
        <template v-if="store.isLoading">
          <tr v-for="n in 5" :key="'skel-' + n" class="border-b border-primary-border last:border-0">
            <td class="py-4">
              <div class="h-3.5 w-44 bg-black/20 rounded animate-pulse mb-1"></div>
              <div class="h-2.5 w-10 bg-black/20 rounded animate-pulse"></div>
            </td>
            <td class="py-4">
              <div class="h-3.5 w-32 bg-black/20 rounded animate-pulse mb-2"></div>
              <div class="h-3.5 w-10 bg-black/20 rounded animate-pulse"></div>
            </td>
            <td class="py-4"><div class="h-3.5 w-10 bg-black/20 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="h-3.5 w-10 bg-black/20 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="h-6 w-20 bg-black/20 rounded animate-pulse"></div></td>
            <td class="py-4 flex justify-end"><div class="h-6 w-16 bg-black/20 rounded animate-pulse"></div></td>
          </tr>
        </template>

        <!-- Data -->
        <template v-else>
          <tr
            v-for="(order, index) in filteredOrders"
            :key="order.id || index"
            class="border-b border-primary-border last:border-0"
          >
            <!-- Symbol -->
            <td class="py-2">
              <div class="flex items-center gap-2">
                <p class="text-secondary-text text-sm font-semibold">{{ order.tradingsymbol }}</p>
                <span class="text-secondary-text bg-table-header-background text-xs border border-primary-border px-1.5 py-0.5 rounded">{{ order.exchange }}</span>
              </div>
              <p class="text-secondary-text text-xs mt-0.5">{{ order.product }}</p>
            </td>

            <!-- Entry / Exit -->
            <td class="py-2">
              <div class="flex items-center gap-2 mb-1">
                <span class="bg-primary-green text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded">B</span>
                <span class="text-secondary-text text-sm">{{ order.average_price > 0 ? order.average_price : '--' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-primary-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded">S</span>
                <span class="text-secondary-text text-sm">{{ order.trigger_price > 0 ? order.trigger_price : '--' }}</span>
              </div>
            </td>

            <!-- Qty -->
            <td class="py-2 text-secondary-text text-sm">{{ order.quantity }}</td>

            <!-- Side -->
            <td class="py-2 text-primary-green font-semibold text-sm">{{ order.transaction_type }}</td>

            <!-- Status -->
            <td class="py-2">
              <span :class="statusClass(order.status)" class="text-white text-xs font-medium px-3 py-1 rounded">
                {{ order.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="py-2 text-right relative">
              <button
                @click="toggleMenu(order.id)"
                class="text-secondary-text hover:text-secondary-text transition-colors p-1 rounded hover:bg-white/5"
              >
                <MoreVertical :size="18" />
              </button>
              <div
                v-if="openMenu === order.id"
                class="absolute right-0 top-8 z-10 bg-card-background border border-primary-border rounded-lg shadow-lg py-1 min-w-[140px]"
              >
                <button class="w-full text-left text-secondary-text text-sm px-4 py-2 hover:bg-white/5 transition-colors">View Details</button>
                <button class="w-full text-left text-secondary-text text-sm px-4 py-2 hover:bg-white/5 transition-colors">Cancel Order</button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="!filteredOrders.length">
            <td colspan="6" class="py-10 text-center text-secondary-text text-sm">No orders found.</td>
          </tr>
        </template>

      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-3 pt-4 border-t border-primary-border">
      <p class="text-secondary-text text-xs">
        Showing {{ rangeStart }}–{{ rangeEnd }} of {{ store.pagination.total }} orders
      </p>
      <div class="flex items-center gap-1">
        <!-- Prev -->
        <button
          @click="changePage(store.pagination.page - 1)"
          :disabled="!store.pagination.has_prev"
          class="flex items-center justify-center w-8 h-8 rounded-lg border border-primary-border text-secondary-text hover:text-secondary-text hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft :size="14" />
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="page === store.pagination.page
            ? 'bg-primary-blue text-white border-blue-600'
            : 'text-secondary-text hover:text-sedcondary-text hover:bg-white/5 border-primary-border'"
          class="w-8 h-8 rounded-lg border text-xs font-medium transition-colors"
        >
          {{ page }}
        </button>

        <!-- Next -->
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
import { ref, computed } from 'vue'
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-vue-next'
import { useOrderStore } from '../../stores/order'

const store = useOrderStore()
const openMenu = ref(null)
const isStatusDropdownOpen = ref(false)
const selectedStatus = ref(null)
const statusOptions = ['pending', 'rejected', 'complete', 'error', 'cancelled']

const toggleStatusDropdown = () => {
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value
}

const setStatusFilter = (status) => {
  selectedStatus.value = status
  isStatusDropdownOpen.value = false
}

const filteredOrders = computed(() => {
  if (!selectedStatus.value) return store.orders
  return store.orders.filter(order =>
    order.status.toLowerCase() === selectedStatus.value.toLowerCase()
  )
})

const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id
}

const statusClass = (status) => {
  const map = {
    COMPLETE: 'bg-green-600',
    PENDING: 'bg-yellow-600',
    CANCELLED: 'bg-primary-red',
    REJECTED: 'bg-primary-red',
  }
  return map[status] || 'bg-gray-500'
}

const changePage = (page) => {
  if (page < 1 || page > store.pagination.total_pages) return
  store.fetchOrders(page)
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
