<template>
  <aside class="w-[260px] border-2 border-primary-border h-full bg-white flex flex-col rounded-lg">

    <!-- Logo -->
    <div
      class="flex items-center py-3 px-3 justify-center relative border-b border-primary-border md:border-none mb-2 md:mb-0">
      <img src="@/assets/logo.svg" alt="Mahadev Capital Logo"
        class="w-[180px] md:w-[220px] mx-auto h-[80px] md:h-[100px] rounded-[10px] object-contain shrink-0" />
      <!-- Mobile Close Button -->
      <!-- <button
          class="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          @click="$emit('close')"
        >
          <X :size="22" :stroke-width="2.5" />
        </button> -->
    </div>
    <!-- Nav Items -->
    <nav class="flex-1 px-3 flex flex-col gap-0.5 overflow-y-auto scrollable-content">
      <button v-for="item in navItems" :key="item.label" @click="navigate(item)" :class="[
        'flex items-center gap-3 px-[14px] py-[11px] rounded-[10px] w-full text-left transition-all duration-150 text-[14.5px]',
        activeItem === item.label
          ? 'bg-primary-blue text-white font-semibold'
          : 'text-primary-text font-bold hover:text-primary-blue',
      ]">
        <component :is="item.icon" :size="20" :stroke-width="2.3" />
        {{ item.label }}
      </button>
    </nav>

    <!-- Logout -->
    <div class="p-3 border-t border-primary-border">
      <button @click="handleLogout"
        class="flex items-center gap-3 px-[14px] py-[11px] rounded-[10px] w-full text-left text-[14.5px] text-primary-text font-normal transition-all duration-150 hover:bg-red-50 hover:text-red-500 group">
        <LogOut :size="20" :stroke-width="1.8"
          class="opacity-60 group-hover:opacity-100 transition-opacity duration-150" />
        Logout
      </button>
    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  FileText,
  PieChart,
  Handbag ,
  CandlestickChart,
  Settings,
  LogOut,
  X,
  ChartPie,
  CalendarDays,
} from 'lucide-vue-next'
import authToken from '../../common/authToken'

defineEmits(['close'])

const router = useRouter()
const route = useRoute()

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Referral', icon: Users, path: '/referral' },
  { label: 'Billing', icon: FileText , path: '/billing' },
  { label: 'Position', icon: ChartPie , path: '/position' },
  // { label: 'Pos', icon: PieChart, path: '/position' },
  { label: 'Orders', icon: Handbag, path: '/orders' },
  { label: 'Calender', icon: CalendarDays, path: '/calender-analytics' },
  // { label: 'Brokers', icon: CandlestickChart, path: '/brokers' },
  // { label: 'Settings', icon: Settings, path: '/settings' },
]

const activeItem = computed(() => {
  const currentPath = route.path.replace(/\/$/, '') || '/'
  const matched = navItems.find((item) => {
    if (item.path === '/') {
      return currentPath === '/'
    }
    return currentPath === item.path || currentPath.startsWith(item.path + '/')
  })
  return matched ? matched.label : 'Dashboard'
})

const navigate = (item) => {
  if (item.path) {
    router.push(item.path).catch(() => { })
  }
}

const handleLogout = () => {
  authToken.removeToken();
  router.push({ name: "login" });
}
</script>
