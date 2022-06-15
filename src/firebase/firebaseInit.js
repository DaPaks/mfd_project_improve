import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import config from '@/firebase/config'

initializeApp(config)
const db = getFirestore();

export default db;