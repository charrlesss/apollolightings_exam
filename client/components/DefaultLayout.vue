
<template>
    <v-layout class="rounded rounded-md">
        <Header/>
                <v-card>
                    <Navbar/>
                    <v-main style="min-height: 100vh; width: 100vw;">
                        <slot></slot>
                    
                    </v-main>
                 </v-card>
    </v-layout>
    <Footer/>
  </template>



