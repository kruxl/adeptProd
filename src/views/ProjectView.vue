<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md9
      >
        <material-card
          color="green"
          title="Flows list"
          text="Below are the flows of ProjectNmae"
        >
    <v-layout
      justify-center
      wrap
    >
          <v-flex
            xs12
            md12
          >
          <material-card>
          <h4>{{getFlows}}</h4>
          </material-card>
          </v-flex>
    </v-layout>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md3
      >
        <material-card
          color="warning"
          title="Project name"
          text="Project details"
        >
                  <p class="card-title font-weight-light"><v-icon small color="warning">mdi-clock-in</v-icon> Project's start date: </p>
                  <p class="card-title font-weight-light"><v-icon small color="warning">mdi-clock-out</v-icon> Project's end date: </p>
                  <p class="card-title font-weight-light"><v-icon small color="warning">mdi-hexagon-multiple</v-icon> Project number: </p>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { db } from '@/main'
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      "getFlows"
    ])
  },
}
</script>
