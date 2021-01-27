<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <i class="fas fa-hotel"></i> Hotel App
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"> </b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!--Right alighed nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <router-link to="/">
              <b-button size="sm" class="my-2 mr-2 my-sm-0">
                <i class="fas fa-door-open"></i> Exit
              </b-button>
            </router-link>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid class="bv-exmple-row mt-4">
      <b-row>
        <b-col cols="4">
          <h2 class="">Room - Single</h2>
          <b-img
            :src="require('@/assets/img1.jpg')"
            width="480px"
            height="300px"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
        <b-col cols="8">
          <b-table :fields="fields" bordered striped hover :items="single">
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('Single', row.item.id)"
              >
                Delete Reservation
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <hr class="style5" />
      <b-row>
        <b-col cols="4">
          <h2 class="">Room - Double</h2>
          <b-img
            :src="require('@/assets/img2.jpg')"
            width="480px"
            height="300px"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
        <b-col cols="8">
          <b-table :fields="fields" bordered striped hover :items="double">
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('Double', row.item.id)"
              >
                Delete Reservation
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <hr class="style5" />
      <b-row>
        <b-col cols="4">
          <h2 class="">Room - Family</h2>
          <b-img
            :src="require('@/assets/img3.jpg')"
            width="480px"
            height="300px"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
        <b-col cols="8">
          <b-table :fields="fields" bordered striped hover :items="family">
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('Family', row.item.id)"
              >
                Delete Reservation
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <hr class="style5" />
      <b-row>
        <b-col cols="4">
          <h2 class="">Room - Deluxe</h2>
          <b-img
            :src="require('@/assets/img4.jpg')"
            width="480px"
            height="300px"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
        <b-col cols="8">
          <b-table :fields="fields" bordered striped hover :items="deluxe">
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('Deluxe', row.item.id)"
              >
                Delete Reservation
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <hr class="style5" />
      <b-row>
        <b-col cols="6">
          <h2 class="">Clients</h2>
          <b-table
            :fields="fieldsClient"
            bordered
            striped
            hover
            :items="clients"
          >
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('clients', row.item.id)"
              >
                Delete Clients
              </b-button>
            </template>
          </b-table>
        </b-col>
        <b-col cols="6">
          <h2 class="">Contact</h2>
          <b-table
            :fields="fieldsMessage"
            bordered
            striped
            hover
            :items="messages"
          >
            <template v-slot:cell(delete)="row">
              <b-button
                size="md"
                variant="danger"
                block
                @click="deletekey('Contact', row.item.id)"
              >
                Delete Message
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      single: [],
      double: [],
      family: [],
      deluxe: [],
      clients: [],
      messages: [],
      fields: [
        {
          key: "id",
          lable: "Id",
          sortable: true,
        },
        {
          key: "clientsID",
          lable: "Client ID",
          sortable: true,
        },
        {
          key: "startDay",
          lable: "Start Day",
          sortable: true,
        },
        {
          key: "endDay",
          lable: "End Day",
          sortable: true,
        },
        {
          key: "price",
          lable: "Price",
          sortable: true,
        },
        {
          key: "orderTime",
          lable: "Booking Time",
          sortable: true,
        },
        {
          key: "delete",
          lable: "Delete Reservation",
        },
      ],
      fieldsClient: [
        {
          key: "id",
          lable: "Id",
          sortable: true,
        },
        {
          key: "name",
          lable: "Name",
          sortable: true,
        },
        {
          key: "email",
          lable: "E-mail",
          sortable: true,
        },
        {
          key: "delete",
          lable: "Delete Clients",
          sortable: true,
        },
      ],
      fieldsMessage: [
        {
          key: "id",
          lable: "Id",
          sortable: true,
        },
        {
          key: "email",
          lable: "E-mail",
          sortable: true,
        },
        {
          key: "message",
          lable: "Message",
          sortable: true,
        },
        {
          key: "delete",
          lable: "Delete Message",
          sortable: true,
        },
      ],
    };
  },
  created() {
    db.collection("Single").onSnapshot((query) => {
      (this.single = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.single.push(x);
        });
    });
    db.collection("Double").onSnapshot((query) => {
      (this.double = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.double.push(x);
        });
    });
    db.collection("Family").onSnapshot((query) => {
      (this.family = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.family.push(x);
        });
    });
    db.collection("Deluxe").onSnapshot((query) => {
      (this.deluxe = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.deluxe.push(x);
        });
    });
    db.collection("clients").onSnapshot((query) => {
      (this.clients = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.clients.push(x);
        });
    });
    db.collection("messages").onSnapshot((query) => {
      (this.messages = []),
        query.forEach((element) => {
          var x = element.data();
          x.id = element.id;
          this.messages.push(x);
        });
    });
  },
  methods: {
    deletekey(collection, id) {
      db.collection(collection)
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((err) => {
          console.log("Error removing document: " + err);
        });
    },
  },
};
</script>
<style scoped>
i {
  color: orange;
}
button:hover {
  background-color: orange;
  color: white;
}
hr.style5 {
  background-color: #fff;
  border-top: 2px dashed #8c8b8b;
}
</style>