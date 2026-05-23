<template>
  <div class="p-6 flex flex-col gap-4">
    <PositionFilters />
    <OverallPositionTable />
  </div>
</template>

<script setup>
import PositionFilters from '@/components/position/PositionFilters.vue'
import OverallPositionTable from '@/components/position/OverallPositionTable.vue'
</script>
