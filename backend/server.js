const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

//Routes
app.use("/users", require('./routes/userRoute'));
app.use("/books", require("./routes/bookRoute"));
app.use("/userbook", require("./routes/userBookRoute"));

app.listen(PORT, () => 
{
    console.log('Server is on !');
})

