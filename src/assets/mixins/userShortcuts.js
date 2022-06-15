import db from '@/firebase/firebaseInit.js'
import { collection, query, getDocs, where, documentId } from "firebase/firestore";


export default {
    methods: {
        async getUserShortcuts(userData){
            this.$store.state.userShortcuts = []

            for (let i = 0; i < userData.user_shortcuts.length; i++) {
            const q = query(collection(db, "shortcuts"), where(documentId(), "==", userData.user_shortcuts[i]));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.$store.state.userShortcuts.push({...doc.data(), id: doc.id})
            })
          }
        } // getUserShortcuts end
    }
}