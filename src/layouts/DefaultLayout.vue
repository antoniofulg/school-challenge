<template>
  <v-app id="sandbox">
    <v-navigation-drawer v-model="drawer" color="accent" permanent clipped app>
      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.name"
          :to="{ name: item.route }"
          link
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="accent" clipped-left app>
      <v-toolbar-title class="white--text">Evolucional</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="blue-grey lighten-5" fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    menuItems: [
      {
        route: 'Dashboard',
        name: 'Dashboard',
        icon: 'fas fa-chart-line'
      },
      {
        route: 'Students',
        name: 'Alunos',
        icon: 'fas fa-user-graduate'
      },
      {
        route: 'Teachers',
        name: 'Professores',
        icon: 'fas fa-chalkboard-teacher'
      }
    ]
  })
}
</script>
