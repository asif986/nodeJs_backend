const Post = require("../models/post");

exports.createPost = (req, res, next) => {
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId

    });

    // console.log(req.body);
    // return;
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                ...createdPost,
                postId: createdPost._id

            }
        });
    });
}

exports.updatePost = (req, res, next) => {
    // console.log(req.body);
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename

    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    console.log(post);

    Post.updateOne({ _id: req.params.id }, post).then(res1 => {
        //   console.log(res1);
        res.status(200).json({ message: 'post update successfully' });

    });
}

exports.getPosts = (req, res, next) => {
    console.log(req.query)

    // pageSize means current page data
    //page means current page.
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchPost;
    // If pageSize and currentPage are not undefined (if they are both set and contain valid values)

    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(documents => {
        fetchPost = documents;
        return Post.count();

    }).then(count => {
        res.status(200).json({
            message: 'posts fetch successfully',
            posts: fetchPost,
            maxPosts: count
        })
    })
}

exports.getPost = (req, res, next) => {


    console.log(req.params);
    Post.findById({ _id: req.params.id }).then(doc => {
        if (doc) {
            res.status(200).json(doc);

        } else {
            res.status(404).json({ message: 'post not found' })
        }
    })
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
}