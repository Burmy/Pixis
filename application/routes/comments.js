var express = require('express');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var router = express.Router();
const { getRecentPosts, getPostbyId } = require('../middleware/postmiddleware')
const { create } = require('../models/Comments')

router.post('/create', (req, res, next) => {
    if (!req.session.username) {
        errorPrint("Must be logged in to comment")
        res.json({
            code: -1,
            status: "error",
            message: "Must be logged in to comment"
        })
    } else {
        let { comment, postId } = req.body;
        let username = req.session.username;
        let userId = req.session.userId;

        create(userId, postId, comment)
            .then((wasSuccessful) => {
                if (wasSuccessful != -1) {
                    successPrint(`comment was created for ${username}`)
                    res.json({
                        code: 1,
                        status: "success",
                        message: "comment created",
                        comment: comment,
                        username: username
                    })
                } else {
                    errorPrint('comment was not saved')
                    res.json({
                        code: -1,
                        status: "danger",
                        message: "comment was not created"
                    })
                }
            })
            .catch((err) => next(err));
    }

})

module.exports = router;
