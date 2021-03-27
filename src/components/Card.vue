<template>
  <div>
    <v-card max-width="250" min-width="250" class="pa-ma-4 ma-lg-4" v-if="data">
      <router-link to="/">
        <v-card-title class="pt-8 text-center">
          <div style="margin: 0 auto">
            <span style="">{{ data.text }}</span>
          </div>
        </v-card-title>
      </router-link>

      <v-card-subtitle>
        <ul style="list-style: none" class="pa-0">
          <li>Перевод:{{ data.translation[0] }}</li>
          <li>From:{{ data.from }}</li>
          <li>To: {{ data.to }}</li>
        </ul>
      </v-card-subtitle>

      <v-card-actions>
        <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-1" dark v-bind="attrs" v-on="on"> Примеры </v-btn>
          </template>

          <v-card class="mx-auto" max-width="600" tile>
            <v-subheader>Примеры:</v-subheader>
            <ul class="pt-6">
              <li
                v-for="item in data.examples.slice(0, 5)"
                :key="item.id"
                style="list-style: none"
              >
                <p><v-icon class="mx-1">mdi-label</v-icon>{{ item.from }}</p>
                <p><v-icon class="mx-1">mdi-translate</v-icon>{{ item.to }}</p>
              </li>
            </ul>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="show = !show">
              <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon></v-btn
            >
          </template>
          <v-list disabled>
            <v-list-item v-for="text in data.translation.slice(0, 4)" :key="text">
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["word"],
  data: () => ({
    show: false,
    data: false,
    dialog: false,
  }),
  mounted() {
    this.mountedWords();
  },
  methods: {
    mountedWords: async function () {
      let arg = {
        message: this.word,
        from: "English",
        to: "Russian",
      };
      console.log(this.word);
      await axios.post("/translate", arg).then((res) => {
        this.data = res.data;
        console.log(this.data);
      });

      console.log(this.data);
    },
  },
};
</script>

<style>
.absolute {
  position: absolute;
}
a {
  text-decoration: none;
}
</style>
