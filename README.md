# Son-Goku
- Nodejs server realtime using Redis,socket.io,MongoDb.

[![build](https://img.shields.io/travis/USER/REPO.svg)](/dist/)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)
[![Dependency Status](https://david-dm.org/socketio/socket.io-client.svg)](/dist/)
[![devDependency Status](https://david-dm.org/socketio/socket.io-client/dev-status.svg)](/dist)
[![#rackt on freenode](https://img.shields.io/badge/irc-%23rackt%20%40%20freenode-61DAFB.svg?style=flat-square)](https://webchat.freenode.net/)

 	
### How to install
- Git clone my project:
- Install node_modules (npm i)
```
npm install
```
- Run project (npm run dev | npm start)
```
npm run dev
npm start
```

### Using.

- son-goku using nodejs to build a server. Using memory cache but using redis with real time.
- My structure's using a key-value database mlab mongoDb [MongoDb](https://mlab.com/) and using Redis free server at redislabs [Redis](https://redislabs.com/)
- You can read document about Redis at: [Redis document](https://redis.io/documentation)
- You can read document about MongoDb at: [Mongodb document](https://docs.mongodb.com/)
- I using many serve and have a feeling. If your project not cache data it will be slow but when i cache in my RAM of serve. That's so heavy and terrible when you have many collections or mant record.So , i using Redis ,this's a good tech and a perfect evolution for think. Now, at first time i add add collection regist memory at __storage__ to redis server. But how do we can real time data to all clients? It's a interest request. I provide location of redis to client request
  + First: Client connect to me, I emit data client has registed but i not. i check data and send it to redis. Client Request redis and cache to local memory. So quick to query in [React] or [Angular] client app or an other [Node Server]
  + Update: Client sent to serve data server received it and add to mongoDb phisical db and add to redis after. Then broadcast id to all client connected server.Client will request to redis and get it.If delete Client delete in local not request.
  + Format: I format all docment but using mongoDb native drive see it:[MongoDb Drive](https://www.npmjs.com/package/mongodb) . Using Model class i can controll flow data.With 5 format Array,Object,String,Number,Date.
  + Speed and Performance: This's importain .First request with be lower than last but.I will use a process help we add to redis auto.You see client work all with redis server help broadcast and send small data. Realtime will be fast.

### Adventage.

- Ofcouse : speed and perfomance. It's fast.
- Server: Work with may client .Reduce many task to server and client will process more.
- Extendable: Do anything you want.Provide for many react.

### Disadventage.

- Redis: Need more RAM.
- Register: Will be very slow with collection not regist redis. Server will process data and send back.But that is slow.
- Privacy: Now i can lock on client write because RedisLabs not support do it.That's so sad.

### License
- MIT