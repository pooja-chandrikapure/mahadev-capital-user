<template>
  <header class="w-full bg-white rounded-[14px] border-2 border-primary-border p-3 flex items-center justify-between">
    <!-- Left: Hamburger + Greeting -->
    <div class="flex items-center gap-2 sm:gap-3">
      <button v-if="showSidebar"
        class="md:hidden text-[#1a1a1a] p-1 -ml-1 hover:bg-gray-100 rounded-md transition-colors"
        @click="$emit('toggle-menu')">
        <Menu :size="20" :stroke-width="2.5" />
      </button>
      <h1 class="text-[14px] sm:text-[16px] font-bold text-[#1a1a1a] truncate">{{ greeting }}, {{
        profile?.name || '- -'
        }}!
      </h1>
    </div>

    <!-- Right: User Profile -->
    <div class="flex items-center gap-4 cursor-pointer group"
         >   <!--@click="router.push({ name: 'Profile' })"-->
       <button
          :disabled="isConnected"
          @click="handleConnect"
          :class="['flex items-center gap-2 px-1 py-1 rounded-lg text-[16px] font-semibold',
              isConnected
                  ? 'opacity-60 pointer-events-none border-2 border-dashed border-green-500 bg-green-500/10 text-green-600 cursor-not-allowed'
                  : 'border-2 border-dashed border-[#EF5A5A] bg-[#EF5A5A]/10 text-[#EF5A5A]']">
          <span>{{ isConnected ? 'Broker Connected' : 'Broker Not Connected' }}</span>
      </button>
      <ChevronDown :size="15" stroke-width="2.5" />

      <!-- Avatar -->
      <img :src="profile?.profile_picture_url" :alt="profile?.name"
        class="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-transparent group-hover:ring-[#004CBE40] transition-all duration-150" />

      <!-- Name & Role -->
      <div class="leading-tight hidden sm:block">
        <p class="text-[13px] font-semibold text-[#1a1a1a] capitalize">{{ profile?.name }}</p>
      </div>

      <!-- Chevron -->
      <ChevronDown :size="14" :stroke-width="2.5"
        class="text-primary-text opacity-40 group-hover:opacity-70 transition-opacity duration-150" 
        @click="router.push({ name: 'Profile'})"/>

    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown, Menu, StretchHorizontal } from 'lucide-vue-next'
import { useProfileStore } from '../../stores/profile'
import { storeToRefs } from 'pinia'
import { useBrokerStore } from '../../stores/broker'
import { useToastStore } from '../../stores/toast'
// import { profile, isConnected, broker } from '../../stores/profile'

defineEmits(['toggle-menu'])

const profileStore = useProfileStore();
const brokerStore = useBrokerStore();
const toastStore = useToastStore();
const { profile, isConnected, broker } = storeToRefs(profileStore)
const { brokers } = storeToRefs(brokerStore)
const route = useRoute()
const router = useRouter()
const showSidebar = computed(() => !route.meta.hideSidebar)

// ── Greeting based on time of day ───────────────────────────────────
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
})

// ── Get the user's own broker (first active one) ──
const userBroker = computed(() => broker.value || brokers.value?.[0] || null)

const handleConnect = async () => {
    const brokerData = userBroker.value;  // ✅ renamed
    if (!brokerData) { toastStore.warning('No broker found'); return; }
    if (brokerData.is_disabled) { toastStore.warning('User is disabled for this broker'); return; }

    if (brokerData.broker_name?.toLowerCase() === 'alice') {
        window.open(`https://ant.aliceblueonline.com/?appcode=${brokerData.broker_api}`, '_blank');
        return;
    }

    if (brokerData.broker_name?.toLowerCase() === 'dhan') {
        const loginUrl = await brokerStore.dhanConnect(brokerData.id);
        if (loginUrl) {
            window.open(loginUrl, '_blank');
        } else {
            toastStore.error('Failed to generate Dhan login URL');
        }
        return;
    }

    await brokerStore.connectBroker({ auth_token: null, appcode: brokerData.broker_api });
};

// ── User ─────────────────────────────────────────────────────────────
// const user = ref({
//   firstName: 'adarsh',
//   name: 'Nisith Pandya',
//   role: 'Admin Account',
//   avatar: 'https://i.pravatar.cc/150?img=47',
// })
</script>
