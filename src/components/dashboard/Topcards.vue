<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

    <!-- ── First 3 White Cards ── -->
    <div v-for="card in cards" :key="card.label"
      class="relative flex-1 bg-white rounded-xl p-4 shadow-sm min-w-0 overflow-hidden">
      <!-- Text Section -->
      <div class="flex flex-col gap-2 z-10 relative">
        <span class="text-sm text-gray-400">
          {{ card.label }}
        </span>

        <span class="text-2xl number-font font-bold text-gray-900">
          {{ card.value }}
        </span>
      </div>

      <img :src="card.icon" :alt="card.label" class="absolute right-0 bottom-2 w-18 h-18  pointer-events-none" />
    </div>

    <!-- ── 4th Dark Card (background image) ── -->
    <div class="flex-1 rounded-xl px-5 py-4 flex flex-col gap-3 min-w-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${bgImg})` }">
      <span class="text-sm text-white font-normal leading-none">
        Weekly Profit
      </span>
      <div class="flex items-center">
        <span class="text-2xl number-font font-bold text-white leading-none">
          ₹3,439.89
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
import groupsIcon from '@/assets/dashboard/groupsIcon.svg'
import usersIcon from '@/assets/dashboard/usersIcon.svg'
import personIcon from '@/assets/dashboard/person.svg'
import walletIcon from '@/assets/dashboard/wallet.svg'
import aumsIcon from '@/assets/dashboard/aumsIcon.svg'
import bgImg from '@/assets/dashboard/bgImg.png'
import { useUserStore } from '../../stores/users'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const userStore = useUserStore();
const { profitSummary } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.getProfitSummary()
})

setTimeout(async () => {
  await userStore.getProfitSummary()
}, 5000);

const cards = computed(() => [
  {
    label: 'Available Funds',
    value: '₹1,19,932.87',
    icon: walletIcon,
  },
  {
    label: 'Allocated Funds',
    value: '₹9,932.87',
    // value: profitSummary.value.total_active_clients,
    icon: personIcon,
  },
  // {
  //   label: "Total AUM's",
  //   value: '₹9,932.87',
  //   icon: aumsIcon,
  // },
])
</script>
