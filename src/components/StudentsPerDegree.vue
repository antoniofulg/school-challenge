<template>
  <v-card :loading="loading">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Alunos por série
        </v-col>
        <v-col cols="auto"> Total de alunos: {{ total }} </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <vue-apex-charts
        width="100%"
        height="300"
        type="bar"
        :options="options"
        :series="series"
      ></vue-apex-charts>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

const colors = [
  '#269FFB',
  '#26E7A5',
  '#FEBB3B',
  '#FF6077',
  '#8B75D7',
  '#6D838D',
  '#46B3A9',
  '#D730EB',
  '#26E7A5',
  '#5EBB35',
  '#0066B3',
  '#CFF333',
  '#888888',
]

export default {
  name: 'StudentsPerDegree',
  props: {
    series: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  components: {
    VueApexCharts,
  },
  data: () => ({
    loading: false,
    colors,
  }),
  computed: {
    options() {
      return {
        colors: this.colors,
        xaxis: {
          categories: ['Alunos por série'],
          labels: {
            style: {
              fontSize: '20px',
            },
          },
        },
      }
    },
  },
}
</script>
