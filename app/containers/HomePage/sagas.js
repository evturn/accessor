/* eslint-disable no-constant-condition */
import { take, call, put, select } from 'redux-saga/effects'

import {
  LOAD_RECORDS,
  LOAD_REPOS,
} from 'containers/App/constants'

import {
  recordsLoaded,
  recordsLoadingError,
  reposLoaded,
  repoLoadingError
} from 'containers/App/actions'

import request from 'utils/request'
import { selectUsername } from 'containers/HomePage/selectors'
import { selectCollection } from 'containers/HomePage/selectors'

export default [
  getGithubData,
  getRecords
]

export function* getRecords() {
  while (true) {
    yield take(LOAD_RECORDS)
    const records = yield select(selectCollection())
    const recs = yield call(request, '/api')

    if (recs.err === undefined || recs.err === null) {
      yield put(recordsLoaded(recs.data, records))
    } else {
      console.log(recs.err.response) // eslint-disable-line no-console
      yield put(repoLoadingError(recs.err))
    }
  }
}

export function* getGithubData() {
  while (true) {
    yield take(LOAD_REPOS)
    const username = yield select(selectUsername())
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`
    const repos = yield call(request, requestURL)

    if (repos.err === undefined || repos.err === null) {
      yield put(reposLoaded(repos.data, username))
    } else {
      console.log(repos.err.response) // eslint-disable-line no-console
      yield put(repoLoadingError(repos.err))
    }
  }
}
