const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

module.exports = allowCrossDomain;
