export default firebase => {
  return {
    get: [
      findRecordsByUser
    ],
    create: [
      createRecord
    ],
    update: [
      updateRecords
    ],
    remove: [
      removeRecords
    ]
  }

  function findRecordsByUser(req, res, next) {
    const records = firebase
      .database()
      .ref(`records/${req.params.user}`)
      .orderByKey()
      .once('value')
      .then(x => x.val())
      .then(reduceRecords)
      .then(x => res.json(x))
      .catch(e => res.json(e))
  }

  function createRecord(req, res, next) {
    const key = firebase
      .database()
      .ref(`records/${req.params.user}`)
      .push()
      .key

    firebase
      .database()
      .ref()
      .update({ [`records/${req.params.user}/${key}`]: { ...req.body.record, id: key } })

    firebase
      .database()
      .ref(`records/${req.params.user}`)
      .once('value')
      .then(x => x.val())
      .then(reduceRecords)
      .then(x => res.json(x))
      .catch(e => res.json(e))
  }

  function updateRecords(req, res, next) {
    next()
  }

  function removeRecords(req, res, next) {
    next()
  }

  function reduceRecords(xs) {
    return Object.keys(xs).reduce((acc, x) => {
      const record = xs[x]
      if (!record.id) {
        record.id = x
      }
      acc.push(record)
      return acc
    }, [])
  }
}