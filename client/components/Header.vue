

<script setup>
    const store = useNavbar()
</script>

<template>
   <v-app-bar title="Apollo Lightings" style="position: fixed;">
    <template v-slot:prepend>
          <v-app-bar-nav-icon  @click="store.open_close">
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
               
              ></v-btn>
            </template>
          </v-app-bar-nav-icon>
    
    </template>
   </v-app-bar>
   
  </template>
