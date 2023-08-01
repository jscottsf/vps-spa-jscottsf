<template>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="is404">
          <h1 class="text-h1 mb-4">Sorry, we can't find that page.</h1>
          <p class="text-body-1 mb-4">
            Please check the URL for typos, or maybe we made a mistake.
          </p>
          <v-btn href="/">Return Home</v-btn>
        </template>

        <template v-else>
          <h1 class="text-h1 mb-4">Oops!</h1>
          <p class="text-body-1 mb-4">
            Our apologies. Please try going back and refreshing, or check back
            in a moment.
          </p>
          <v-btn href="/">Return Home</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(['is404'])
</script>
