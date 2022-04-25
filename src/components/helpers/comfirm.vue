<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="{ disable: disable }"
          @click="payment()"
          id="btn-paynow"
          color="info"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Pay now
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Confirm order
        </v-card-title>

        <v-card-text id="text-body">
          Your order has been received <br />
          Thank you for your purchase
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            <router-link to="/">Continue</router-link>
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { api } from "../../helpers/Helpers";
import moment from "moment";
export default {
  name: "DialogComfirm",
  props: ["typeSelect", "defaultPrice", "amountBuy"],
  data() {
    return {
      dialog: false,
      disable: false,
    };
  },
  methods: {
    payment: async function () {
      this.disable = true;
      const dateNow = moment(new Date()).format("YYYY-MM-DD");
      const payload = {
        type: this.typeSelect,
        price: this.defaultPrice,
        amount: this.amountBuy,
        date_create: dateNow,
      };

      const limit = { limit: this.amountBuy, type: this.typeSelect };

      await api.postBuyTicket(payload);
      await api.updateLimitPerDay(limit);
    },
    moment: function () {
      return moment();
    },
  },
  mounted() {
    console.log(this.typeSelect);
  },
};
</script>

<style scoped>
#text-body {
  text-align: center;
  padding-top: 20px;
}
.disable {
  opacity: 0.5;
  pointer-events: none;
}
</style>
