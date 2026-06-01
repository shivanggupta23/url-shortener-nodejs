const express = require("express");
const urlRoute = require("./routes/url");
const connecttoMongoose = require("./routes/connect");
const URL = require("./models/url");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
    res.send(`
    <html>
    <body>
        <h2>URL Shortener</h2>

        <input id="url" placeholder="Enter URL" style="width:300px">
        <button onclick="shorten()">Shorten</button>

        <p id="result"></p>

        <script>
async function shorten() {
    const url = document.getElementById("url").value;

    const response = await fetch("/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await response.json();

    console.log("Response:", data);

    if (data.id) {
        const shortUrl =
            "https://url-shortener-nodejs-53fd.onrender.com/" + data.id;

        document.getElementById("result").innerHTML =
            \`<a href="\${shortUrl}" target="_blank">\${shortUrl}</a>\`;
    } else {
        document.getElementById("result").innerHTML =
            "Error: " + JSON.stringify(data);
    }
}
</script>
    </body>
    </html>
    `);
});

app.use("/url",urlRoute);

app.get('/:shortId', async(req,res)=>{

    const shortId = req.params.shortId;

    console.log("Searching for:", shortId);

const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
        $push:{
            visitHistory:{
                timeStamp: Date.now()
            }
        }
    }
);

console.log("Found entry:", entry);

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