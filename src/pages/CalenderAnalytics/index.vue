<template>
  <div class="p-6 flex flex-col gap-4">
    <AnalyticsStatsCards />
    <CalendarView />
    <TradesSummaryTable />
  </div>
</template>

<script setup>
import AnalyticsStatsCards from '@/components/analytics/AnalyticsStatsCards.vue'
import CalendarView from '@/components/analytics/CalendarView.vue'
import TradesSummaryTable from '@/components/analytics/TradesSummaryTable.vue'
</script>
