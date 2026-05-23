<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <div class="grid grid-cols-3 gap-6">
      <div v-for="step in steps" :key="step.number">
        <p class="text-primary-text text-xs mb-1">[STEP {{ step.number }}]</p>
        <p class="text-primary-text font-semibold text-sm mb-2">{{ step.title }}</p>
        <p class="text-primary-text text-xs leading-relaxed">{{ step.description }}</p>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-primary-border">
      <button class="text-primary-blue text-sm font-medium hover:underline">
        View Detailed T&C &gt;&gt;
      </button>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    number: 1,
    title: 'Invite your network',
    description: "Share your link. When they profit, you earn 5% of their sharing fee."
  },
  {
    number: 2,
    title: 'Accumulate Credits',
    description: "Earnings are added to your 'Credit Vault' instantly upon their bill settlement."
  },
  {
    number: 3,
    title: 'Auto-Deduction',
    description: 'Credits are automatically deducted from your weekly profit sharing bill.'
  }
]
</script>
