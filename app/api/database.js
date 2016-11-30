import { firebaseAuth, firebaseDatabase, firebaseStorage } from 'api'

export const currentUser = _ => firebaseAuth().currentUser

export const userRef = _ => firebaseDatabase()
  .ref(`users/${firebaseAuth().currentUser.uid}`)

export const recordsRef = _ => firebaseDatabase()
  .ref(`records/${firebaseAuth().currentUser.uid}`)

export const storageRef = _ => firebaseStorage()
  .ref(`users/${firebaseAuth().currentUser.uid}`)

export const recordsRefToList = val => {
  return Object.keys(val)
    .map(x => ({
      id: x,
      data: Object.keys(val[x])
        .map(y => ({id: y, ...val[x][y]}))
    }))
}

export { firebaseStorage }