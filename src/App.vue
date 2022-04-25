<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title> Tickets </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/reportdialy" dark color="teal">
        <v-btn link class="mx-2" small fab dark color="teal">
          <v-icon dark> mdi-format-list-bulleted-square </v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
