const express = require("express")


app=express()

const port = 2000



app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})