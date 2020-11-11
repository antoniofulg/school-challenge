<template>
  <v-card>
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Dashboard
        </v-col>
        <v-col cols="12" md="auto">
          <v-btn @click="dialog = true" color="success">
            Gerar alunos
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12">
          <students-per-degree :series="series" :total="studentsTotal" />
        </v-col>
      </v-row>
    </v-card-text>
    <confirm-message
      :dialog="dialog"
      title="Deseja gerar 300 novos estudantes?"
      message="Serão gerados 300 estudantes com dados aleatórios"
      @confirm="generateStudents"
      @cancel="dialog = false"
    />
    <success-message
      :dialog="dialogMessage"
      :title="message"
      @confirm="
        dialogMessage = false
        getItems()
      "
    />
  </v-card>
</template>

<script>
import StudentsPerDegree from '@/components/StudentsPerDegree'
import ConfirmMessage from '@/components/ConfirmMessage'
import SuccessMessage from '@/components/SuccessMessage'
import StudentsService from '@/services/students'
import DegreesService from '@/services/degrees'

export default {
  name: 'DashboardIndex',
  components: {
    StudentsPerDegree,
    ConfirmMessage,
    SuccessMessage,
  },
  data: () => ({
    dialog: false,
    dialogMessage: false,
    message: '',
    series: [],
  }),
  computed: {
    studentsTotal() {
      let total = 0
      this.series.map(serie => {
        total += serie.data[0]
      })
      return total
    },
  },
  mounted() {
    this.getItems()
  },
  methods: {
    async generateStudents() {
      try {
        this.loading = true
        const { data } = await StudentsService.generate()
        this.message = data.message
        this.dialog = false
        this.dialogMessage = true
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async getItems() {
      try {
        this.loading = true
        this.series = (await DegreesService.students()).data.degrees
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>
