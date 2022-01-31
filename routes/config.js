const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'userdatabase.clv8u6q2qugn.us-east-2.rds.amazonaws.com',
        user: env.DB_USER || 'admin',
        password: env.DB_PASSWORD || 'password',
        database: env.DB_NAME || 'userdatabase',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;