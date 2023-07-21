

<template>
    <v-footer
      class=" text-center d-flex flex-column"
      style="z-index: 9999999; padding: 0; margin: 0; box-shadow: 3px 3px 10px 10px rgba(207, 207, 207, 0.575);"
    >
      <div class="pt-12">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
  
      <div class="pb-12 pt-12 pr-12 pl-12 ">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </div>
  
      <v-divider></v-divider>
  
      <div class="pb-12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </template>

  
  <script lang="ts" setup>
    const icons = [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ]
  </script>