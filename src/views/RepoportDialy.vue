<template>
  <v-container grid-list-xs>
    <v-row id="row-dd" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="ticketsType"
          v-on:change="filterTicket"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="All"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker @change="filterTicket" v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-simple-table id="_table">
      <template v-slot:default>
        <thead>
          <tr>
            <th>No</th>
            <th class="text-left">Ticket Type</th>
            <th>Price</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Date create</th>
          </tr>
        </thead>
        <tbody v-if="objAllTickets.length">
          <tr v-for="(item, index) in objAllTickets" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.price.toLocaleString() }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.date_create }}</td>
          </tr>
        </tbody>
        <div class="no-data" v-else>
          <span>No data</span>
        </div>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "ReportDialy",
  data() {
    return {
      ticketsType: "All",
      types: ["All", "A", "B", "C", "D"],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      objAllTickets: [],
    };
  },
  async mounted() {
    const payload = {
      type: "All",
    };
    this.objAllTickets = await api.getListBuyProduct(payload);
  },
  methods: {
    filterTicket: async function () {
      const payload = {
        type: this.ticketsType,
        date_create: this.date,
      };
      this.objAllTickets = await api.getListBuyProduct(payload);
    },
  },
};
</script>

<style scope>
#_table {
  width: 100%;
  margin-top: 60px;
}
#row-dd {
  margin-top: 50px;
}
.no-data {
  text-align: center;
  font-size: 14px;
  position: absolute;
  padding: 40px;
  width: calc(100% - 80px);
}
</style>
