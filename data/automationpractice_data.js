const faker = require('faker');
const Factory = require('rosie').Factory;

Factory.define('user')
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('email', () => `qa.e4t${faker.random.number(9999)}${faker.internet.password(8)}-${new Date().getTime()}@gmail.com`)
  .attr('zip', () => '94104') // NOTE not all zip's produced by `faker.address.zipCode()` supports by carvana
  .attr('phoneNumber', () => faker.phone.phoneNumberFormat(1))
  .attr('pwd', 'qweqwe123')
  .attr('city', 'San Francisco')
  .attr('address', '1st Ave');


module.exports = Object.freeze({
  user1: {
    email: 'pdd99470@xoixa.com',
    password: 'password',
  },
  user2: {
    email: 'qa.e4t1251PWtH34Nm-1515146538736@gmail.com',
    password: 'qweqwe123',
    newPassword: 'password',
  },
  user3: {
    email: 'qa.e4t3435cIVdpQFj-1515147106537@gmail.com',
    password: 'qweqwe123',
  },
  user4: {
    email: 'qa.e4t487_AvEi7H3-1515147246452@gmail.com',
    password: 'qweqwe123',
  },
});
