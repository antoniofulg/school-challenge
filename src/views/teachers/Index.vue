<template>
  <v-card class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Listagem de professores
        </v-col>
        <v-col cols="auto">
          <v-row>
            <v-col class="py-0">
              <v-btn color="success">
                Criar relacionamentos
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-btn color="primary">
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
          <label for="teacher-filter">Professor</label>
          <v-text-field
            id="teacher-filter"
            label="Nome do professor"
            v-model="nameFilter"
            prepend-inner-icon="fas fa-search"
            solo
            flat
            clearable
          >
          </v-text-field>
        </v-col>
        <v-col cols="6" md="3">
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
        <v-col cols="6" md="3">
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
        <v-col cols="12" md="6" lg="3">
          <profile-card
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
          >
          </profile-card>
        </v-col>
      </v-row>
    </v-card-text>
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

import ProfilesService from '@/services/profiles'
import ClassesService from '@/services/classes'
import DegreesService from '@/services/degrees'
import ProfileCard from '@/components/ProfileCard'

export default {
  name: 'TeachersIndex',
  components: { ProfileCard },
  data: () => ({
    loading: false,
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
    this.getItems()
  },
  computed: {
    profiles() {
      return this.items
    },
  },
  methods: {
    async getItems() {
      try {
        this.loading = true
        const params = {
          name: this.nameFilter,
          degreeId: this.degreeFilter,
          classId: this.classFilter,
        }
        const { data } = await ProfilesService.index(params)
        this.items = data.profiles
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
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
