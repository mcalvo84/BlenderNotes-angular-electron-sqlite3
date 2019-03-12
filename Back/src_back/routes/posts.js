module.exports = app => {

    const Posts = app.db.models.Posts;
    const PostController = app.controllers.PostController;

    console.log(app.controllers.PostController)
    app.route('/api/posts')
    .get((req, res) => {
        console.log()
        Posts.findAll({})
        .then(result  => {
            res.json(result)
        })
        .catch(error => {
            res.status(412).json({msg: error.message})
        });
    })
    .post((req, res) => {
        Posts.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message})
        });
    });
    
    app.route('/posts')
        .get((req, res) => {
            PostController.findAll(Posts, req, res);
        });

    app.route('/posts/add')
        .get((req, res) => {
            res.render('posts/add')
        })
        .post(async (req, res) => {
            PostController.createNewPost(Posts, req, res);
        });

    app.route('/posts/edit')
        .get((req, res) => {
            res.render('posts/add')
        })
        .post(async (req, res) => {
            PostController.updatePost(Posts, req, res);
        });
  
    app.route('/posts/delete/:id')
        .get((req, res) => {
            if (req.params.id) {
                return Posts.destroy({
                    where: req.params
                }).then(result => {
                    //res.json(result)
                    res.redirect('/posts')
                })
            }
        });

    app.route('/api/posts/:id')
        .get((req, res) => {            
            PostController.findOnePost(Posts, req, res);
        })
        .put((req, res) => {
            PostController.updatePost(Posts, req, res);
        })
        .delete((req, res) => {
            PostController.destroyPost(Posts, req, res);
        })
}