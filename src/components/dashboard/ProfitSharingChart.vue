<template>
  <div class="bg-white rounded-[14px] border border-primary-border p-6">

    <!-- Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h2 class="text-[15px] font-bold">Weekly Profit Sharing</h2>
        <p class="text-[12px] text-primary-text/50 mt-0.5">Distribution across all sharing group</p>
      </div>

      <!-- Period Tabs -->
      <div class="flex items-center gap-1 bg-[#F0F4FF] rounded-[10px] p-1">
        <button
          v-for="period in periods"
          :key="period"
          @click="activePeriod = period"
          :class="[
            'px-4 py-1.5 rounded-[8px] text-[12px] font-medium transition-all duration-150',
            activePeriod === period
              ? 'bg-primary-blue text-white shadow-sm'
              : 'text-primary-text/60 hover:text-primary-text',
          ]"
        >
          {{ period }}
        </button>
      </div>
    </div>

    <!-- Profit Value -->
    <div class="mb-4">
      <span class="text-[22px] number-font font-bold text-primary-green">+₹{{ currentTotal }}</span>
    </div>

    <!-- Chart -->
    <div class="relative h-[260px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

// ── Period tabs ──────────────────────────────────────────────────────
const periods = ['Weekly', 'Monthly', 'Yearly']
const activePeriod = ref('Weekly')

// ── Dataset per period ───────────────────────────────────────────────
const datasets = {
  Weekly: {
    labels : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    data   : [1200, 1800, 2400, 5800, 7200, 8500, 9932],
    total  : '9,932.87',
  },
  Monthly: {
    labels : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data   : [18000, 32000, 47000, 61000],
    total  : '61,000.00',
  },
  Yearly: {
    labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data   : [42000, 58000, 71000, 65000, 88000, 95000, 102000, 98000, 115000, 121000, 134000, 148000],
    total  : '1,48,000.00',
  },
}

const currentTotal = computed(() => datasets[activePeriod.value].total)

// ── Chart data ───────────────────────────────────────────────────────
const chartData = computed(() => {
  const { labels, data } = datasets[activePeriod.value]
  return {
    labels,
    datasets: [
      {
        data,
        fill          : true,
        tension       : 0.45,
        borderColor   : '#004CBE',
        borderWidth   : 2.5,
        pointRadius   : (ctx) => {
          // show dot only on the second-to-last point (like screenshot)
          const last = ctx.dataset.data.length - 2
          return ctx.dataIndex === last ? 6 : 0
        },
        pointHoverRadius     : 7,
        pointBackgroundColor : '#004CBE',
        pointBorderColor     : '#fff',
        pointBorderWidth     : 2,
        backgroundColor      : (ctx) => {
          const chart = ctx.chart
          const { ctx: canvas, chartArea } = chart
          if (!chartArea) return 'transparent'
          const gradient = canvas.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(0, 76, 190, 0.18)')
          gradient.addColorStop(1, 'rgba(0, 76, 190, 0)')
          return gradient
        },
      },
    ],
  }
})

// ── Chart options ────────────────────────────────────────────────────
const chartOptions = {
  responsive          : true,
  maintainAspectRatio : false,
  interaction: {
    mode      : 'index',
    intersect : false,
  },
  plugins: {
    legend : { display: false },
    tooltip: {
      backgroundColor  : '#004CBE',
      titleColor       : '#fff',
      bodyColor        : '#fff',
      padding          : 10,
      cornerRadius     : 8,
      displayColors    : false,
      callbacks: {
        label: (ctx) => `₹${ctx.parsed.y.toLocaleString('en-IN')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color    : '#39353580',
        font     : { size: 11, weight: '500' },
        padding  : 10,
      },
    },
    y: {
      display : false,
      grid    : { display: false },
    },
  },
}
</script>
