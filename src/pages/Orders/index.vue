<template>
  <div class="p-6 flex flex-col gap-4">
    <OrderFilters />
    <OverallOrderTable />
  </div>
</template>

<script setup>
import OrderFilters from '@/components/order/OrderFilters.vue'
import OverallOrderTable from '@/components/order/OverallOrderTable.vue'
</script>
