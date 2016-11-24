import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
})

export const firebaseRef = firebase.database().ref()
export const firebaseAuth = firebase.auth

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
}

export const signInWithPopup = service => {
  return firebase
    .auth()
    .signInWithPopup(providers[service])
}

export const fetchProvidersForEmail = email => {
  return firebase
    .auth()
    .fetchProvidersForEmail(email)
}

export const link = credential => {
  return firebase
    .auth()
    .currentUser
    .link(credential)
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

export const signInWithCredential = credential => {
  return firebase
    .auth()
    .signInWithCredential(credential)
    .then(x => console.log('sign in with credential', x))
}

const createProviderError = provider => {
  const service = provider.length ? provider[0] : ''
  const msg = x => [
    `This email is already linked with ${x}.`,
    `Please use ${x} to log in so you can use both.`
  ].join('\n')
  switch (service) {
    case 'google.com':
      return msg(`Google`)
    case 'twitter.com':
      return msg(`Twitter`)
    case 'github.com':
      return msg(`Github`)
    default:
      return `Network Error! Actually I don't know what happened.`
  }
}

export const promptUserWithService = e => {
  return fetchProvidersForEmail(e.email)
    .then(createProviderError)
    .then(message => ({ ...e, message }))
}