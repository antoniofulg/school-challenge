<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="320" persistent>
      <v-card>
        <v-card-title>
          <v-row justify="center">
            {{ title }}
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="auto">
              <v-icon x-large color="success">fas fa-check-circle</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="pb-0" cols="12">
              <v-btn :to="{ name: route }" block width="" color="primary"
                >Voltar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'SuccessMessage',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
}
</script>
