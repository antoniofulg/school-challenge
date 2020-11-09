<template>
  <v-card flat outlined>
    <v-card-title>
      <span class="text-h6">
        {{ profile.teacher.name }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-item-list>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Disciplina:</strong>
            {{ profile.matter.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-item-list>
      <v-item-list>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Séries:</strong>
          </v-list-item-title>
          <v-list-item-subtitle
            v-for="degree in degrees"
            :key="`degree-${degree.id}`"
          >
            {{ degree.degree.name }}
            [{{ degree.classes.map(classItem => classItem.name).join(', ') }}]
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-item-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    profile: {
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
