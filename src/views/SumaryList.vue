<template>
  <v-container grid-list-xs>
    <v-row class="summarylist">
      <template>
        <v-card style="width: 500px">
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title class="text-caption"
                >Payment Channel</v-list-item-title
              >
              <v-chip class="ma-2" id="timeremianing" color="primary">
                Time Remaining : {{ minutes }}:{{ seconds }}
              </v-chip>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-list class="transparent" id="box-payment">
            <template>
              <v-container>
                <v-row justify="center">
                  <v-col
                    v-for="(item, n) in paymentList"
                    :key="n"
                    cols="auto cols-payment"
                    :class="{ active: item.select }"
                    @click="onselectPayment(n, item.paymentType)"
                  >
                    <v-card height="100" width="100" class="grey lighten-5">
                      <v-row
                        class="fill-height select-payment"
                        align="center"
                        justify="center"
                      >
                        <img :src="item.src" alt="" width="60" />
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>

              <v-container>
                <template v-if="paymentTypeSelect === 'credit'">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="name"
                      :counter="10"
                      :rules="nameRules"
                      label="Card Number"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Name on Card"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="MM/YY"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="CVV"
                      required
                    ></v-text-field>

                    <v-checkbox
                      v-model="checkbox"
                      :rules="[(v) => !!v || 'You must agree to continue!']"
                      label="Save this card"
                      required
                    ></v-checkbox>
                  </v-form>
                </template>
                <template v-else>
                    <div class="text-h6">How to pay with WeChat</div>

                    <div>
                      1. Open WeChat Application <br>
                      2. Click [ + ] at the top right and choose 'Scan' <br>
                      3. Scan the Payment Slip <br>
                      4. Confirm the payment amount and make payment
                    </div>
                </template>
              </v-container>
            </template>
          </v-list>
          <!-- <v-divider></v-divider> -->
        </v-card>
      </template>
      <v-spacer></v-spacer>
      <template>
        <v-card style="width: 300px">
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title class="text-caption"
                >Ticket Type</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title
                >Ticket type {{ typeSelect }} <br />
                <div class="text-caption">
                  (THB {{ Number(defaultPrice).toLocaleString() }} x
                  {{ amountBuy }})
                </div>
              </v-list-item-title>
              <v-list-item-subtitle class="text-right">
                THB {{ Number(subtotal).toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>
                <div class="text-caption">Subtotal</div>
              </v-list-item-title>
              <v-list-item-subtitle class="text-right">
                THB {{ Number(subtotal).toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <div class="text-caption">Service Fee (5%)</div>
              </v-list-item-title>
              <v-list-item-subtitle class="text-right">
                THB {{ serviceFee }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <div class="text-caption">VAT incl. (7%)</div>
              </v-list-item-title>
              <v-list-item-subtitle class="text-right">
                THB {{ vat }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-list class="transparent blue-grey lighten-4" id="total-sum">
            <v-list-item>
              <v-list-item-title>Total</v-list-item-title>
              <v-list-item-subtitle class="text-right">
                THB {{ Number(total).toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-list class="qr-code">
            <img src="../assets/QR.webp" width="200">
          </v-list>
           <DialogComfirm :typeSelect="typeSelect" :defaultPrice="defaultPrice" :amountBuy="amountBuy"/>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import DialogComfirm from '@/components/helpers/comfirm.vue';
export default {
  name: "SummaryList",
  data() {
    return {
      typeSelect: "",
      defaultPrice: "",
      amountBuy: "",
      subtotal: 0,
      serviceFee: 0,
      vat: 0,
      total: 0,
      activePayment: false,
      countDownDate: "",
      minutes: 0,
      seconds: 0,
      timeremianing: "",
      paymentTypeSelect: "",
      paymentList: [
        {
          paymentType: "credit",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/checkout-credit/crediticon.svg",
          select: false,
        },
        {
          paymentType: "cash",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/checkout-credit/cashicon.svg",
          select: false,
        },
        {
          paymentType: "alipay",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/alipay-logo.svg",
          select: false,
        },
        {
          paymentType: "wechat",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/checkout-credit/WeChat+Pay%402x.png",
          select: false,
        },
        {
          paymentType: "linepay",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/checkout-credit/linepay%402x.png",
          select: false,
        },
        {
          paymentType: "truewallet",
          src: "https://s3-ap-southeast-1.amazonaws.com/tm-public-file/checkout-credit/true+money+wallet%402x.png",
          select: false,
        },
      ],
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  mounted() {
    if (localStorage.getItem("typeSelect")) {
      try {
        this.typeSelect = JSON.parse(localStorage.getItem("typeSelect"));
      } catch (e) {
        localStorage.removeItem("typeSelect");
      }
    }

    if (localStorage.getItem("defaultPrice")) {
      try {
        this.defaultPrice = JSON.parse(localStorage.getItem("defaultPrice"));
      } catch (e) {
        localStorage.removeItem("defaultPrice");
      }
    }

    if (localStorage.getItem("amountBuy")) {
      try {
        this.amountBuy = JSON.parse(localStorage.getItem("amountBuy"));
      } catch (e) {
        localStorage.removeItem("amountBuy");
      }
    }

    if (localStorage.getItem("timeremianing")) {
      try {
        this.countDownDate = JSON.parse(localStorage.getItem("timeremianing"));
      } catch (e) {
        localStorage.removeItem("timeremianing");
      }
    }

    this.subtotal = this.defaultPrice * this.amountBuy;
    this.serviceFee = (this.subtotal * 5) / 100;
    this.vat = (this.subtotal * 7) / 100;
    this.total = this.subtotal + this.serviceFee + this.vat;

    this.timeremianing = setInterval(
      function () {
        var now = new Date().getTime();
        var timeleft = this.countDownDate - now;

        this.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (this.minutes <= 0 && this.seconds <= 0) {
          clearInterval(this.timeremianing);
          this.$router.push('/')
          localStorage.removeItem("typeSelect");
          localStorage.removeItem("defaultPrice");
          localStorage.removeItem("amountBuy");
          localStorage.removeItem("timeremianing");
        }
      }.bind(this),
      1000
    );
  },
  methods: {
    onselectPayment(id, type) {
      this.paymentTypeSelect = type;
      this.paymentList = this.paymentList.map((obj) => {
        return { ...obj, select: false };
      });
      this.paymentList[id].select = true;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  components: {
    DialogComfirm
  },
};
</script>

<style scope>
#box-payment {
  padding: 20px;
}
.summarylist {
  margin-top: 30px;
}
#total-sum {
  /* position: absolute; */
  width: 100%;
  bottom: -64px;
}
.select-payment {
  cursor: pointer;
}
.cols-payment {
  position: relative;
}
.cols-payment.active:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid #1976d2;
  top: 0;
  border-radius: 4px;
}
#btn-paynow {
  position: absolute;
  margin: 0 !important;
  left: 0;
  right: 0;
  bottom: -50px;
  width: 100%;
}
#timeremianing {
  width: 260px;
}
.qr-code{
  text-align: center;
}
</style>
