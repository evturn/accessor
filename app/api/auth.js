import firebase from 'firebase'

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

export const promptUserWithService = e => {
  return fetchProvidersForEmail(e.email)
    .then(throwProviderError)
    .then(message => ({ ...e, message }))
}

function throwProviderError(provider) {
  const service = provider.length ? provider[0] : ''

  switch (service) {
    case 'google.com':
      return providerError(`Google`)
    case 'twitter.com':
      return providerError(`Twitter`)
    case 'github.com':
      return providerError(`Github`)
    default:
      return `Network Error! Actually I don't know what happened.`
  }
}

function providerError(service) {
  return [
    `This email is already linked with ${service}.`,
    `Please use ${service} to log in so you can use both.`
  ].join('\n')
}

export const linkWithPopup = service => {
  return firebase
    .auth()
    .currentUser
    .linkWithPopup(providers[service])
}

export const signInWithCredential = credential => {
  return firebase
    .auth()
    .currentUser
    .signInWithCredential(credential)
}