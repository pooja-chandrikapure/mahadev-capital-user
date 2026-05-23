<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-4">
    <p class="text-primary-text font-semibold text-base mb-2">Weekly Billing Projections</p>

    <!-- Date Range -->
    <div class="flex items-center gap-2 mb-0">
      <div class="flex items-center gap-2 border border-primary-border rounded-lg px-3 py-2 bg-table-header-background">
        <Calendar :size="14" class="text-secondary-text" />
        <span class="text-primary-text text-sm">Oct 23, 2025</span>
      </div>
      <div class="flex items-center gap-2 border border-primary-border rounded-lg px-3 py-2 bg-table-header-background">
        <Calendar :size="14" class="text-secondary-text" />
        <span class="text-primary-text text-sm">Oct 23, 2025</span>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="flex items-center gap-6">
      <!-- Left: Gross + Referral -->
      <div class="flex flex-1 items-start gap-10">
        <!-- Gross Sharing -->
        <div class="flex flex-col gap-1">
          <p class="text-secondary-text text-sm leading-tight">Gross Sharing (10% of 3432.89)</p>
          <p class="text-primary-green text-2xl font-bold tracking-tight">₹343.00</p>
        </div>

        <!-- Referral Deduction -->
        <div class="flex flex-col gap-1">
          <p class="text-secondary-text text-sm leading-tight">Reffrel Deduction</p>
          <p class="text- text-primary-red xl font-bold tracking-tight">-₹343.00</p>
        </div>
      </div>

      <!-- Right: Net Payable Box -->
      <div class="border-2 border-primary-blue rounded-xl px-5 py-4 min-w-[190px] flex flex-col items-center gap-3">
        <div class="flex flex-col items-center gap-1">
          <p class="text-secondary-text text-sm leading-tight">Net Payable Amount</p>
          <p class="text-primary-green text-2xl font-bold tracking-tight">₹343.00</p>
        </div>
        <button
          class="w-full bg-primary-blue hover:opacity-90 active:opacity-80 text-white text-sm font-semibold py-2.5 rounded-lg transition-opacity"
        >
          Settle Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next'
</script>
