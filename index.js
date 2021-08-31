const { json } = require('express');
const express=require('express');
const mongoose= require('mongoose');


const app = express();

app.use(express,json());

mongoose.connect("mongodb://localhost:27017/Pokepi",{useNewUrlParser: true},()=>{
    console.log("mongo server connected");
} )

const pokemonSchema=new mongoose.Schema({
    name:String,
    type:String,
    imageUrl:String
})

const pokemonModel = new mongoose.model('Pokemons',pokemonSchema);

app.get("/poke",async(req,res)=>{
    let data=await pokemonModel.find();
    console.log(data);
    res.send("Hello");
})

app.get("/search/:name",async(req,res)=>{
    let name=req.params.name;
    let pokemon=await pokemonModel.find({name:name}); 
    res.send(pokemon);
})


app.get("/power/:type",async(req,res)=>{
    let type=req.params.type;
    let mons=await pokemonModel.find({type:type});
    res.send(mons);
})



app.post("/rhydon",(req,res)=>{
 let poke=req.body;
 let pokeObj= new pokemonModel(poke);

 pokeObj.save((err,data)=>{
     if(err===null){
         res.send({message:"Rhydon added"})
     }
 });
})





app.listen(8000,()=>{
    console.log("serevr is running");
})