<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <div class="flex items-end gap-6">
      <!-- Date Range -->
      <div>
        <p class="text-primary-text text-xs font-medium uppercase mb-2">Date Range</p>
        <div class="flex items-center gap-2">
          <div class="flex bg-table-header-background items-center gap-2 border border-primary-border rounded-lg px-3 py-2 cursor-pointer hover:border-white/30 transition-colors">
            <Calendar :size="14" class="text-primary-text" />
            <span class="text-primary-text text-sm">Oct 23, 2025</span>
          </div>
          <div class="flex bg-table-header-background items-center gap-2 border border-primary-border rounded-lg px-3 py-2 cursor-pointer hover:border-white/30 transition-colors">
            <Calendar :size="14" class="text-primary-text" />
            <span class="text-primary-text text-sm">Oct 23, 2025</span>
          </div>
        </div>
      </div>

      <!-- Broker -->
      <div>
        <p class="text-primary-text text-xs font-medium uppercase mb-2">Broker</p>
        <div class="relative">
          <select
            v-model="selectedBroker"
            class="appearance-none bg-table-header-background border border-primary-border rounded-lg px-4 py-2 pr-8 text-primary-text text-sm cursor-pointer focus:outline-none hover:border-white/30 transition-colors"
          >
            <option value="all">All broker</option>
            <option value="zerodha">Zerodha</option>
            <option value="angelone">Angel One</option>
          </select>
          <ChevronDown :size="14" class="text-primary-text absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <!-- Status -->
      <div>
        <p class="text-primary-text text-xs font-medium uppercase mb-2">Status</p>
        <div class="relative">
          <select
            v-model="selectedStatus"
            class="appearance-none bg-table-header-background border border-primary-border rounded-lg px-4 py-2 pr-8 text-primary-text text-sm cursor-pointer focus:outline-none hover:border-white/30 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown :size="14" class="text-primary-text absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, ChevronDown } from 'lucide-vue-next'

const selectedBroker = ref('all')
const selectedStatus = ref('all')
</script>
