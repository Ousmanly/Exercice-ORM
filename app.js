import express from 'express'
import { config } from 'dotenv'
import prisma from './config/prisma.js';
import bodyParser from 'body-parser';


config();
const app = express()

app.use(bodyParser.json())

app.get('/taches', async function (_req, res) {
  const taches = await prisma.tache.findMany();
  res.json({taches})
})

app.post('/taches', async function (req, res) {
  const { title, decription } = req.body;
  const tache = await prisma.tache.create({ data:{title, decription}});
  await prisma.$disconnect();
  res.json({tache})
})

app.put('/taches/:id', async function (req, res) {
  let tache = null
  const id = Number(req.params.id);
  if(id){
    const { title, decription } = req.body;
    const check = await prisma.tache.findFirst({where: {id}})

    if(check){
        tache = await prisma.tache.update({where: {
        id: id,
      }, 
      data:{title, decription}})
    }
    
    await prisma.$disconnect();
  }
  res.json({tache})
})

const port = 3000
app.listen(port, ()=>{
    console.log(`The server is running in port ${port}`);
    
})