const express = require("express");
const path = require('path');
const app = express();
const userRoutes = require('../routes/userRoutes');
const cors = require('cors');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../../Client/build')));
}
app.use(express.static(path.join(__dirname, "../../Client/build")));
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use("/", userRoutes);
app.get('*',async (req,res)=>{
    res.sendFile(path.join(__dirname, "../../Client/build/index.html"));
})
// error handler
app.use(function (err, req, res, next) {
    try {
        res.status(err.status || 500);

        res.json({
            status: err.status,
            type: err.message
        });
        next();
    } catch (e) {
        console.log(e);
    }
});

module.exports = app;