const express = require('express');
const app = express();

app.get('/wallet/:id', (req, res) => {
    res.send("wallet")
})

app.get('/user/:id', (req,res)=>{
    res.send(user);
})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App Listening at http://localhost:${port}`)
})