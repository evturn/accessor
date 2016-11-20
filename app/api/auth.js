import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
}

const selectErrorHandler = e => {
  switch (e.code) {
    case 'auth/account-exists-with-different-credential':
      return fetchProvidersForEmail

  }
}

export const onAuthStateChanged = observer => {
  return firebase
    .auth()
    .onAuthStateChanged(observer)
}

export const fetchProvidersForEmail = email => {

}

export const signInWithPopup = service => {
  return firebase
    .auth()
    .signInWithPopup(providers[service])
}

export const signInWithCredential = credential => {
  return firebase
    .auth()
    .signInWithCredential(credential)
    .then(x => console.log('sign in with credential', x))
}

export const linkWithPopup = provider => {
  return firebase
    .auth()
    .currentUser
    .linkWithPopup(provider)
    .then(x => {
      if (x.credential) {
        console.log('link with popup', x.user)
      }
    })
}

export const getRedirectResult = _ => {
  return firebase
    .auth()
    .getRedirectResult()
    .then(x => {
      if (x.credential) {
        console.log('get redirect result', x.user)
      }
    })
}



export const signOut = _ => {
  return firebase
    .auth()
    .signOut()
}