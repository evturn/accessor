export default firebase => {
  return [
    function getRecords(req, res, next) {
      const records = firebase
        .database()
        .ref('records')
        .orderByChild('user')
        .equalTo(req.params.user)
        .once('value')
        .then(x => x.val())
        .then(xs => xs.filter(x => x !== null))
        .then(xs => res.json(xs))
    }
  ]
}