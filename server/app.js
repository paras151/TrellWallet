const express = require('express');
const walletModel = require("./model/walletModel")
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/wallet/', async (req, res) => {

    let result = await walletModel.find({});
    res.send(result)
})

app.get('/user/:id', (req,res)=>{
    res.send(user);
})

app.post('/wallet/add', async (req,res)=>{

    try{
        let result = req.body;
        let d = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        result.lastUpdated = `${da}-${mo}-${ye}`;

        result = await walletModel.create(req.body);

        res.status(201).json({
            result:result
        })
        }
        catch(err){
            console.log(err);
        }
})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App Listening at http://localhost:${port}`)
})