module.exports = {
  development: {
    port: process.env.PORT || 3000,
    databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-teomh.azure.mongodb.net/cubicle?retryWrites=true&w=majority`
  },
  production: {
    port: process.env.PORT || 80,
    databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-teomh.azure.mongodb.net/cubicle?retryWrites=true&w=majority`
  }
}
