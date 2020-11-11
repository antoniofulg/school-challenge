<template>
  <v-card flat outlined height="100%">
    <v-card-title>
      <v-row justify="space-between">
        <v-col class="py-0" cols="auto">
          <v-icon color="primary" class="mr-4"
            >fas fa-chalkboard-teacher</v-icon
          >
          <span class="text-subtitle-1 font-weight-bold">
            {{ teacher.name }}
          </span>
        </v-col>
        <v-col class="py-0" cols="auto">
          <v-btn
            :to="{
              name: 'TeacherUpdate',
              params: {
                id: teacher.id,
              },
            }"
            color="primary"
            icon
          >
            <v-icon>fas fa-pen</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="teacher.profile">
      <v-divider></v-divider>
      <v-row class="align-center">
        <v-col cols="auto">
          <v-icon color="accent">fas fa-book</v-icon>
        </v-col>
        <v-col cols="auto">
          <span class="text-subtitle-2 font-weight-bold">Disciplina:</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-1 px-1">
          <v-chip class="my-1" color="primary">
            <span class="font-weight-bold">
              {{ teacher.profile.matter.name }}
            </span>
          </v-chip>
        </v-col>
      </v-row>

      <v-row class="align-center">
        <v-col cols="auto">
          <v-icon color="accent">fas fa-graduation-cap</v-icon>
        </v-col>
        <v-col cols="auto">
          <span class="text-subtitle-2 font-weight-bold">Séries:</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="auto"
          class="py-1 px-1"
          v-for="degree in teacher.profile.degrees"
          :key="`degree-${degree.id}`"
        >
          <v-btn
            :to="{ name: 'Students', query: { degreeId: degree.degree.id } }"
            class="text-normal"
            color="primary"
            rounded
            depressed
          >
            <span class="font-weight-black mr-2">
              {{ degree.degree.name }}:
            </span>
            <span class="font-weight-bold">
              {{ degree.classes.map(classItem => classItem.name).join(', ') }}
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-divider></v-divider>
      <v-row justify="center" class="align-center">
        <v-col cols="auto">
          <span class="text-subtitle-2 font-weight-bold">
            Perfil ainda não cadastrado!
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TeacherCard',
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  computed: {
    degrees() {
      return this.profile.degrees
    },
  },
}
</script>

<style lang="sass">
.text-normal
  text-transform: none !important
</style>
