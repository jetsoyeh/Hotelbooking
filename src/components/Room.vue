<template>
  <div>
    <b-container fluid class="bv-example-row mt-4">
      <b-row>
        <b-col>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6" xs="12">
                <b-card-img
                  :src="require('../assets/img1.jpg')"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6" xs="12">
                <b-card-body class="text-primary" title="Single">
                  <b-card-text class="text-dark">
                    <h2 class="mt-4">Room with wifi</h2>
                    <h6 class="mt-4">1 Person</h6>
                    <p class="mt-4">Individual space to rest.</p>
                  </b-card-text>
                  <b-button
                    @click="modaldata('Single', 500, 'primary')"
                    size="lg"
                    class="mt-4"
                    block
                    variant="primary"
                    >Book</b-button
                  >
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6" xs="12">
                <b-card-img
                  :src="require('../assets/img2.jpg')"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6" xs="12">
                <b-card-body class="text-success" title="Double">
                  <b-card-text class="text-dark">
                    <h2 class="mt-4">Double Room</h2>
                    <h6 class="mt-4">2 Persons</h6>
                    <p class="mt-4">Popular Room.</p>
                  </b-card-text>
                  <b-button
                    @click="modaldata('Double', 700, 'success')"
                    size="lg"
                    class="mt-4"
                    block
                    variant="success"
                    >Book</b-button
                  >
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-4">
        <b-col>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6" xs="12">
                <b-card-img
                  :src="require('../assets/img3.jpg')"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6" xs="12">
                <b-card-body class="text-warning" title="Family">
                  <b-card-text class="text-dark">
                    <h2 class="mt-4">Family Room</h2>
                    <h6 class="mt-4">4-5 Persons</h6>
                    <p class="mt-4">Excellent Family Room.</p>
                  </b-card-text>
                  <b-button
                    @click="modaldata('Family', 800, 'warning')"
                    size="lg"
                    class="mt-4 text-light"
                    block
                    variant="warning"
                    >Book</b-button
                  >
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6" xs="12">
                <b-card-img
                  :src="require('../assets/img4.jpg')"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6" xs="12">
                <b-card-body class="text-dark" title="Deluxe">
                  <b-card-text class="text-dark">
                    <h2 class="mt-4">Deluxe Room</h2>
                    <h6 class="mt-4">1-7 Persons</h6>
                    <p class="mt-4">Deluxe Room.</p>
                  </b-card-text>
                  <b-button
                    @click="modaldata('Deluxe', 1000, 'dark')"
                    size="lg"
                    class="mt-4"
                    block
                    variant="dark"
                    >Book</b-button
                  >
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal hide-footer id="my-modal" :title="form.room">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="E-mail:" label-for="input-2">
          <b-form-input
            id="input-2q"
            v-model="form.email"
            required
            type="email"
            placeholder="Enter E-mail"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Day to Book:"
          label-for="input-2"
        >
          <date-picker
            id="input-2q"
            v-model="range"
            range
            required
            type="date"
            placeholder="Select Day"
            value-type="format"
            format="YYYY-MM-DD"
            :disabled-date="notBeforeToday"
            confirm
          ></date-picker>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Price per Night:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2qa"
            v-model="form.price"
            required
            disable
          ></b-form-input>
        </b-form-group>
        <b-button class="text-white" block type="submit" :variant="color"
          >Book</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { db } from "@/firebase";
import Swal from "sweetalert2";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        room: "",
        price: "",
        date: "",
      },
      color: "",
      range: "",
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      db.collection("clients")
        .add({
          name: this.form.name,
          email: this.form.email,
        })
        .then((docRef) => {
          var day1 = Date.parse(new Date(this.range[0]));
          var day2 = Date.parse(new Date(this.range[1]));
          var day = parseInt((day2 - day1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
          db.collection(this.form.room)
            .add({
              clientID: docRef.id,
              room: this.form.room,
              price: this.form.price * day,
              startDay: this.range[0],
              endDay: this.range[1],
              orderTime: new Date().toLocaleString(),
            })
            .then((d) => {
              Swal.fire("Good Job!", `Reservation id: ${d.id}`, "success");
              this.$bvModal.hide("my-modal");
              this.form.email = "";
              this.form.name = "";
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    modaldata(room, price, color) {
      this.$bvModal.show("my-modal");
      (this.form.room = room), (this.color = color), (this.form.price = price);
    },
    //當日前的日期不可選
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
  },
};
</script>
<style scoped>
img {
  height: 300px !important;
}
</style>