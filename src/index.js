const express = require('express'); 

const api = express();

api.listen(3000, () => {
    console.log('Activate initiative API');
});

api.get('/', (req, res) =>{
    res.send('Hello, world!');
})
