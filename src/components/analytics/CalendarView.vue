<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <!-- Month Navigator -->
      <div class="flex items-center gap-4">
        <button
          @click="prevMonth"
          :disabled="!canGoPrev"
          class="text-secondary-text hover:text-primary-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft :size="18" />
        </button>
        <p class="text-primary-text font-semibold text-base w-24 text-center">{{ currentMonthName }}</p>
        <button
          @click="nextMonth"
          :disabled="!canGoNext"
          class="text-secondary-text hover:text-primary-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight :size="18" />
        </button>
      </div>

      <!-- From / To Date Pickers -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <label class="text-secondary-text text-xs">From</label>
          <input
            type="date"
            v-model="fromDate"
            @change="onDateRangeChange"
            class="bg-card-background border border-primary-border rounded-lg px-3 py-1.5 text-primary-text text-xs focus:outline-none focus:border-primary-blue"
          />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-secondary-text text-xs">To</label>
          <input
            type="date"
            v-model="toDate"
            :min="fromDate"
            @change="onDateRangeChange"
            class="bg-card-background border border-primary-border rounded-lg px-3 py-1.5 text-primary-text text-xs focus:outline-none focus:border-primary-blue"
          />
        </div>
      </div>
    </div>

    <!-- Day Headers -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in weekDays"
        :key="day"
        class="rounded-lg bg-card-background border border-primary-border text-secondary-text text-xs font-medium text-center py-2"
      >
        {{ day }}
      </div>
    </div>

    <!-- Skeleton -->
    <template v-if="store.isLoading">
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="n in 35"
          :key="'skel-' + n"
          class="border border-primary-border rounded-lg min-h-[90px] animate-pulse bg-white/5"
        ></div>
      </div>
    </template>

    <!-- Calendar Grid -->
    <div v-else class="grid grid-cols-7 gap-1">
      <!-- Empty cells for offset -->
      <div
        v-for="n in firstDayOffset"
        :key="'empty-' + n"
        class="bg-table-header-background border border-primary-border rounded-lg min-h-[90px]"
      ></div>

      <!-- Day cells -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        :class="[
          activeDay === day
            ? 'bg-primary-green/10 border-2 border-primary-green'
            : 'bg-card-background border border-primary-border',
          !isDayInRange(day) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
        ]"
        class="rounded-lg min-h-[90px] p-2 transition-colors"
        @click="isDayInRange(day) && (activeDay = day)"
      >
        <p class="text-primary-text text-sm font-semibold mb-2">{{ String(day).padStart(2, '0') }}</p>

        <template v-if="getDayData(day)">
          <p
            :class="getDayData(day).total_profit >= 0 ? 'text-primary-green' : 'text-red-400'"
            class="text-xs font-medium"
          >
            {{ getDayData(day).total_profit >= 0 ? '+' : '' }}₹{{ formatAmount(getDayData(day).total_profit) }}
          </p>
          <p class="text-secondary-text text-xs mt-0.5">{{ getDayData(day).positions_count }} Orders</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useAnalyticsStore } from '../../stores/analytics'

const store = useAnalyticsStore()

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const activeDay = ref(null)
const currentDate = ref(new Date())

// Default: current month full range
const today = new Date()
const fromDate = ref(formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1)))
const toDate = ref(formatDateInput(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

// ── Computed ──────────────────────────────────────────────
const currentMonthName = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long' })
)

const daysInMonth = computed(() => {
  const y = currentDate.value.getFullYear()
  const m = currentDate.value.getMonth()
  return new Date(y, m + 1, 0).getDate()
})

const firstDayOffset = computed(() => {
  const y = currentDate.value.getFullYear()
  const m = currentDate.value.getMonth()
  return new Date(y, m, 1).getDay()
})

const canGoPrev = computed(() => {
  if (!fromDate.value) return true
  const from = new Date(fromDate.value)
  return (
    currentDate.value.getFullYear() > from.getFullYear() ||
    (currentDate.value.getFullYear() === from.getFullYear() &&
      currentDate.value.getMonth() > from.getMonth())
  )
})

const canGoNext = computed(() => {
  if (!toDate.value) return true
  const to = new Date(toDate.value)
  return (
    currentDate.value.getFullYear() < to.getFullYear() ||
    (currentDate.value.getFullYear() === to.getFullYear() &&
      currentDate.value.getMonth() < to.getMonth())
  )
})

// ── Helpers ───────────────────────────────────────────────
function formatDateInput(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const fetchCurrentMonth = () => {
  if (!fromDate.value || !toDate.value) return
  store.fetchPnlSummary({
    from_date: fromDate.value,
    to_date: toDate.value
  })
}

const onDateRangeChange = () => {
  if (!fromDate.value || !toDate.value) return
  currentDate.value = new Date(fromDate.value)
  activeDay.value = null
  fetchCurrentMonth()
}

const prevMonth = () => {
  if (!canGoPrev.value) return
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() - 1)
  currentDate.value = d
  activeDay.value = null
}

const nextMonth = () => {
  if (!canGoNext.value) return
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + 1)
  currentDate.value = d
  activeDay.value = null
}

// Flat key: data["2026-05-13"]
const getDayData = (day) => {
  const y = currentDate.value.getFullYear()
  const m = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  const key = `${y}-${m}-${d}`
  return store.pnlData?.[key] || null
}

const isDayInRange = (day) => {
  if (!fromDate.value || !toDate.value) return true
  const y = currentDate.value.getFullYear()
  const m = currentDate.value.getMonth()
  const date = new Date(y, m, day)
  return date >= new Date(fromDate.value) && date <= new Date(toDate.value)
}

const formatAmount = (val) => {
  return Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Initial fetch
fetchCurrentMonth()
</script>