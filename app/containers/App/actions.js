import {
  SET_RECORD_ACTIVE,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
} from './constants'

export function setRecordActive(id) {
  return {
    type: SET_RECORD_ACTIVE,
    id,
  }
}

export function loadRecords() {
  return {
    type: LOAD_RECORDS,
  }
}

export function recordsLoaded(records) {
  return {
    type: LOAD_RECORDS_SUCCESS,
    records,
  }
}

export function recordsLoadingError(error) {
  return {
    type: LOAD_RECORDS_ERROR,
    error,
  }
}

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  }
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  }
}
