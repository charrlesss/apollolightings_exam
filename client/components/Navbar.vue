<template>
    <v-navigation-drawer
          v-model="store.drawer"
          style="position: fixed;"          
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
          </v-list-item>
          <v-divider></v-divider>
          <v-list density="compact" nav v-for="nav in navData">
            <v-list-item :prepend-icon="nav.icon" :title="nav.title" :to="nav.to">
            </v-list-item>
          </v-list>
        </v-navigation-drawer> 
  </template>
  <script setup>
    const store = useNavbar()
    const navData = [
      {
        icon:'mdi-home-city',
        title:'Home',
        to:'/'
      },
      {
        icon:'mdi-rocket',
        title:'Rocket Launches',
        to:'/launches',
      },
      {
        icon:'mdi-heart',
        title:'Favorites',
        to:'/favorites'
      }
    ]
  </script>

