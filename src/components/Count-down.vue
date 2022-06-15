<template>
    <div>
      <div class="display-countdown">
        <div class="display-countdown__time">
          {{ displayDays }} Days 
          {{ displayHours }} Hours 
          {{ displayMinutes }} Minutes
          {{ displaySecounds }} Seconds
        </div>
        <h4 class="display-countdown__header">Next Lunar Eclipse - <span>8. November 2022</span></h4>
      </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        displayDays: 0,
        displayHours: 0,
        displayMinutes: 0,
        displaySecounds: 0
    }),
    computed: {
        _secounds: () => 1000,
        _minutes(){
            return this._secounds * 60
        },
        _hours(){
            return this._minutes * 60
        },
        _days(){
            return this._hours * 24
        }
    },
    mounted() {
        this.showRemaining()
    },
    methods: {
        showRemaining(){
            const timer = setInterval(() => {
                const now = new Date();
                const end = new Date(this.$store.state.nextLunarEclipse[0].event_timestamps[1].seconds * 1000) // her skal dataen ind fra apien, så vi kan få en dato på hvornår vi har næste solar eclipse
                const distance = end.getTime() - now.getTime();

                if(distance < 0) {
                    clearInterval(timer);
                    return
                }
                //console.log(this.$store.state.nextLunarEclipse[0].event_timestamps[0].seconds)
                const days = Math.floor((distance / this._days));
                const hours = Math.floor((distance % this._days) / this._hours);
                const minutes = Math.floor((distance % this._hours) /this._minutes);
                const secounds = Math.floor((distance % this._minutes) / this._secounds);
                this.displaySecounds = secounds < 10 ? "0" + secounds : secounds;
                this.displayMinutes = minutes < 10 ? "0" + minutes : minutes;
                this.displayHours = hours < 10 ? "0" + hours : hours;
                this.displayDays = days < 10 ? "0" + days : days;
            }, 1000);
        }
    }
};
</script>
<style scoped>
.display-countdown__header{
    display: inline-block;
}
</style>