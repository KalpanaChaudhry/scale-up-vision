import { findIndex } from 'lodash';

export function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return false;
  }
  return true;
}

export function checkIfRegistered(userName, allUsers) {
  return findIndex(allUsers, ['userName', userName]) > -1;
}

export function validatePassword(mail) {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(mail)) {
    return false;
  }
  return true;
}
