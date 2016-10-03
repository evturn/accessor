export default firebase => {
  return [
    function getRecords(req, res, next) {
      const rootRef = firebase.database().ref()
      rootRef.once('value', snapshot => res.json(snapshot.val()))
    }
  ]
}