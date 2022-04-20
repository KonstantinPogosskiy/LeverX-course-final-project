export default () => ({
  port: 3000,
  database: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '1111',
    db: 'test',
    user: 'postgres',
  },
  mailer: {
    host: 'smtp.gmail.com',
    port: 465,
    user: 'pogosskiykonstantin@gmail.com',
    password: 'Witcher1993',
    from: '"No Reply" <pogosskiykonstantin@gmail.com>',
  },
  stripe: {
    sKey: 'sk_test_51KdeOgHPxc0ypxONFmYfr5N1SbjUZgtEcjLnXnlS42iFfia4WBBdsraDIy5rbDKwttxgFItHG2uNdm9CGKE01KVi00azfLYUNR',
  }
});

