const express=require('express')
const PORT=9080;
const fs=require("fs")
const app=express();
const path=require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine',"ejs")
app.use(express.static('public'))
app.get('/',(req,res)=>{
    // const np=Number(req.params.id)
  fs.readdir(`./files`,(err,file)=>{
    res.render("index",{file:file})
  })

    
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
res.redirect('/')
    })
})
app.get('/file/:filename',(req,res)=>{
  fs.readFile(`/files/${req.params.filename}`,"utf-8",(err,data)=>{
    res.render('show',{filename:req.params.filename,data:data})
  })
  

})

app.get('/edit/:filename',(req,res)=>{

  res.render('edit',{filename:req.params.filename})

})
app.post('/edit',(req,res)=>{
 fs.rename(`./files/${req.body.previous}`,`./files/${req.boby.new}`,(err,data)=>{
  res.redirect('/')
 })
})
app.listen(PORT,()=>{
    console.log('successful')
})