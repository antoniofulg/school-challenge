<template>
  <v-card flat outlined>
    <v-card-title>
      <span class="text-h6">
        {{ teacher.name }}
      </span>
    </v-card-title>
    <v-card-text v-if="teacher.profile">
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title>
            <strong>Disciplina:</strong>
            {{ teacher.profile.matter.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title>
            <strong>Séries:</strong>
          </v-list-item-title>
          <v-list-item-subtitle
            v-for="degree in teacher.profile.degrees"
            :key="`degree-${degree.id}`"
          >
            {{ degree.degree.name }}
            [{{ degree.classes.map(classItem => classItem.name).join(', ') }}]
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
