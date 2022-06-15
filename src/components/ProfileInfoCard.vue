<template>
    <div class="infoCard">
        <p v-if="this.successMsg">Changes successful!</p>
        <p v-for="error in this.errorMsg" :key="error">{{ error }}</p>
        <!-- 
            input:        'name' value used to compare with to get right buttons
                          ':value' value comes from store (should be database). display user info

            button(edit): 'v-if' hides the button when one of the edit buttons are clicked
                          'for' used to compare to get the matching input
                          '@click' event to fire the funktion to start edit and disables the other buttons

            button(Undo)  'v-if' to show the button if edit is clicked and to show the matching undo button
                          '@click' event to fire the funktion to reset all changes
                          
            button(save)  'v-if' to show the button if edit is clicked and to show the matching undo button
                          '@click' event to fire the funktion to save changes and reset the edit
                        
        -->

        <!-- Username -->
        <label class="infoCard__label" for="user_name">Username</label>
        <input class="infoCard__input" name="user_name" type="text" :value="this.user.user_name" disabled placeholder="Jens">
        <button v-if="this.showNextBtn === '' || this.showNextBtn === 'user_email' || this.showNextBtn === 'user_password'" 
        class="infoCard__button editUsername" for="user_name" @click="profileEdit($event)" :disabled="false">Edit</button>

        <button class="infoCard__button undoName infoCard__undo" for="user_name" v-if="this.showNextBtn === 'user_name'" 
        @click="toggleAllProfileInputs($event)"></button>
        <button class="infoCard__button" v-if="this.showNextBtn === 'user_name'" for="user_name" @click="saveEdit($event)">Save</button>

        <!-- E-mail -->
        <label class="infoCard__label" for="user_email">E-mail</label>
        <input class="infoCard__input" name="user_email" type="email" :value="this.user.user_email" disabled placeholder="jens@test.dk">
        <button v-if="this.showNextBtn === '' || this.showNextBtn === 'user_name' || this.showNextBtn === 'user_password'" class="infoCard__button editEmail" for="user_email" @click="profileEdit($event)" :disabled="false">Edit</button>
        <button class="infoCard__button undoName infoCard__undo" for="user_email" v-if="this.showNextBtn === 'user_email'" @click="toggleAllProfileInputs($event)"></button>
        <button class="infoCard__button" v-if="this.showNextBtn === 'user_email'" for="user_email" @click="saveEdit($event)">Save</button>
        
        <!-- Password -->
        <label v-if="this.passEdit === false" class="infoCard__label" for="user_password">Password</label>
        <input v-if="this.passEdit === false" class="infoCard__input" name="user_password" type="password" :value="this.user.user_password" disabled placeholder="******">

        <!-- Old password -->
        <label v-if="this.passEdit === true" class="infoCard__label" for="user_password">Old password</label>
        <input v-if="this.passEdit === true" class="infoCard__input enableEditPass" name="user_password" type="password">

        <!-- password buttons -->
        <button v-if="this.showNextBtn === '' || this.showNextBtn === 'user_name' || this.showNextBtn === 'user_email'" class="infoCard__button editPassword" for="user_password" @click="profileEdit($event)" :disabled="false">Change</button>
        <button class="infoCard__button editPass infoCard__undo" for="user_newPassword" v-if="this.showNextBtn === 'user_password'" @click="toggleAllProfileInputs($event)"></button>
        <button  v-if="this.showNextBtn === 'user_password'" class="infoCard__button editPass" for="user_password" @click="saveEdit($event)">Save</button>

        <!-- New password -->
        <label v-if="this.passEdit === true" class="infoCard__label" for="user_newPassword">New password</label>
        <input v-if="this.passEdit === true" class="infoCard__input newPass" name="user_newPassword" type="password" :value="newPass">

        <!-- confirm new password -->
        <label v-if="this.passEdit === true" class="infoCard__label" for="user_confNewPassword">Confirm new password</label>
        <input v-if="this.passEdit === true" class="infoCard__input confNewPass" name="user_confNewPassword" type="password" :value="confNewPass">

    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'ProfileInfoCard',
    data(){
        return{
           user: [], // for saving the current user
           showNextBtn:'', // for toggle edit & save buttons
           passEdit:false, // for toggle password edit inputs
           userId: 1, // user id comes from session when logged in
           newPass:'', // storing when inputting new pass
           confNewPass:'', // storing when inputting new pass again
            errorMsg: [], // validation error message
            valPass: false,
            successMsg:false,
            format: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, // special chars for validation
        }
    },
    methods: {
        // when clicking edit button
        profileEdit(event){
            // saving all the edit buttons
            const editButtons = document.querySelectorAll('.infoCard__button')

            // saving clicked button
            let clickedButton =  document.querySelector(`[name="${event.target.getAttribute('for')}"]`)

            //this.$store.state.profileEditTemp = clickedButton.value

            // Get the input where attribute name = the for attribute on clicked button
            clickedButton.disabled = false;

            // iterate through all edit buttons and disable them
            for (var i = 0; i < editButtons.length; i++) {
                editButtons[i].disabled = true
            }

            // value = to value of the 'for' attribute of the clicked button. This makes the correct save button to show.
            this.showNextBtn = event.target.getAttribute('for')

            // checks if the edit button is for the password
            if(clickedButton.name === 'user_password'){
                // shows the edit password inputs
                this.passEdit = true

            }
        },
        // funktion when clicking the save button
        saveEdit(event){

            let saveInfoColName = document.querySelector(`[name="${event.target.getAttribute('for')}"]`).name
            let saveValue = document.querySelector(`[name="${event.target.getAttribute('for')}"]`).value
            this.errorMsg = []
            this.$store.state.profileEditTemp = saveValue
            // fires the right validation funktions
            if(saveInfoColName === 'user_name'){
                this.usernameValidation(saveValue)
            }else if(saveInfoColName === 'user_email')
            {
                this.emailValidation(saveValue)
            }else{
                this.passValidation()
            }

            // Fire the toggle funktion to reset the inputs and button - above code executes first so new values should be replacing 
            // the input value

            if(this.valPass === true){
                this.successMessage()
                this.toggleAllProfileInputs(event)
            }
            
        },
        // funktion when clicking the X button, also fires at the end of save button funktion (saveEdit)
        toggleAllProfileInputs(event){
            const editButtons = document.querySelectorAll('.infoCard__button')
            // save the input we are editing in
            let currentInput = document.querySelector(`[name="${event.target.getAttribute('for')}"]`)
            // changes the input value back to the old value
            currentInput.value = this.$store.state.profileEditTemp
            

            // disables the input again
            currentInput.disabled = true

            // this hides the X and Save buttons
            this.showNextBtn = ''

            // We clear the store temp data
            this.$store.state.profileEditTemp = ''

            // clear error messages on validation
            this.errorMsg = []

              // Get the input where attribute name = the for attribute on clicked button
            this.disabled = false;

            // iterate through all edit buttons and disable them
            for (var i = 0; i < editButtons.length; i++) {
                editButtons[i].disabled = false
            }
            // hides the edit password inputs
            this.passEdit = false
            
            this.valPass = false
        },
        // Username validation funktion - takes the input field as prop to send further down into validationSuccess
        usernameValidation(input){
            // storess the current temp data for easier use
            const tempData = this.$store.state.profileEditTemp
            
           // this.oldPass = this.user.
            if(!tempData){ // check if empty

                this.errorMsg.push('Enter a new username')
            }else if(tempData.length < 5){ // check if at least 5 chars
                this.errorMsg.push('Username should be at least 5 characters')
                if(this.format.test(tempData)){
                    this.errorMsg.push('Username cant contain special characters or spaces')
                }
                    
            }else if(this.format.test(tempData)){
                this.errorMsg.push('Username cant contain special characters or spaces')
            }else{
                this.valPass = true

                // Here we update the database with input
                this.user.user_name = input

                // clear temp
                this.$store.state.profileEditTemp = ''
            }
            
           
        },
        emailValidation(input){
            console.log(input)
            // storess the current temp data for easier use
            const tempData = this.$store.state.profileEditTemp
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(!tempData){ // check if empty

                  console.log('E-mail is empty')  
            }else if(!tempData.match(mailFormat)){ // check if at least 5 chars
                console.log(' not Success')

            }else{
                // confirm that validation is good
                this.valPass = true

                // Here we update database with input
                this.user.user_email = input

                // clear temp
                this.$store.state.profileEditTemp = ''
            }
        },
        // Validation of password when changing it
        passValidation(input){
            const tempData = this.$store.state.profileEditTemp
            this.newPass = document.querySelector('.newPass').value

            function hasNumbers(str){
                return /\d/.test(str)
            };

            if(!tempData){ // check if empty
                this.errorMsg.push('Enter your old password')
            }else if(tempData !== this.user.user_password){ // check if old code match with input
                this.errorMsg.push('Did not match old password')
            }else if(!this.newPass){ // check if there's been input a new password
                this.errorMsg.push('Enter a new password')
            }else if(this.newPass.length < 6){ // check if new password is at least 6 characters
                this.errorMsg.push('Password must be at least 6 characters')
            }else if(hasNumbers(this.newPass) === false){ // check if new password has at least 1 number
                this.errorMsg.push('New password must contain a number')
            }else if(this.newPass !== document.querySelector('.confNewPass').value){ // check if confirm password matches new password
                this.errorMsg.push('Confirm password did not match new password')
    
                this.confNewPass = ''
            }else{
                // confirm that validation is good
                this.valPass = true

                // Here we update database with this.newPass

                // clear temp
                this.$store.state.profileEditTemp = ''
            }
            
        },
        successMessage(){
            this.successMsg = true;
            setTimeout(()=>{
                this.successMsg = false;
            },3000);
        }
    },
    mounted(){
        // saves the user info from user id - currently from store, should be from database 
        //this.user = this.$store.state.userData.Users.find(item => item.user_id === this.userId)
        
    }
}
</script>

