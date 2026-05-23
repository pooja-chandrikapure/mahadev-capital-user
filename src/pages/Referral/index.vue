<template>
  <div class="p-6 flex flex-col gap-4">
    <ReferralStatsCards />
    <WeeklyBillingProjections />
    <ReferralSteps />
    <ReferralNetworkTable />
  </div>
</template>

<script setup>
import ReferralStatsCards from '@/components/referral/ReferralStatsCards.vue'
import WeeklyBillingProjections from '@/components/referral/WeeklyBillingProjections.vue'
import ReferralSteps from '@/components/referral/ReferralSteps.vue'
import ReferralNetworkTable from '@/components/referral/ReferralNetworkTable.vue'
</script>
