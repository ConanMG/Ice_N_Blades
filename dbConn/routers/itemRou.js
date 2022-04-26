const express = require('express')
const Item = require('../models/item')
const router = new express.Router()

router.post('/items', async (req, res) => {
    const item = new Item(req.body)

    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/items', async(req, res)=>{
    try{
        const items = await Item.find({})
        res.send(items)
    }
    catch(e){
        res.status(500).send()
        console.log(error);
    }
})

router.get('/items/:id', async(req, res)=>{
    const _id=req.params.id

    try{
        const item=await Item.findById(_id)

        if(!item){
            return res.status(404).send()
        }

        res.send(curso)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/items/:id', async(req, res)=>{
    try {
        const item = await Item.findByIdAndDelete(req.params.id)

        if (!item) {
            return res.status(404).send()
        }

        res.send(item)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router