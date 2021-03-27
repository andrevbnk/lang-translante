<template>
  <div>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="300" tile>
          <v-list shaped>
            <v-subheader>Другие переводы:</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in result.data.translation" :key="i">
                <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
                <v-list-item-content>
                  <v-list-item-title color="black" v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <section>
          <v-layout
            column
            align-center
            justify-center
            class="black--text"
            style="margin: 0px"
          >
            <h1
              class="mb-2 display-3 text-xs-center"
              style="font-weight: 700; color: #21212; font-size: 78px"
            >
              {{ result.data.translation[0] }}
            </h1>
            <div
              class="subheading display-1 mb-3 text-xs-center"
              style="font-weight: 900; color: #424242"
            >
              {{ result.data.text }}
            </div>
          </v-layout>
          <v-row>
            <v-col>
              <v-select
                :items="group"
                style="margin-top: 0.6px"
                label="Выберете группу"
                v-model="selectedGroup"
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                class="pa-7"
                :loading="loading"
                :disabled="loading"
                color="secondary"
                large
                @click="loader = 'loading'"
              >
                Добавить в словарь
              </v-btn>
            </v-col>
          </v-row>
        </section>
      </v-col>

      <v-col>
        <v-card class="mx-auto" max-width="400" tile>
          <v-subheader>Примеры:</v-subheader>
          <ul class="pt-6">
            <li
              v-for="item in result.data.examples.slice(0, 5)"
              :key="item.id"
              style="list-style: none"
            >
              <p><v-icon class="mx-1">mdi-label</v-icon>{{ item.from }}</p>
              <p><v-icon class="mx-1">mdi-translate</v-icon>{{ item.to }}</p>
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // <!-- @click="loader = 'loading'" -->

  // props:['result'],
  data: () => {
    return {
      selectedItem: false,
      selectedGroup: false,
      group: ["Animals", "Cars", "Arts"],
      loader: null,
      loading: false,
    };
  },
  computed: mapState({ result: (state) => state.resultSearch, test: (state) => state }),
  watch: {
    loader() {
      //Так плохо делать
      this.$store.dispatch("addWord", {
        data: this.result.data,
        group: this.selectedGroup,
      });
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 1500);

      this.loader = null;
    },
  },
};
</script>

<style></style>
