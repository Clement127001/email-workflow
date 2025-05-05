const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3001`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

module.exports = allowCrossDomain;
