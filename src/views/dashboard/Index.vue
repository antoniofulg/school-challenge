<template>
  <v-card>
    <v-card-title>
      <v-row justify="space-between">
        <v-col>
          Dashboard
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12">
          <students-per-degree />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import StudentsPerDegree from '@/components/StudentsPerDegree'

export default {
  name: 'DashboardIndex',
  components: {
    StudentsPerDegree,
  },
  data: () => ({}),
}
</script>
