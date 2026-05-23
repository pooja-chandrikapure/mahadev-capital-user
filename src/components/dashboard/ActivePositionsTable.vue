<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-1">
      <div>
        <p class="text-primary-text font-semibold text-base">Active Positions</p>
        <p class="text-secondary-text text-xs">Distribution across all sharing group</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-secondary-text text-sm">Showing</span>
        <button class="flex items-center gap-2 bg-table-header-background border border-primary-border rounded-lg px-3 py-1.5 text-secondary-text text-sm hover:text-primary-text transition-colors">
          <ArrowUpDown :size="14" />
          Sort By
          <ChevronDown :size="14" />
        </button>
        <span class="w-2 h-2 rounded-full bg-primary-blue"></span>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full mt-4">
      <thead>
        <tr class="border-b border-primary-border bg-table-header-background">
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">TRADING SYMBOL/SCRIPT</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">ENTRY/ EXIT</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">Qty</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">Side</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">PNL</th>
          <th class="text-right text-secondary-text text-xs font-medium py-2 pb-3">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(position, index) in positions"
          :key="index"
          :class="position.dimmed ? 'opacity-40' : ''"
          class="border-b border-primary-border last:border-0"
        >
          <!-- Symbol -->
          <td class="py-4">
            <div class="flex items-center gap-2">
              <p class="text-primary-text text-sm font-semibold">{{ position.symbol }}</p>
              <span class="bg-table-header-background text-secondary-text text-xs border border-primary-border px-1.5 py-0.5 rounded">{{ position.exchange }}</span>
            </div>
            <p class="text-secondary-text text-xs mt-0.5">{{ position.type }}</p>
          </td>

          <!-- Entry/Exit -->
          <td class="py-4">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-primary-green text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded">B</span>
              <span class="text-primary-text text-sm">{{ position.entry }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-primary-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded">S</span>
              <span class="text-secondary-text text-sm">{{ position.exit }}</span>
            </div>
          </td>

          <!-- Qty -->
          <td class="py-4 text-primary-text text-sm">{{ position.qty }}</td>

          <!-- Side -->
          <td class="py-4 text-primary-text text-sm">{{ position.side }}</td>

          <!-- PNL -->
          <td class="py-4">
            <span
              :class="position.pnl.startsWith('+') ? 'text-primary-green' : 'text-primary-red'"
              class="text-sm font-semibold"
            >
              {{ position.pnl }}
            </span>
          </td>

          <!-- Actions -->
          <td class="py-4 text-right">
            <button class="border-2 border-black font-semibold text-primary-text text-xs px-4 py-1.5 rounded-lg hover:bg-table-header-background transition-colors">
              Sq.Off
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

const positions = [
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    entry: '920.7 at 01:27 PM',
    exit: '--',
    qty: 65,
    side: 'Buy',
    pnl: '+9,932.87',
    dimmed: false
  },
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    entry: '920.7 at 01:27 PM',
    exit: '--',
    qty: 65,
    side: 'Buy',
    pnl: '+9,932.87',
    dimmed: true
  }
]
</script>
