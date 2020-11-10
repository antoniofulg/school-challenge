<template>
  <v-card class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Listagem de alunos
        </v-col>
        <v-col cols="12" md="auto">
          <v-row justify="space-between">
            <v-col class="py-0">
              <v-btn @click="dialog = true" color="success">
                Gerar alunos
              </v-btn>
            </v-col>
            <v-col class="text-right py-0">
              <v-btn :to="{ name: 'Dashboard' }" color="primary">
                Ver gráficos
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <label for="student-filter">Aluno</label>
          <v-text-field
            id="student-filter"
            label="Nome do aluno"
            v-model="nameFilter"
            prepend-inner-icon="fas fa-search"
            solo
            flat
            clearable
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="degree-filter">Série</label>
          <v-select
            id="degree-filter"
            solo
            flat
            v-model="degreeFilter"
            item-value="id"
            item-text="name"
            :items="degrees"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="3">
          <label for="class-filter">Turma</label>
          <v-select
            id="class-filter"
            solo
            flat
            v-model="classFilter"
            item-value="id"
            item-text="name"
            :items="classes"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table :loading="loading" :headers="headers" :items="items">
            <template v-slot:item.action="{ item }">
              <v-btn
                text
                color="primary"
                :to="{ name: 'StudentUpdate', params: { id: item.id } }"
              >
                Editar
              </v-btn>
            </template>
          </v-data-table>
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
const headers = [
  { text: 'Matrícula', sortable: true, value: 'ra' },
  { text: 'Nome', sortable: true, value: 'name' },
  { text: 'Série', sortable: true, value: 'degree.name' },
  { text: 'Turma', sortable: true, value: 'class.name' },
  { text: 'Ação', sortable: false, value: 'action' },
]

import StudentsService from '@/services/students'
import ClassesService from '@/services/classes'
import DegreesService from '@/services/degrees'
import ConfirmMessage from '@/components/ConfirmMessage'
import SuccessMessage from '@/components/SuccessMessage'

export default {
  name: 'StudentsIndex',
  components: {
    ConfirmMessage,
    SuccessMessage,
  },
  data: () => ({
    loading: false,
    dialog: false,
    dialogMessage: false,
    message: '',
    classes: [],
    classFilter: '',
    degrees: [],
    degreeFilter: '',
    headers,
    items: [],
    nameFilter: '',
  }),
  watch: {
    classFilter() {
      this.getItems()
    },
    degreeFilter() {
      this.getItems()
    },
    nameFilter() {
      this.getItems()
    },
  },
  async mounted() {
    await this.setupComplementalData()
    this.getQueryParams()
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
        const params = {
          name: this.nameFilter,
          degreeId: this.degreeFilter,
          classId: this.classFilter,
        }
        const { data } = await StudentsService.index(params)
        this.items = data.students
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    getQueryParams() {
      const { degreeId } = this.$route.query
      if (degreeId) this.degreeFilter = degreeId
    },
    async setupComplementalData() {
      try {
        this.loading = true
        this.classes = [
          { id: '', name: 'Todas' },
          ...(await ClassesService.index()).data.classes,
        ]
        this.degrees = [
          { id: '', name: 'Todas' },
          ...(await DegreesService.index()).data.degrees,
        ]
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>
