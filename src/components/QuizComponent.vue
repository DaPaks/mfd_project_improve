<template>
<div>
  
  <div class="Quiz__container">
    <h1 >
      Rum Quiz
    </h1>
    <div v-if="index < count">
      <p>
        {{question[index]['question']}}
      </p>
        <label class="Quiz__label"
            :key="question_answer_options"
            :for="key"
            v-for="question_answer_options, key in question[index]['question_answer_options']"
        >
       <input type="radio" :id="key" :value="key" @click="answered($event)" :disabled="selectedAnswer != ''" class="input__answer" >
       {{question_answer_options}}
        </label>
        <div class="QuizButtonNext">
          <button class="Quiz__button"
          v-show="selectedAnswer != '' && index < count-1"
          @click="nextQuestion"
          >
          Næste Spørgsmål
          </button>
          <button class="Quiz__button"
          v-show="selectedAnswer != '' && index == count-1"
          >
          Afslut
          </button>
        </div>
    </div>
    <div v-else>
      <div>
        <p class="text__answer">
          Rigtige svar:
          <span>{{correctAnswer}}</span>
        </p>
        <p class="text__answer">
          Forkerte svar:
          <span>{{wrongAnswer}}</span>
        </p>
      </div>
        <div>
          <button class="Quiz__button"
          @click="resetQuiz"
          > Spil igen</button>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit.js'
import {getDocs, collection } from 'firebase/firestore'

export default {
  name: "QuizComponent",
  data(){
    return {
      question:  [''],
      loading: true,
      index: 0,
      selectedAnswer: '',
      correctAnswer: 0,
      wrongAnswer: 0,
      count: 3
    }
  },
  methods: {
    fetchQuestions(){
    getDocs(collection(db, 'quiz/6RHmbcJSK4wTxWECNqpq/questions')).then((snapshot) => {
      let q = [];
        snapshot.docs.forEach((doc) => {
        q.push({...doc.data(), id: doc.id})
      })
      this.question = q;
      this.loading = false;
      })   
    },  
    answered(e) {
      this.selectedAnswer = e.target.value
        if (this.selectedAnswer == this.question[this.index]['question_answer_index'])
      this.correctAnswer++
        else
      this.wrongAnswer++
    },

    nextQuestion() {
      this.index++
      this.selectedAnswer = ''
    },

    showResults() {
      this.index++
    },

    resetQuiz(){
      this.index = 0 
      this.selectedAnswer = ''
      this.correctAnswer = 0
      this.wrongAnswer = 0
    },
  },
  mounted () {
    this.fetchQuestions();
  }
}
</script>

<style lang="scss">

</style>
