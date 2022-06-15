<template>

    <button class="back-arrow" @click="back"><img src="@/assets/media/arrow_white.svg" alt=""></button>
    <h1 class="quizOverview__title">
        Your Quizes
    </h1>  
      <div class="quiz-wrapper" v-for="badge in this.mockBadge.badges" :key="badge.badge_id">
      <div class="quiz-wrapper__overview overview" >
          <img class="overview__badge" :src="require(`../assets/media/badges/${badge.badge_image}`)">
          <p class="overview__name">{{badge.badge_name}} </p>
          <p class="overview__rank">{{badge.badge_rank}}</p>
          <p class="overview__progress">{{badge.badge_progess}}</p>
          <img class="overview__arrow" v-on:click="badge.open = !badge.open, activeTab($event.target)" src="@/assets/media/arrow_white.svg"> 
      </div>
          <div class="questions quiz-wrapper__questions">
              <p v-if="badge.open" class="questions__name" >{{badge.badge_name}}</p>
              <p v-if="badge.open" class="questions__answer" >answer</p>
              <p v-if="badge.open" class="questions__correct-answer">{{badge.Correct_Answers}}</p>
              <p v-if="badge.open" class="questions__aquire-date">{{badge.badge_Aquire_date}}</p>
          </div>
      </div>    
</template>

<script>

export default {
    name: 'quiz_overview',
        data(){
        return{
            mockBadge: {
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
    },
    methods:{
        back(){
      this.$router.go(-1)
    },
    activeTab(event){
        event.classList.toggle("rotateArrow")
    }
    }
}

</script>