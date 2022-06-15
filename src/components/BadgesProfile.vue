<template>
  <section class="badges">
        <h3 class="badges__header">Your badges</h3>
        <router-link to="quiz_overview" class="badges__route">To quizes</router-link>
        <div class="slider-section">
            <div class="slider-wrap">
                <router-link to="/" v-for="slide in this.badgeData.badges" :key="slide.badge_id" class="slider-wrap__item">
                    <h4 class="slider-wrap__header">{{ slide.badge_name}}</h4>
                    <img class="slider-wrap__image" :src="require(`../assets/media/badges/${slide.badge_image}`)">
                    <p class="slider-wrap__name">{{ slide.badge_rank}}</p>
                    <p class="slider-wrap__progress">{{ slide.badge_progess}}</p>
                </router-link>
            </div>
        </div>
       
  </section>
</template>

<script>
export default {
    name: 'BadgesProfile',
    data(){
        return{
            badgeData: {
                "badges": [
                    {
                        "Correct_Answers": 3,
                        "badge_Aquire_date": "05-05-2022",
                        "badge_question": "How many phases does the moon have?",
                        "badge_id": 3,
                        "badge_rank" : "Explorer",
                        "badge_name": "Moon",
                        "badge_progess": "25%",
                        "badge_image" : "badge_explorer.svg",
                        open: false
                    },{
                        "Correct_Answers": 8,
                        "badge_Aquire_date": "03-05-2022",
                        "badge_category": "How many phases does the other moon have?",
                        "badge_id": 5,
                        "badge_rank" : "Specialist",
                        "badge_name": "other Moon",
                        "badge_progess": "78%",
                        "badge_image" : "badge_specialist.svg",
                        open: false
                    },
                    {
                        "Correct_Answers": 5,
                        "badge_Aquire_date": "05-05-2022",
                        "badge_question": "How many phases does the moon have?",
                        "badge_id": 4,
                        "badge_rank" : "Astronaut",
                        "badge_name": "Moon",
                        "badge_progess": "54%",
                        "badge_image" : "badge_astronaut.svg",
                        open: false
                    },
                    {
                        "Correct_Answers": 1,
                        "badge_Aquire_date": "05-05-2022",
                        "badge_question": "How many phases does the moon have?",
                        "badge_id": 2,
                        "badge_rank" : "Space Monkey",
                        "badge_name": "Moon",
                        "badge_progess": "10%",
                        "badge_image" : "badge_space_monkey.svg",
                        open: false
                    },
                    {
                        "Correct_Answers": 10,
                        "badge_Aquire_date": "05-05-2022",
                        "badge_question": "How many phases does the moon have?",
                        "badge_id": 1,
                        "badge_rank" : "Elon Musk",
                        "badge_name": "Moon",
                        "badge_progess": "100%",
                        "badge_image" : "badge_elon_musk.svg",
                        open: false
                    },
                    ]
            }
        }
    }
}
</script>
