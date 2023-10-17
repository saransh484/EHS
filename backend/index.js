const app = require('./app');
const db = require('./config/db')
const UserModel = require('./model/user.model');

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello Gautam Jaiswal");
});

app.listen(port, () => {
    console.log(`server listenig on port http://localhost:${port}`);
});