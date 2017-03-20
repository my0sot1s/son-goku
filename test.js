import Redis from './src/lib/RedisClass';
import conf from './src/initialize';
// console.log(conf.get());
const redis = new Redis(
  16703,
  'redis-16703.c10.us-east-1-2.ec2.cloud.redislabs.com'
);
const mang = ['Images', 'Users', 'adadasda'];
for (let i = 0; i < mang.length; i++) {

  console.log(redis.hlen(mang[i]));
  redis.quit();
}

// redis.setter("Images", 18, '{ "_id": 18, "productId": 1233, "links": [] }', 2).then(r => {
//   console.log(r);
// }).catch(e => {
//   console.log(e);
// });
// redis.del('Images', '15', conf.get('RedisType:H')).then(r => {
//   console.log(r);
// }).catch(e => {
//   console.log(e);
// });

// redis.getall('Images').then(r => {
//   console.log(r);
// });
