<template>
  <div class="flex flex-col gap-3 h-full overflow-y-auto pr-0.5 scrollable-content">

    <!-- ── Referral Leaderboard ─────────────────────────────── -->
    <div
      class="rounded-[20px] px-6 pt-10 pb-0 relative overflow-hidden shrink-0"
      style="background: linear-gradient(160deg, #232526 0%, #414345 100%)"
    >
      <!-- Title — cursive handwritten style -->
      <h2
        class="text-center text-white text-[24px] mb-20 tracking-wide"
        style="font-family: 'Brush Script MT', 'Segoe Script', cursive; top: 10px;"
      >
        Referral Leaderboard
      </h2>

      <!-- Podium row -->
      <div class="flex items-end justify-center gap-4">

        <!-- 2nd Place -->
        <div class="flex flex-col items-center">
          <img
            :src="leaderboard[1].avatar"
            class="w-[58px] h-[58px] rounded-full object-cover border-[3px] border-white mb-2 shadow-md"
          />
          <p class="text-white text-[12px] font-semibold text-center leading-tight">{{ leaderboard[1].name }}</p>
          <p class="text-white/55 text-[11px] text-center mb-3">{{ leaderboard[1].referrals }} Referral</p>
          <!-- Bar -->
          <div
            class="w-[90px] rounded-t-[14px] flex items-start justify-center pt-4"
            style="height:130px; background: linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%)"
          >
            <span class="text-[28px] font-bold number-font text-gray-600">2</span>
          </div>
        </div>

        <!-- 1st Place -->
        <div class="flex flex-col items-center" style="margin-bottom: 0">
          <div class="relative mb-2">
            <img
                src="@/assets/dashboard/crown.svg"
                alt="crown"
                class="absolute -top-15 left-1/2 -translate-x-1/2 w-18 h-18 z-10"
            />
            <img
                :src="leaderboard[0].avatar"
                class="relative w-[76px] h-[76px] rounded-full object-cover border-[3px] border-white shadow-lg"
            />
          </div>
          <p class="text-white text-[14px] font-semibold text-center leading-tight">{{ leaderboard[0].name }}</p>
          <p class="text-white/55 text-[11px] text-center mb-3">{{ leaderboard[0].referrals }} Referral</p>
          <!-- Bar -->
          <div
            class="w-[100px] rounded-t-[16px] flex items-start justify-center pt-5"
            style="height:180px; background: linear-gradient(180deg, #ffffff 0%, #cccccc 100%); line-height: 32px;"
          >
            <span class="text-[32px] number-font font-bold text-gray-700">1</span>
          </div>
        </div>

        <!-- 3rd Place -->
        <div class="flex flex-col items-center">
          <img
            :src="leaderboard[2].avatar"
            class="w-[58px] h-[58px] rounded-full object-cover border-[3px] border-white mb-2 shadow-md"
          />
          <p class="text-white text-[12px] font-semibold text-center leading-tight">{{ leaderboard[2].name }}</p>
          <p class="text-white/55 text-[11px] text-center mb-3">{{ leaderboard[2].referrals }} Referral</p>
          <!-- Bar -->
          <div
            class="w-[90px] rounded-t-[14px] flex items-start justify-center pt-4"
            style="height:120px; background: linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%)"
          >
            <span class="text-[28px] font-bold number-font text-gray-600">3</span>
          </div>
        </div>

      </div>
    </div>

    <!-- ── User Status ──────────────────────────────────────── -->
    <!-- <div class="bg-white rounded-[14px] border border-primary-border p-6 shrink-0">

     
      <div class="mb-1">
        <h2 class="text-[16px] font-bold text-[#1a1a1a]">User Status</h2>
        <p class="text-[12px] text-primary-text mt-0.5">Active Vs Restricted Users</p>
      </div>

      <div class="h-px bg-[#3935351A] my-4" />

      <div class="flex items-center justify-center my-6">
        <div class="relative  w-44 h-44">
          <Doughnut :data="donutData" :options="donutOptions" />
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span class="text-[11px] text-primary-text font-medium">Total Users</span>
            <span class="text-[22px] number-font font-bold text-[#1a1a1a] leading-tight">
              {{ totalUsers.toLocaleString('en-IN') }}
            </span>
          </div>
        </div>
      </div>

   
      <div class="flex flex-col gap-4 mt-2">
        <div v-for="stat in userStats" :key="stat.label" class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                class="w-3.5 h-3.5 rounded-[3px] shrink-0"
                :style="{ backgroundColor: stat.color }"
              />
              <span class="text-[13px] font-medium text-[#1a1a1a]">{{ stat.label }}</span>
            </div>
            <span class="text-[13px] font-semibold text-[#1a1a1a]">
              {{ stat.count.toLocaleString('en-IN') }}
            </span>
          </div>
          <div class="h-[5px] w-full bg-[#F0F0F5] rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              :style="{ width: `${(stat.count / totalUsers) * 100}%`, backgroundColor: stat.color }"
            />
          </div>
        </div>
      </div>

    </div> -->

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const leaderboard = [
  { name: 'Ketan Dewani', referrals: 123, avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Ketan Dewani', referrals: 98,  avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Ketan Dewani', referrals: 87,  avatar: 'https://i.pravatar.cc/150?img=33' },
]

const userStats = [
  { label: 'Active User',      count: 1902, color: '#004CBE' },
  { label: 'Restricted Users', count: 362,  color: '#D1D5DB' },
]

const totalUsers = computed(() => userStats.reduce((s, u) => s + u.count, 0))

const donutData = computed(() => ({
  labels: userStats.map(s => s.label),
  datasets: [{
    data            : userStats.map(s => s.count),
    backgroundColor : userStats.map(s => s.color),
    borderWidth     : 0,
    hoverOffset     : 4,
  }],
}))

const donutOptions = {
  responsive          : true,
  maintainAspectRatio : false,
  cutout              : '80%',
  plugins: {
    legend  : { display: false },
    tooltip : {
      backgroundColor : '#004CBE',
      titleColor      : '#fff',
      bodyColor       : '#fff',
      padding         : 10,
      cornerRadius    : 8,
      displayColors   : false,
    },
  },
}
</script>
