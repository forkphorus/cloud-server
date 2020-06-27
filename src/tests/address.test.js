const address = require('../address');

test('getForwardedFor', () => {
  // x-forwarded-for is set by the proxy so testing weird or invalid addresses is not a concern
  // if your proxy is sending invalid x-forwarded-for, you have other problems to worry about.
  expect(address.getForwardedFor({ 'x-forwarded-for': '123.123.123.123' })).toBe('123.123.123.123');
  expect(address.getForwardedFor({ 'x-forwarded-for': '2001:0db8:85a3:0000:0000:8a2e:0370:7334' })).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
  expect(address.getForwardedFor({ 'x-forwarded-for': '123.123.123.123,234.234.234.234' })).toBe('123.123.123.123');
  expect(address.getForwardedFor({ 'x-forwarded-for': '123.123.123.123 , 234.234.234.234' })).toBe('123.123.123.123');
  expect(address.getForwardedFor({ 'x-forwarded-for': '' })).toBe(null);
  expect(address.getForwardedFor({ })).toBe(null);
});

test('anonymizeAddress', () => {
  expect(address.anonymizeAddress('192.168.42.1')).toBe('192.168.0.0');
  expect(address.anonymizeAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:db8:85a3::');
  expect(address.anonymizeAddress('not.a.valid.address')).toBe(null);
  expect(address.anonymizeAddress('1.1.1')).toBe(null);
  expect(address.anonymizeAddress('')).toBe(null);
});
