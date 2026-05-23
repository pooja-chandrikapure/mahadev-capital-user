<template>
  <div class="bg-card-background border border-primary-border rounded-xl p-5">
    <p class="text-primary-text font-semibold text-base mb-4">Trades Summary</p>

    <table class="w-full">
      <thead>
        <tr class="border-b border-primary-border bg-table-header-background">
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">TRADING SYMBOL/SCRIPT</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">AVG BUY/SELL</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">Qty</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">LTP</th>
          <th class="text-left text-secondary-text text-xs font-medium py-2 pb-3">STATUS</th>
          <th class="text-right text-secondary-text text-xs font-medium py-2 pb-3">PNL</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(trade, index) in trades"
          :key="index"
          class="border-b border-primary-border last:border-0"
        >
          <!-- Symbol -->
          <td class="py-4">
            <div class="flex items-center gap-2">
              <p class="text-primary-text text-sm font-semibold">{{ trade.symbol }}</p>
              <span class="bg-table-header-background text-secondary-text text-xs border border-primary-border px-1.5 py-0.5 rounded">{{ trade.exchange }}</span>
            </div>
            <p class="text-secondary-text text-xs mt-0.5">{{ trade.type }}</p>
          </td>

          <!-- Avg Buy/Sell -->
          <td class="py-4">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-primary-green text-white text-primary-text text-xs font-bold w-5 h-5 flex items-center justify-center rounded">B</span>
              <span class="text-primary-text text-sm">{{ trade.avgBuy }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-primary-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded">S</span>
              <span class="text-secondary-text text-sm">{{ trade.avgSell }}</span>
            </div>
          </td>

          <!-- Qty -->
          <td class="py-4 text-primary-text text-sm">{{ trade.qty }}</td>

          <!-- LTP -->
          <td class="py-4 text-primary-text text-sm">{{ trade.ltp }}</td>

          <!-- Status -->
          <td class="py-4">
            <span class="bg-primary-red text-white text-xs font-medium px-3 py-1 rounded">
              {{ trade.status }}
            </span>
          </td>

          <!-- PNL -->
          <td class="py-4 text-right">
            <span
              :class="trade.pnl.startsWith('+') ? 'text-primary-green' : 'text-red-400'"
              class="text-sm font-semibold"
            >
              {{ trade.pnl }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const trades = [
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    avgBuy: '920.7 at 01:27 PM',
    avgSell: '--',
    qty: 65,
    ltp: 'Buy',
    status: 'Closed',
    pnl: '+9,932.87'
  },
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    avgBuy: '920.7 at 01:27 PM',
    avgSell: '--',
    qty: 65,
    ltp: 'Buy',
    status: 'Closed',
    pnl: '+9,932.87'
  },
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    avgBuy: '920.7 at 01:27 PM',
    avgSell: '--',
    qty: 65,
    ltp: 'Buy',
    status: 'Closed',
    pnl: '+9,932.87'
  },
  {
    symbol: 'BANKNIFTY26MAR54600PE',
    exchange: 'NFO',
    type: 'MIS',
    avgBuy: '920.7 at 01:27 PM',
    avgSell: '--',
    qty: 65,
    ltp: 'Buy',
    status: 'Closed',
    pnl: '+9,932.87'
  }
]
</script>
