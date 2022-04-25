import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});
const vm = new Vue();
const baseURL = "http://localhost:3000/";
const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch((error) => {
      vm.flash(
        `${error.response.status}: ${error.response.statusText}`,
        "error"
      );
    });

export const api = {
  getlimitPerDay: handleError(async () => {
    const res = await axios.get(baseURL+'limitPerDay');
    return res.data;
  }),
  updateLimitPerDay:handleError(async payload => {
    const res = await axios.put(baseURL+'limitPerDay/'+payload.type, payload);
    return res.data;
  }), 
  postBuyTicket: handleError(async payload => {
    const res = await axios.post(baseURL+'buyTicket',payload);
    return res.data;
  }),
  getListBuyProduct: handleError(async payload => {
    const res = await axios.post(baseURL+'getListBuyTicket',payload);
    return res.data;
  })
};
