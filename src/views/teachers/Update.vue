<template>
  <v-card :loading="loading" class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Editar professor
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="8">
            <label for="teacher-name">Nome do professor</label>
            <v-text-field
              id="teacher-name"
              v-model="item.name"
              :rules="rules"
              solo
              flat
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label for="teacher-matter">Matéria</label>
            <v-select
              id="teacher-matter"
              placeholder="Selecione uma matéria"
              v-model="profile.matter.id"
              :rules="rules"
              solo
              flat
              item-value="id"
              item-text="name"
              :items="matters"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row
          v-for="(degree, index) in profile.degrees"
          :key="`degree-${index}`"
        >
          <v-col v-if="index !== 0" class="py-0" cols="12">
            <v-divider />
          </v-col>
          <v-col class="pt-2 pb-0" cols="12" md="6">
            <label for="teacher-degree">Série</label>
            <v-select
              id="teacher-degree"
              v-model="degree.degree.id"
              :rules="rules"
              placeholder="Selecione uma série"
              solo
              flat
              item-value="id"
              item-text="name"
              :items="degrees"
            >
            </v-select>
          </v-col>
          <v-col class="pt-2 pb-0" cols="8" md="4">
            <label for="teacher-class">Turma</label>
            <v-select
              id="teacher-class"
              v-model="degree.classes"
              :rules="[v => (!!v && v.length > 0) || 'Campo requerido']"
              placeholder="Selecione uma turma"
              solo
              flat
              multiple
              return-object
              item-text="name"
              :items="classes"
            >
            </v-select>
          </v-col>
          <v-col class="pt-2 pb-0" cols="4" md="2">
            <label for="teacher-class">Ação</label>
            <v-btn
              @click="removeDegree(index)"
              class="my-1"
              depressed
              block
              :disabled="loading"
              color="error"
            >
              Excluir série
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-end">
          <v-col cols="6" md="3" lg="2">
            <v-btn @click="addDegree" block :disabled="loading" color="primary">
              Adicionar série
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row justify="space-between">
          <v-col cols="6" md="3" lg="2">
            <v-btn :to="{ name: 'Teachers' }" block color="error">
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
      @confirm="$router.push({ name: 'Teachers' })"
    />
  </v-card>
</template>

<script>
import TeachersService from '@/services/teachers'
import ClassesService from '@/services/classes'
import DegreesService from '@/services/degrees'
import MattersService from '@/services/matters'
import SuccessMessage from '@/components/SuccessMessage'

export default {
  name: 'TeachersUpdate',
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
    profile: {
      degrees: [
        {
          degree: {},
          classes: [],
        },
      ],
      matter: {},
    },
    classes: [],
    degrees: [],
    matters: [],
    rules: [v => !!v || 'Campo requirido'],
  }),
  async mounted() {
    await this.setupComplementalData()
    this.getItem()
  },
  methods: {
    addDegree() {
      this.profile.degrees.push({
        degree: {},
        classes: [],
      })
    },
    removeDegree(index) {
      this.profile.degrees.splice(index, 1)
    },
    async getItem() {
      try {
        this.loading = true
        const { data } = await TeachersService.show(this.id, true)
        this.item = { id: data.teacher.id, name: data.teacher.name }
        if (data.teacher.profile) this.profile = data.teacher.profile
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
        this.matters = (await MattersService.index()).data.matters
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
          const params = {
            id: this.item.id,
            name: this.item.name,
            profile: this.profile,
          }
          const { data } = await TeachersService.update(params)
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
