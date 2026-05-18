const express = require("express");
const urlRoute = require("./routes/url");
const connecttoMongoose = require("./routes/connect");
const URL = require("./models/url");
require("dotenv").config();

const app = express();

const PORT = 3000;

connecttoMongoose(
process.env.MONGO_URL
)
.then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.log("Error:", err);
});

app.use(express.json());

app.use("/url",urlRoute);

app.get('/:shortId', async(req,res)=>{

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }
    );

    if(!entry){
        return res.status(404).json({
            error:"Short URL not found"
        });
    }

    res.redirect(entry.redirectURL);

});

app.listen(PORT,()=>{
    console.log(`server is running at:${PORT}`);
});