<template>
    <div class="container">
        <h1>{{store.rocket.name }}</h1>
        <h3>{{store.rocket.name}} was a {{store.rocket.stages}} stage rocket developed and manufactured by SpaceX. The rocket had several key features and milestones</h3>      
        <p><span class="text_desc">Description:</span> {{ store.rocket.description }}</p>
        <p><span class="text_desc">First Flight:</span> {{store.rocket.name}}'s inaugural flight took place on <span class="response-text">{{DateFormat(store.rocket.first_flight)}}</span> This was its maiden voyage and an important step in its development and testing.</p>
        <p><span class="text_desc">Height: </span>The rocket's height was approximately <span class="response-text">{{store.rocket.height.feet}}</span> feet (<span class="response-text">{{store.rocket.height.meters}}</span> meters). This measurement likely refers to its length from the bottom of the first stage to the top of the second stage.</p>
        <p><span class="text_desc">Diameter:</span> {{store.rocket.name}} had a diameter of approximately <span class="response-text">{{store.rocket.diameter.feet}}</span> feet (<span class="response-text">{{store.rocket.diameter.feet}}</span> meters). This measurement refers to the width of the rocket, likely at its widest point.</p>
        <p><span class="text_desc">Mass: </span>The rocket's mass was about <span class="response-text">{{store.rocket.mass.kg}}</span> kilograms (<span class="response-text">{{store.rocket.mass.lb}}</span> pounds). This figure represents the total weight of the rocket, including both the payload (e.g., satellite or spacecraft) and the rocket's structure and propellant.</p>
        <p><span class="text_desc">Stages:</span> {{store.rocket.name}} had <span class="response-text">{{store.rocket.stages}}</span> stages. Staging refers to the separation of different sections of the rocket as it ascends to space. Each stage is designed to fire and then detach when its fuel is depleted, allowing the next stage to take over.</p>
        <p>Overall, {{store.rocket.name}} represented a significant achievement for SpaceX as it demonstrated the viability of privately-developed liquid-fuel rockets for orbital space missions.</p>
        <p >If you want more detailed information about {{store.rocket.name}}?</p>
        <v-btn :href="store.rocket.wikipedia" class="button">
            visit wikipedia
        </v-btn>
    </div>
</template>


<script setup>
    const store = useRocket()
    const route = useRoute()
    const id = computed(() => route.params.id)
    store.setId(id)
    store.fetchRocketDetails()
    console.log(store.rocket)
    function DateFormat(dateStr){
        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return formattedDate
    }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Heebo&family=Quicksand:wght@400&family=Rubik:wght@400&display=swap');
    .container{
        width: 80%;
        height: 100%;
        margin: auto;
        padding: 20px 0;
        font-family: 'Rubik', sans-serif;
        padding-bottom: 100px;
    }
    .container h1{
        margin: 20px 0;
    }
    .container p ,
    .container span{
        font-size: 15px;
    }
    .container p{
        margin-top: 20px;
    }
    .response-text{
        color: rgb(78, 122, 243);
    }
    .text_desc{
        font-weight: bold;
        font-size: 15px !important;

    }
    .button{
        margin-top: 10px;
    }


    @media (max-width: 700px){
        .container{
            width: 100%;
            padding: 20px 10px;
        }
    }
</style>