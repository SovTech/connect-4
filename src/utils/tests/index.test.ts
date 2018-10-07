import { convertFileToImageURL, formatDate, formatEnum, isTokenValid, validateEmail } from '../index';

const FILE_URL = 'https://images.graph.cool/cjbt92ge110e50169zu7we9mq/cje8jhud21n4701064mujwxxm';
const JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY4MDQ2MTQsImlhdCI6MTUyNDIxMjYx' +
  'NCwicHJvamVjdElkIjoiY2pmdHRqaHhpM2R2OTAxMTJsNzMyNjdpcSIsInVzZXJJZCI6ImNqZzdvbjFwaTVwM2MwMTkyNng' +
  '1anM4MWUiLCJtb2RlbE5hbWUiOiJVc2VyIn0.H4mXTabiIbT-pubLJCI1TDN2hcgJaJXz9ad06nBa06I';

// Convert file to image
test('converting a file url returns the correct image url', () => {
  expect(convertFileToImageURL(FILE_URL)).toBe(FILE_URL + '/500x');
});

test('converting a file url returns the correct small image url', () => {
  expect(convertFileToImageURL(FILE_URL, true)).toBe(FILE_URL + '/x300');
});

test('expect function to return an error if no file url is passed', () => {
  expect(convertFileToImageURL(undefined)).toBe('');
});

// Format dates
test('formatting a date returns - if no date is passed in', () => {
  expect(formatDate('')).toBe('-');
});

test('formatting a date returns a date if one is passed in', () => {
  expect(formatDate('2018-03-01T12:50:12.000Z')).toBe('1 Mar 2018');
});

test('a null date doesn\'t cause an error', () => {
  expect(formatDate(undefined)).toBe('-');
});

// Validate emails
test('none valid email returns false', () => {
  expect(validateEmail('jono')).toBe(false);
});

test('valid email returns true', () => {
  expect(validateEmail('jono@sov.tech')).toBe(true);
});

test('a null value doesn\'t cause an error', () => {
  expect(validateEmail(undefined)).toBe(false);
});

// Tokens expiry
test('an expired token returns false', () => {
  expect(isTokenValid(JWT_TOKEN)).toBe(false);
});

// Format enum
test('a enum value gets formatted nicely', () => {
  expect(formatEnum('HELLO_THERE')).toBe('Hello there');
});

test('a weird enum value gets formatted nicely', () => {
  expect(formatEnum('HELLO_THERE____WHAT_HOW')).toBe('Hello there    what how');
});

test('an empty enum doesn\'t cause an error', () => {
  expect(formatEnum('')).toBe('');
});

test('a null enum doesn\'t cause an error', () => {
  expect(formatEnum(undefined)).toBe('');
});
