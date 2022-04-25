<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          :class="{disable: item.limit === 0}"
          @click="
            activateChip(item.type, item.minimumBuy, item.limit, item.price)
          "
          v-for="(item, index) in objAllTickets"
          :key="index"
          >{{ item.type }} Type :
          {{ Number(item.price).toLocaleString() }} THB</v-chip
        >
      </v-chip-group>
      <template v-if="selection">
        <v-text-field
          type="number"
          v-model="amountBuy"
          maxlength="2"
          class="centered-input"
        >
          <v-icon
            @click="addTicket"
            slot="append"
            color="red"
            style="cursor: pointer"
          >
            mdi-plus
          </v-icon>
          <v-icon
            @click="removeTicket"
            slot="prepend"
            color="green"
            style="cursor: pointer"
          >
            mdi-minus
          </v-icon>
        </v-text-field>
      </template>
    </v-card-text>
    <DialogView
      :typeSelect="typeSelect"
      :defaultPrice="defaultPrice"
      :amountBuy="amountBuy"
    />
  </v-card>
</template>

<script>
import DialogView from "@/components/helpers/Dialog.vue";
import { api } from '../helpers/Helpers';
export default {
  name: "BuyTickets",
  data: () => ({
    loading: false,
    selection: false,
    typeSelect: "",
    amountBuy: 0,
    defaultMin: 0,
    limit: 0,
    defaultPrice: 0,
    objAllTickets: [],
  }),
  async mounted() {
    this.objAllTickets = await api.getlimitPerDay();
  },
  methods: {
    activateChip(type, min, limit, price) {
      this.selection = !this.selection;
      if (type !== this.typeSelect) {
        this.typeSelect = type;
        this.selection = true;
      }

      this.amountBuy = min;
      this.limit = limit;
      this.defaultMin = min;
      this.defaultPrice = price;
    },
    addTicket() {
      this.amountBuy =
        this.amountBuy < this.limit ? this.amountBuy + 1 : this.amountBuy;
    },
    removeTicket() {
      this.amountBuy =
        this.amountBuy > this.defaultMin ? this.amountBuy - 1 : this.amountBuy;
    },
  },
  components: {
    DialogView,
  },
};
</script>

<style scope>
.centered-input input {
  text-align: center;
}

.disable{
  opacity: 0.5;
  pointer-events: none;
}
</style>
