<template>
  <SheetWelcome class="mb-5"/>
  <GridCards />
  <v-row>
    <v-col cols="12" sm="12" md="6">
      <LineChart />
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <ListAbsen />
    </v-col>
  </v-row>
  <TableUltah class="mt-5"/>
</template>

<script setup>
import GridCards from '@/components/dashboard/GridCards.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import ListAbsen from '@/components/dashboard/ListAbsen.vue';
import SheetWelcome from '@/components/dashboard/SheetWelcome.vue';
import TableUltah from '@/components/dashboard/TableUltah.vue';
</script>
