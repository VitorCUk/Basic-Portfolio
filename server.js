 /* ======== Require ========== */

 const express = require('express')
 const nunjucks = require("nunjucks")



 const server = express()
 const videos = require("./data")

 server.use(express.static('public'))
 server.set("view engine", "njk")

 nunjucks.configure("view", {
     express: server,
     autoescape: false,
     noCache: true,

 })



 server.get("/", function(req, res) {
     return res.render("index")
 })


 server.get("/portfolio", function(req, res) {


     return res.render("portfolio", { items: videos })
 })

 server.get("/video", function(req, res) {
     const id = req.query.id

     const video = videos.find(function(video) {
         if (video.id == id) {
             return true
         }

     })

     if (!video) {
         return res.send(" Video not fundo!")
     }


     return res.render("video", { item: video })
 })

 server.listen(5000, function() {
     console.log('server is running')
 })