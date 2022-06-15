import db from '@/firebase/firebaseInit.js'
import { collection, query, where, documentId, onSnapshot } from "firebase/firestore";

export default {
    methods: {
        getUserData(userid){
            onSnapshot(query(collection(db, "userinfo"), where(documentId(), '==', userid)), (snapshot) => {
             snapshot.docs.forEach((doc) => {
             this.$store.state.userDataUpdate.push({...doc.data(), id: doc.id})
             })
           })
         } // getUserData END

    }
}