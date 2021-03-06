<template>
  <v-card :loading="loading" class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Editar aluno
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="2">
            <label for="student-id">Registro do Aluno</label>
            <v-text-field
              id="student-id"
              v-model="item.ra"
              disabled
              solo
              flat
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <label for="student-name">Nome do aluno</label>
            <v-text-field
              id="student-name"
              v-model="item.name"
              :rules="rules"
              solo
              flat
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <label for="student-degree">Série</label>
            <v-select
              id="student-degree"
              v-model="item.degreeId"
              disabled
              solo
              flat
              item-value="id"
              item-text="name"
              :items="degrees"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="1">
            <label for="student-class">Turma</label>
            <v-select
              id="student-class"
              v-model="item.classId"
              :rules="rules"
              solo
              flat
              item-value="id"
              item-text="name"
              :items="classes"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="6" md="3" lg="2">
            <v-btn :to="{ name: 'Students' }" block color="error">
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="6" md="3" lg="2">
            <v-btn @click="submitItem" block :loading="loading" color="success">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <success-message
      :dialog="dialog"
      :title="message"
      @confirm="$router.push({ name: 'Students' })"
    />
  </v-card>
</template>

<script>
import StudentsService from '@/services/students'
import ClassesService from '@/services/classes'
import DegreesService from '@/services/degrees'
import SuccessMessage from '@/components/SuccessMessage'

export default {
  name: 'StudentsUpdate',
  props: ['id'],
  components: {
    SuccessMessage,
  },
  data: () => ({
    form: false,
    loading: false,
    dialog: false,
    message: '',
    item: {},
    classes: [],
    degrees: [],
    rules: [v => !!v || 'Campo requirido'],
  }),
  async mounted() {
    await this.setupComplementalData()
    this.getItem()
  },
  methods: {
    async getItem() {
      try {
        this.loading = true
        const { data } = await StudentsService.show(this.id, true)
        this.item = data.student
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async setupComplementalData() {
      try {
        this.loading = true
        this.classes = (await ClassesService.index()).data.classes
        this.degrees = (await DegreesService.index()).data.degrees
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async submitItem() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const { data } = await StudentsService.update(this.item)
          this.message = data.message
          this.loading = false
          this.dialog = true
        } catch (error) {
          this.loading = false
          console.log(error)
        }
      }
    },
  },
}
</script>
