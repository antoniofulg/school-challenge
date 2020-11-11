<template>
  <v-card :loading="loading" class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Cadastrar professor
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
              v-model="item.teacher.name"
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
              v-model="item.profile.matterId"
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
          v-for="(degree, index) in item.profile.degreesClasses"
          :key="`degree-${index}`"
        >
          <v-col v-if="index !== 0" class="py-0" cols="12">
            <v-divider />
          </v-col>
          <v-col class="pt-2 pb-0" cols="12" md="6">
            <label for="teacher-degree">Série</label>
            <v-select
              id="teacher-degree"
              v-model="degree.degreeId"
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
              :disabled="loading || index === 0"
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
import ProfilesService from '@/services/profiles'
import ClassesService from '@/services/classes'
import DegreesService from '@/services/degrees'
import MattersService from '@/services/matters'
import SuccessMessage from '@/components/SuccessMessage'

export default {
  name: 'TeachersCreate',
  components: {
    SuccessMessage,
  },
  data: () => ({
    form: false,
    loading: false,
    dialog: false,
    message: '',
    item: {
      teacher: {},
      profile: {
        degreesClasses: [
          {
            classes: [],
          },
        ],
      },
    },
    classes: [],
    degrees: [],
    matters: [],
    rules: [v => !!v || 'Campo requerido'],
  }),
  async mounted() {
    await this.setupComplementalData()
  },
  methods: {
    addDegree() {
      this.item.profile.degreesClasses.push({
        classes: [],
      })
    },
    removeDegree(index) {
      this.item.profile.degreesClasses.splice(index, 1)
    },
    async setupComplementalData() {
      try {
        this.loading = true
        const items = (await ClassesService.index()).data.classes
        this.degrees = (await DegreesService.index()).data.degrees
        this.matters = (await MattersService.index()).data.matters
        this.classes = items.map(classItem => {
          return {
            id: classItem.id,
            name: classItem.name,
          }
        })
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
          const { data } = await TeachersService.create(this.item.teacher)
          this.item.profile.teacherId = data.teacher.id
          await ProfilesService.create(this.item.profile)
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
