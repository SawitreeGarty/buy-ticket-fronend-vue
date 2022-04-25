<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="reserve" color="primary" dark v-bind="attrs" v-on="on">
          Reserve
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text>
            <router-link to="/summarylist">Login</router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DialogView",
  data: () => ({
    dialog: false,
  }),
  methods: {
    reserve() {
      const typeSelect = JSON.stringify(this.typeSelect);
      localStorage.setItem("typeSelect", typeSelect);

      const defaultPrice = JSON.stringify(this.defaultPrice);
      localStorage.setItem("defaultPrice", defaultPrice);

      const amountBuy = JSON.stringify(this.amountBuy);
      localStorage.setItem("amountBuy", amountBuy);

      const timeremianing = new Date().getTime() + 15 * 60000;
      localStorage.setItem("timeremianing", timeremianing);
    },
  },
  props: ["typeSelect", "defaultPrice", "amountBuy"],
};
</script>
