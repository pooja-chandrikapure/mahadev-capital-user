<template>
  <div class="flex flex-col gap-3 xl:h-full">

    <!-- Top Cards -->
    <TopCards />

    <!-- Bottom Section -->
    <div class=" flex flex-col gap-4">
      <!-- Top: Profit Sharing + Net Payable -->
      <WeeklyProfitSharingCard />
  
      <!-- Middle: Chart + Leaderboard -->
      <div class="grid grid-cols-2 gap-4">
        <ProfitSharingChart />
        <ReferralLeaderboard />
      </div>
  
      <!-- Bottom: Active Positions -->
      <ActivePositionsTable />
    </div>

  </div>
</template>

<script setup>
import TopCards         from '@/components/dashboard/Topcards.vue'
import WeeklyProfitChart from '@/components/dashboard/Weeklyprofitchart.vue'
import UserInfoCards    from '@/components/dashboard/Userinfocards.vue'
import WeeklyProfitSharingCard from '../../components/dashboard/WeeklyProfitSharingCard.vue';
import ProfitSharingChart from '../../components/dashboard/ProfitSharingChart.vue';
import ReferralLeaderboard from '../../components/dashboard/ReferralLeaderboard.vue';
import ActivePositionsTable from '../../components/dashboard/ActivePositionsTable.vue';
</script>
