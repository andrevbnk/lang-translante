<template>
  <div class="home">
    <div class="result">
      <ResultSearch />
    </div>

    <v-row>
      <v-col>
        <!-- <v-sheet min-height="70vh" rounded="lg">
          <div class="d-flex flex-wrap align-center mr-auto">
            <div class="card-animal" v-for="n in words" :key="n">
              <Card :data="n.data" />
            </div>
          </div>
        </v-sheet> -->

        <v-container>
          <div class="categ" v-for="group in groups" :key="group.title">
            <h1 class="my-5">
              <center>{{ group.title }}</center>
            </h1>
            <v-slide-group class="pa-4" show-arrows>
              <v-slide-item v-for="word in group.words" :key="word">
                <Card :word="word" />
              </v-slide-item>
            </v-slide-group>
          </div>

        </v-container>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import ResultSearch from "../components/ResultSearch.vue";

export default {
  components: {
    Card,
    ResultSearch,
  },
  data: () => {
    return {
      model: null,
      groups: [
        { title: "Work", words: ["front-end", "back-end", "full-stack", "QA"] },
        { title: "Food", words: ["pizza", "apple", "fruit"] },
        // { title: "Art", words: ["front-end", "back-end", "full-stack,QA"] },
      ],
      words: [],
      loader: false,
      translateWords: ["cat", "dog", "cat", "dog", "cat", "dog", "cat", "dog"],
    };
  },
};
</script>

<style></style>
