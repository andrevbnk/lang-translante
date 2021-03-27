<template>
<v-container>
    <v-row>
<v-sheet
        elevation="10"
        rounded="xl"
        max-width="300px"
        class="mx-6"
        v-for="(dict,name) in  $store.state.user.user.groups" :key="dict"
      >
        <v-sheet
          class="pa-3 primary text-right"
          dark
          rounded="t-xl"
          
        >
            
            {{name}}
          <v-btn icon>
            <v-icon>mdi-content-save-cog-outline</v-icon>
          </v-btn>

        </v-sheet>

        <div class="pa-4">
          <v-chip-group
            active-class="primary--text"
            column
          >
            <v-chip
              v-for="word in dict"
              :key="word"
            >
              {{ word.text }}
              
            </v-chip>
          </v-chip-group>
        </div>
      </v-sheet>
    </v-row>

  
    </v-container>
</template>

<script>
export default {
    data: () => ({
        
      tags: [
        'Work',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
      ],
    }),
  }
</script>

<style>

</style>