
const express = require('express');

const app = express();

app.use(express.json());

const port = 1000
    
app.listen(port, () => {
    if (port) {
        console.log('Server listening on port ' + port);
    }
});