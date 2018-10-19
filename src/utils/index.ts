import * as jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import packageJson from '../../package.json';
import { IS_TEST, JWT_LOCAL_STORAGE_KEY } from '../constants';

export function convertFileToImageURL(fileURL: string | undefined, small?: boolean): string {
  if (!fileURL) {
    return '';
  }
  return `${fileURL.replace('files', 'images')}${small ? '/x300' : '/500x'}`;
}

/**
 * Formats Grpahcool datestrings to a nice format - o/w the overhead of a lib
 * @param dateString
 * @returns {string}
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    return '-';
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function validateEmail(email: string | undefined): boolean {
  if (typeof email === 'undefined') {
    return false;
  }
  /* tslint:disable */
  return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
  /* tslint:enable */
}

/**
 * Checks if a token has not expired
 * @returns {*}
 */
export function isTokenValid(token: string | null) {
  if (!token) {
    return false;
  }
  try {
    const decodedJwt: any = jwtDecode(token);
    return decodedJwt.exp >= Date.now() / 1000;
  } catch (e) {
    return false;
  }
}

/**
 * Converts an Enum to sentence case
 * @param value
 * @returns {string}
 */
export function formatEnum(value: string | undefined): string {
  if (typeof value === 'undefined') {
    return '';
  }
  const result = value.toLowerCase().replace(/_/g, ' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Get a random property from an object
 * @param {Object} obj
 * @returns {any}
 */
export function pickRandomProperty(obj: Object) {
  let result;
  let count = 0;
  for (let prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
}

export function getUrlParameterByName(name: string, url?: string): string | null {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function uniqueArray(array: Array<any>, prop: string): Array<any> {
  return array.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

export function getPackageVersionNumber(): string {
  if (IS_TEST) {
    return 'x.x.x';
  } else {
    return packageJson.version;
  }
}

/**
 * Sorts an array without mutating the array passed to it
 * @param {Array<any>} array
 * @param compareFunction
 * @returns {any[]}
 */
export function immutableSort(array: Array<any>, compareFunction: any) {
  return array.slice(0).sort(compareFunction);
}

/**
 * Shows a toast notification at the bottom of the screen
 * @param {string} toastMessage
 * @param {number | false | undefined} autoClose
 */
export function showToast(toastMessage: string | JSX.Element, autoClose: number | false | undefined) {
  toast(toastMessage, {
    autoClose,
    position: toast.POSITION.BOTTOM_CENTER
  });
}

/**
 * Gets the User ID from the JWT in local storage
 * Useful to tell if the player is in the game
 */
export function getLoggedInUserId(): string {
  const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY) || '';
  const decodedJwt: any = jwtDecode(token);
  return decodedJwt.userId;
}
