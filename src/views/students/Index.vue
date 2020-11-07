<template>
  <v-card class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Listagem de alunos
        </v-col>
        <v-col cols="auto">
          <v-row>
            <v-col class="py-0">
              <v-btn color="success">
                Gerar alunos
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
          <label for="student-filter">Aluno</label>
          <v-text-field
            id="student-filter"
            label="Nome do aluno"
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
            :items="[
              {
                text: 'Todas',
                value: 'all'
              },
              {
                text: 'Ensino Fundamental',
                value: 1
              },
              {
                text: 'Ensino superior',
                value: 2
              }
            ]"
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
            :items="[
              {
                text: 'Todas',
                value: 'all'
              },
              {
                text: 'A',
                value: 1
              },
              {
                text: 'B',
                value: 2
              }
            ]"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="items">
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
  </v-card>
</template>

<script>
const items = [
  {
    id: 1,
    ra: 12346,
    name: 'Nome do aluno 1',
    degreeId: 1,
    classId: 1
  },
  {
    id: 2,
    ra: 456798,
    name: 'Nome do aluno 2',
    degreeId: 2,
    classId: 1
  },
  {
    id: 3,
    ra: 752156,
    name: 'Nome do aluno 3',
    degreeId: 3,
    classId: 2
  },
  {
    id: 4,
    ra: 852348,
    name: 'Nome do aluno 4',
    degreeId: 4,
    classId: 2
  },
  {
    id: 5,
    ra: 454643,
    name: 'Nome do aluno 5',
    degreeId: 6,
    classId: 2
  }
]

const headers = [
  {
    text: 'Matrícula',
    sortable: true,
    value: 'ra'
  },
  {
    text: 'Nome',
    sortable: true,
    value: 'name'
  },
  {
    text: 'Série',
    sortable: true,
    value: 'degreeId'
  },
  {
    text: 'Turma',
    sortable: true,
    value: 'classId'
  },
  { text: 'Ação', sortable: false, value: 'action' }
]

export default {
  data: () => ({
    classFilter: 'all',
    degreeFilter: 'all',
    headers,
    items
  })
}
</script>
