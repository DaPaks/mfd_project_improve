import db from '@/firebase/firebaseInit.js'
import { collection, query, onSnapshot, where} from "firebase/firestore";

export default {
    data(){
        return{
            eventData: ''
        }
    },
    methods: {
        getEventDate(){
            //const tempDate = ''
            onSnapshot(query(collection(db, "events"), where('event_name', '==','Lunar Eclipse')), (snapshot) => {
                snapshot.docs.forEach((doc) => {
                this.$store.state.nextLunarEclipse.push({...doc.data(), id: doc.id})
                })
              })
        }
    }
        
}