
const express = require("express");
const port = 3000;
const app = express();
const cors = require('cors')
const Router = require("./Back/Routes/FilmeRoute");

app.use(express.json());
app.use(cors());

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
    );
    next();
});

app.use("/filmes", Router)

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});