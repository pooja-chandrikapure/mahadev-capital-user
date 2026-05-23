<template>
  <div class="p-6 flex flex-col gap-4">
    <BillingStatsCards />
    <WeeklyLedgerTable />
  </div>
</template>

<script setup>
import BillingStatsCards from '@/components/billing/BillingStatsCards.vue'
import WeeklyLedgerTable from '@/components/billing/WeeklyLedgerTable.vue'
</script>
