 import db from '@/firebase/firebaseInit.js'
 import { collection, query, getDocs, where, documentId } from "firebase/firestore";


 export default {
     methods: {
         async getUserBadges(userData){
             this.$store.state.userBadges = []
             for (let i = 0; i < userData.user_badges.length; i++) {
                 const q = query(collection(db, "badges"), where(documentId(), "==", userData.user_badges.badge_id[i]));
                 const querySnapshot = await getDocs(q);
                 querySnapshot.forEach((doc) => {
                 this.$store.state.userBadges.push({...doc.data(), id: doc.id})
             })
           }

         } // getUserShortcuts end

     }
 }