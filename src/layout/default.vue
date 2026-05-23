<template>
  <div class="h-screen bg-[#F0F0F5] relative flex overflow-hidden">

    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity backdrop-blur-sm"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <div 
      v-if="showSidebar" 
      :class="[
        'h-full z-50 transition-transform duration-300 md:translate-x-0',
        isMobileMenuOpen ? 'fixed left-0 top-0 bottom-0 py-2 pl-2 shadow-2xl' : 'hidden md:block py-2 pl-2'
      ]"
    >
      <NavigationBar class="h-full" @close="isMobileMenuOpen = false" />
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col p-2 gap-2 overflow-hidden w-full relative">

      <!-- Top Bar -->
      <TopBar @toggle-menu="isMobileMenuOpen = true" />

      <!-- Page Content -->
      <div class="flex-1 overflow-auto scrollable-content rounded-[14px]">
        <router-view />
      </div>

    </main>

  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '../stores/profile'
import NavigationBar from '@/components/layout/navigationBar.vue'
import TopBar from '@/components/layout/topBar.vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const showSidebar = computed(() => !route.meta.hideSidebar)
const isMobileMenuOpen = ref(false)
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore)

// Close mobile menu when navigating
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

onMounted(() => {
  profileStore.getProfile();
})
</script>
