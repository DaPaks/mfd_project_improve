import { createStore } from 'vuex'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import db from '@/firebase/firebaseInit.js'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

const store = createStore({
    state: {
        getLat: '40',
        getLon: '50',
        newLat: '',
        shortcutRouteTemp:'',
        clickedForModal: '',
        modalOpen: false,
        profileEditTemp:'',
        auth: getAuth(),
        isLoggedIn: false,
        userData: null,
        userShortcuts: [],
        userBadges: [],
        nextLunarEclipse: [],
    },
    mutations: {
        setUser(state, user) {
          state.userData = user;
        },
        setUserBadges(state, badges) {
          state.userData.user_badges = badges;
        },
        setUserCompletion(state, completions) {
          state.userData.question_completion = completions;
        },
        setLogin(state, loginBool) {
          state.isLoggedIn = loginBool;
        },
        resetUser(state) {
          state.userData = null;
        },
        setEmail(state, email) {
          state.userData.email = email;
        },
        setShortcuts(state, shortcuts) {
          state.userData.user_shortcuts = shortcuts
        }
    },
    actions: {
      fetchUser(context, user) {
        getDoc(doc(db, 'userinfo', user.uid)).then((doc) => {
          context.commit('setUser', {...doc.data(), user_id: doc.id})
          context.commit('setLogin', true);
          context.commit('setEmail', user.email);
          if (doc.data().user_shortcuts == undefined) {
            context.commit('setShortcuts', ['6DjvLwu4JFpFZFPH7ZDR', 'cGE11KXamIb47wW9ztS8', 'JxUSSbM9C55xIJjyDpHL', 'F6N4XcJjvgU8yACZRlyK'])
          }
        });
        let badgeArray = [];
        getDocs(collection(db, `userinfo/${user.uid}/user_badges`)).then((snapshot) => {
          snapshot.forEach((doc) => {
            badgeArray.push({ ...doc.data(), badge_id: doc.id })
          })
          context.commit('setUserBadges', badgeArray);
        });
        let completionArray = [];
        getDocs(collection(db, `userinfo/${user.uid}/question_completion`)).then((snapshot) => {
          snapshot.forEach((doc) => {
            completionArray.push({ ...doc.data(), question_id: doc.id })
          });
          context.commit('setUserCompletion', completionArray);
        });
      }, //fetchUser end

      logOutUser() {
        this.commit('resetUser');
        this.commit('setLogin', false)
      }
    },
    
    getters: {

    }
});

// Listen to login
onAuthStateChanged(store.state.auth, (user) => {
  if (user) {
    store.dispatch('fetchUser', user);
  } else {
    store.dispatch('logOutUser');
  }
});

export default store;