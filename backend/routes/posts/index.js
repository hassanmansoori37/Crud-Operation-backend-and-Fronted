import express from 'express'

const router = express.Router()

let allPost = []

router.post('/post' , (req, res) => {
    // console.log(req);
    
    if(!req.body.title){
        res.status(400).send({
            message: "title is required"
        })
    }

     if(!req.body.description){
        res.status(400).send({
            message: "description is required"
        })
    }

    // console.log(title);
    // console.log(description);

    const newPost = {
        title: req.body.title,
        description: req.body.description,
        id: new Date().getTime()
    }

    allPost.unshift(newPost)
    
    


    res.status(201).send({
        message: "post created"
    })
})

router.get('/post' , (req, res) => {
    res.status(200).send({
        message: "all post fetched",
        data: allPost
    })
})

router.get('/post/:postId' , (req, res) => {
    const postId = req.params.postId

    if(!postId){
        res.status(404).send({
            message: "post id is required"
        })
    }

    const post = allPost.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        res.status(404).send({
            message: "page not found"
        })
        
    }

    res.send({
        message: "post fetched",
        data: post
    })

})

router.put('/post/:postId' , (req, res) => {
     const postId = req.params.postId

         
    if(!req.body.title){
        res.status(400).send({
            message: "title is required"
        })
    }

     if(!req.body.description){
        res.status(400).send({
            message: "description is required"
        })
    }

    if(!postId){
        res.status(404).send({
            message: "post id is required"
        })
    }

    const post = allPost.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        res.status(404).send({
            message: "page not found"
        })
        
    }

    const newPost = allPost.map((singlePost) => {
        return singlePost.id == postId ? {
            ...singlePost,
            title: req.body.title,
            description: req.body.description,
        } : singlePost
    })

    allPost = newPost
    res.send({
        message: "post edited",
    })
})

router.delete('/post/:postId' , (req, res) => {
     const postId = req.params.postId

    if(!postId){
        res.status(404).send({
            message: "post id is required"
        })
    }

    const post = allPost.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        res.status(404).send({
            message: "page not found"
        })
        
    }

    const newPost = allPost.filter((singlePost) => {
        return singlePost.id != postId
    })

    allPost = newPost


    res.send({
        message: "post deleted"
    })
})


export default router