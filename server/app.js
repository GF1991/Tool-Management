var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');//用于req.body获取值的

var app = express();
app.use(bodyParser.json());

var url = "mongodb://localhost:27017/gfData";

// https://localhost:3000/queryPositionOfTools?name=dsdf&age=100


app.post("/queryPositionOfUser", function(req, res){    
    
    const num= req.body;
    findUser(num)
            .then(result => console.log(result) || res.status(200).send(result))
            .catch(err => res.status(500).send(err));
    });


app.get('/queryPositionOfTools', function(req, res){
    
    findTools()
        .then(result => console.log(result) || res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});


app.get('/queryPositionOfSource', function(req, res){
    findSource()
        .then(result => console.log(result) || res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

app.get("/queryPositionOfPosition", function(req, res){
    findPosition()
        .then(result => console.log(result) || res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

app.post("/queryUserTools", function(req, res){
    const {userName}= req.body;
    findUserTools(userName)
        .then(result => console.log(result) || res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});


app.post("/addPositionOfTools", function(req, res){
    const record = req.body;
    insertOneTool(record)
        .then(() => res.status(200).send("success"))
        .catch(err => res.status(500).send("fail"))
})

app.post("/deletePositionOfTools", function(req, res){
    const record = req.body;
    deleteOneTool(record)
        .then(() => res.status(200).send("success"))
        .catch(err => res.status(500).send("fail"))
})


app.get('/clearPositionOfTools', function(req, res){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gfData");
        dbo.collection("tools").drop(function(err, delOK) { 
            if (err) throw err;
            if (delOK) console.log("集合已删除");
            res.status(200).send("success");
            db.close();
        });
    });
  
});

  
app.listen(3000, function(){
    console.log("server is listening on 3000")
});


function findTools(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gfData");
            dbo.collection("tools"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                db.close();
            });
        });
    })  
}



function findSource(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gfData");
            dbo.collection("source"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                db.close();
            });
        });
    })  
}


function findPosition(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("gfData");
            dbo.collection("position"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                db.close();
            });
        });
    })  
}


function insertOneTool(record){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, connection) {
            if (err) throw err
            const db = connection.db("gfData");
            db.collection("tools").insertOne(record, function(err, res) {
                // record = {name, number}  
                if (err) {  
                    reject(err)
                } else {
                    resolve(res)
                    console.log("文档插入成功");
                }
                connection.close();
            });
        });
    })
}

function deleteOneTool(record){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, connection) {
            if (err) throw err
            const db = connection.db("gfData");
            db.collection("tools").deleteOne(record, function(err, res) {
                if (err) {  
                    reject(err)
                } else {
                    resolve(res)
                    console.log("文档删除成功");
                }
                connection.close();
            });
        });
    })
}



function findUser(num){
    return new Promise((resolve, reject) => {
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
     var dbo = db.db("gfData");
     var whereStr = num;  // 查询条件
    dbo.collection("userNum").find(whereStr).toArray(function(err, result) {
        if (err) {
            reject(err)
        } else {
            resolve(result);
        }
    
        db.close();
        
    });
});
})  


}

function findUserTools(userName){
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
             var dbo = db.db("gfData");
             var whereStr = {user: userName};  // 查询条件
            dbo.collection("tools").find(whereStr).toArray(function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            
                db.close();
                
            });
        });
    })  
}

