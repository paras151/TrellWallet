const express = require('express');
const stripe = require("stripe")("sk_test_MgFRWqSGP7RlXOY2Tn7fs1V900KzGb6WvH");
const walletModel = require("./model/walletModel")
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const calculateOrderAmount = amount => {
    
    return amount;
  };

app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;
    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(amount),
      currency: "inr"
    });
    
    let wallet = await walletModel.find();
    await walletModel.findOneAndUpdate({balance:wallet[0].balance+amount/100})
    res.send({
      clientSecret: paymentIntent.client_secret
    });
    
  });

app.get('/wallet/topup',(req,res)=>{
    res.render("checkout.ejs");
})

app.get('/wallet', async (req, res) => {

    let result = await walletModel.find();
    res.render("wallet.ejs",{
        balance:result[0].balance
    })
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