import firebase from 'firebase'
import Axios from 'axios'

const config = {
  apiKey: 'AIzaSyDtFg8icEWaIN5jD67mz-EmNkI_qD_wMaY',
  authDomain: 'citas-b8afe.firebaseapp.com',
  projectId: 'citas-b8afe',
  storageBucket: 'citas-b8afe.appspot.com',
  messagingSenderId: '38435234907',
  appId: '1:38435234907:web:21c8240a7d706a3f5b8b7e',
  measurementId: 'G-0P8CDE5WZV'

}

firebase.initializeApp(config)
const db = firebase.firestore()
export { Axios, db }
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
