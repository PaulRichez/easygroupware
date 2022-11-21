module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ["WfTliQtLYmN7nQtT4R8z0g==", "sTGFqRTo/cNwPZDdy/MCKw=="]),
    secret: env('ADMIN_JWT_SECRET', '1e978b20a8532605b42d18bf01ea37f4'),
  },
});
