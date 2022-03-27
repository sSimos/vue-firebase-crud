// import firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import { getAuth, onAuthStateChanged  } from "firebase/auth"
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'time-truck-66c9e.firebaseapp.com',
  projectId: 'time-truck-66c9e',
  storageBucket: 'time-truck-66c9e.appspot.com',
  messagingSenderId: '775854227105',
  appId: '1:775854227105:web:d3d772b40ff3145d063ae0'
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
// const usersCollection = db.collection('users')
// const tasksCollection = db.collection('tasks')

// const auth = getAuth()

export const authTest = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    // if (user.) {
    // User is signed in.
    console.log(user.emailVerified)
    // }
  })
  return true
}

export const dateToTimestamp = date => {
  return firebase.firestore.Timestamp.fromDate(date)
}

export const timestampToDate = timestamp => {
  return timestamp.toDate()
}

export const authCheck = () => {
  let isSigned = false
  let isMailVerified = false

  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      // console.log(user)
      isSigned = true
      isMailVerified = user.emailVerified
    }
  })

  return {
    signedIn: isSigned,
    mailVerified: isMailVerified
  }
}

export const authCheckWithCallback = callback => {
  firebase.auth().onAuthStateChanged(callback)
}

export const getMail = callback => {
  return firebase.auth().onAuthStateChanged(callback)
}

export const authLogout = (callback, errorCallback) => {
  firebase
    .auth()
    .signOut()
    .then(callback, errorCallback)
}

export const sendAnotherMail = () => {
  let user = firebase.auth().currentUser
  if (user != null) {
    user.sendEmailVerification()
    return true
  }
  return false
}

export const createTask = task => {
  let project = 1
  if (typeof task['user'] === 'undefined') {
    task['user'] = 'Default'
  }
  return db.collection('tasks' + project).add(task)
}

export const getTask = async id => {
  let project = 1
  const task = await db
    .collection('tasks' + project)
    .doc(id)
    .get()
  return task.exists ? task.data() : null
}

export const updateTask = (id, task) => {
  let project = 1
  return db
    .collection('tasks' + project)
    .doc(id)
    .update(task)
}

export const deleteTask = id => {
  let project = 1
  return db
    .collection('tasks' + project)
    .doc(id)
    .delete()
}

export const useLoadTasks = () => {
  let project = 1
  const tasks = ref([])
  const close = db.collection('tasks' + project).onSnapshot(snapshot => {
    tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return tasks
}

export const registerUser = async (user_email, user_password) => {
  try {
    const resgistration = await firebase
      .auth()
      .createUserWithEmailAndPassword(user_email, user_password)
    await resgistration.user.sendEmailVerification()
    return [true, '']
  } catch (e) {
    return [false, e.message]
  }
}

export const loginUser = (
  user_email,
  user_password,
  successCallback,
  failureCallback
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user_email, user_password)
    .then(userCredential => {
      // // Signed in
      // var user = userCredential.user;
      // // ...
      successCallback(userCredential)
    })
    .catch(error => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      failureCallback(error)
    })
}

export const sendMailPasswordReset = (
  email,
  successCallback,
  failureCallback
) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(successCallback)
    .catch(failureCallback)
}
