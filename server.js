const express = require('express');
const { dbConnection } = require('./database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.db();
        this.middlewares();
        this.routes();
    }
    async db() {
        await dbConnection();
    }
    middlewares() {
        this.app.use( express.json() )
    }
    routes() {
        this.app.use('/api/users', require('./routes/user.route'));
        this.app.use('/api/auth', require('./routes/auth.route'));
    }
    listen() {
        this.app.listen( this.port, () => console.log('Esta vivo en el puerto ', this.port) )
    }
}

module.exports = Server;
