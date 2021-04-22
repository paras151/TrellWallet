var mongoose = require("mongoose");
var DB = "mongodb+srv://paras:paras@cluster0.sdjrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser: true
})
.then(conn=>{
    console.log("Connected to DB")
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const walletSchema = new mongoose.Schema({
        walletId: String,
        userId: String,
        transactions: Array,
        balance:Number,
        lastUpdated:String
      
});;
const walletModel = mongoose.model("walletModel",walletSchema);

module.exports = walletModel;