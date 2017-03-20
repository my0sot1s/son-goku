var path = require('path');
const config = {
  dbGenUrl: dbInfor => {
    if (dbInfor.isLocal) {
      return `${dbInfor.url}:${dbInfor.port}/${dbInfor.dbName}`;
    } else {
      return `mongodb://${dbInfor.dbuser}:${dbInfor.dbpassword}@${dbInfor.url}:${dbInfor.port}/${dbInfor.dbName}`;
    }
  },
  logFile: path.join(__dirname, '/private/logger.txt'),// eslint-disable-line
  listHost: [
    'localhost:8080',
    'nodedata-api.herokuapp.com',
    'localhost:3000',
    'localhost:4000',
  ],
  httpMiddleWare: {
    middleware: function (req, res, next) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Accept-Patch', 'javascript/json;charset=utf-8');
      res.set('Allow', 'GET, HEAD, POST, DELETE, PUT, OPTION');
      res.set('Connection', 'close');
      next();
    },
    middlewareUpload: function (req, res, next) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Accept-Patch', 'javascript/json;charset=utf-8');
      res.set('Accept-Ranges', 'bytes');
      res.set('Allow', 'GET, HEAD, POST, OPTION');
      res.set('Connection', 'close');
      next();
    },
    multerConfig: {
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/'));// eslint-disable-line
      },
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, (err, raw) => {// eslint-disable-line
          cb(null, (raw.toString(`hex`) + Date.now()).substring(1, 32) + '.' + /\.(\w+)$/g.exec(file.originalname)[1]);// eslint-disable-line
        });
      },
    },
    checkall: function (req, res, next) {
      const header = req.headers;
      if (config.listHost.indexOf(header.host) === -1) {
        res.status(404).send('NOT FOUND');
        res.end();
      } else { return next(); }
    },
  },
  toText: function (str) {
    str = str.toLowerCase();// eslint-disable-line
    str = str.replace(/\s+|\-+/g, '').replace(/ă|ằ|ắ|ẳ|ẵ|ặ|ạ|à|á|ã|ả|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')// eslint-disable-line
      .replace(/ô|ồ|ố|ổ|ỗ|ộ|ơ|ờ|ớ|ở|ỡ|ợ|ò|ó|ỏ|õ|ọ/g, 'o')
      .replace(/đ/g, 'd').replace(/ư|ứ|ừ|ử|ự/g, 'u').replace(/ê|ề|ế|ể|ễ|ệ/g, 'e')
      .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, '?')// eslint-disable-line
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    return str;
  },

};
module.exports = {
  config,
};
