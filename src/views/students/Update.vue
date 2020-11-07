<template>
  <v-card class="grey lighten-5">
    <v-card-title>
      <v-row justify="space-between">
        <v-col cols="auto">
          Editar aluno
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary">
            Ver gráficos
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="6" md="2">
            <label for="student-id">Matrícula</label>
            <v-text-field id="student-id" disabled solo flat clearable>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <label for="student-name">Nome do aluno</label>
            <v-text-field id="student-name" solo flat clearable> </v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <label for="student-degree">Série</label>
            <v-select
              id="student-degree"
              solo
              flat
              :items="[
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
          <v-col cols="6" md="1">
            <label for="student-class">Turma</label>
            <v-select
              id="student-class"
              solo
              flat
              :items="[
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
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-btn :to="{ name: 'Students' }" color="error">
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="success">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({})
}
</script>
