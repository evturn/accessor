import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import * as Actions from 'api/actions'

function configureAuth(config) {
  firebase.initializeApp(config)

  const getAuthProvider = service => {
    switch (service) {
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider()
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
      case 'github':
        return new firebase.auth.GithubAuthProvider()
    }
  }

  onAuthStateChanged(observer) {
    firebase
      .auth()
      .onAuthStateChanged(observer)
  },

  signInWithPopup(service) {
    return firebase
      .auth()
      .signInWithPopup(service)
  },

  linkWithPopup(service) {
    return firebase
      .auth()
      .currentUser
   ,   .linkWithPopup(service)
  }

  signInWithCredential(credential) {
    return firebase
      .auth()
      .signInWithCredential(credential)
  },

  getRedirectResult() {
    return firebase
      .auth()
      .getRedirectResult()
  },

  signOut() {
    firebase
      .auth()
      .signOut()
  },

  return class Auth extends Component {
    constructor(props) {
      super(props)
      this.unAuth = ::this.unAuth
      this.getAuth = ::this.getAuth
      this.authError = ::this.authError
      this.authChange = ::this.authChange
      this.authenticating = ::this.authenticating
      this.authWithProvider = ::this.authWithProvider
    }

    authenticating(payload) {
      this.props.authenticating(payload)
    }

    authChange(payload) {
      this.props.authChange(payload)
    }

    authError(e) {
      this.props.authError(e)
    }

    authWithProvider(service) {
      this.authenticating({ service })
      signInWithPopup(getAuthProvider(service))
    }

    getAuth() {
      onAuthStateChanged({
        next:  user => this.authChange({ user }),
        error: e    => this.authError({error: e.message})
      })
    }

    unAuth() {
      this.authChange({user: false})
      signOut()
    }

    componentWillMount() {
      this.getAuth()
    }

    render() {
      return this.props.children
    }
  }
}

export default connect(
  state => ({...state}),
  Actions
)(configureAuth({
  apiKey: 'AIzaSyBZ8bmsRvWKN8QcV4Al6cVux_b7BmCAoUg',
  authDomain: 'accessor-io.firebaseapp.com',
  databaseURL: 'https://accessor-io.firebaseio.com',
  storageBucket: "accessor-io.appspot.com",
  messagingSenderId: "149184924674",
}))
