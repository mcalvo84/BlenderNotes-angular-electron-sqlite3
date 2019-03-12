/**
 * METHOD :: createNewPost()
 */
exports.createNewPost = (Posts, req, res) => {
    const { title, body } = req.body;
    const newPost = {
        title,
        body
    };
    return Posts.create(newPost)
    .then(result => {
        //console.log(result.dataValues.id)
        res.redirect('/api/posts/'+result.dataValues.id);
        //res.render('posts/list', {posts: [result]})
    })
}

/**
 * METHOD :: findAll()
 */
exports.findAll = (Posts, req, res) => {
    console.log(Posts)
    return Posts.findAll({})
    .then(posts  => {
        res.render('posts/list', {posts: posts})
    })
};

/**
 * METHOD :: updatePosts()
 */
exports.updatePost = (Posts, req, res) => {
    Posts.update(req.body, { 
        where: req.params 
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
        res.status(412).json({msg: error.message})
    });
}

/**
 * METHOD :: findOnePost()
 */
exports.findOnePost = (Posts, req, res) => {
    Posts.findOne({
        where: req.params
    })
    .then(result => {
        // res.json(result))
        res.render('posts/list', {posts: [result]})
    })
    .catch(error => {
        res.status(412).json({msg: error.message})
    });
}

/**
 * METHOD :: destroyPost()
 */
exports.destroyPost = (Posts, req, res) => {
    Posts.destroy({
        where: req.params
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
        res.status(412).json({msg: error.message})
    });
}