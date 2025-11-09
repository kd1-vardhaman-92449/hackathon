const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const createResult = require("../utils/result");

// // Quotes endpoints

// // 1: GET /quotes/:id - Get All quotes
router.get("/:id", (req, res, next) => {
  const sql =
    "SELECT q.id AS quoteId, q.author, q.contents, q.createdTime, CASE WHEN f.id IS NOT NULL THEN 'LIKED' ELSE 'NOT_LIKED' END AS likeStatus FROM quote q LEFT JOIN favourite f ON q.id = f.quoteId AND f.userId = ? ORDER BY q.createdTime DESC";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return next(err);
    res.send(createResult(null, result));
  });
});


// // 2: GET /quotes/favourite/:id - Get All favourite quotes
router.get("/favourite/:id", (req, res, next) => {
  const sql =
    "SELECT q.id AS quoteId, q.author, q.contents, q.createdTime, 'LIKED' AS likeStatus FROM quote q, favourite f WHERE f.userId = ? AND q.id = f.quoteId ORDER BY q.createdTime DESC";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return next(err);
    res.send(createResult(null, result));
  });
});

// 3: GET /quotes/my/:id - Get Food Item by ID
router.get("/my/:id", (req, res, next) => {
  const sql =
    "SELECT q.id AS quoteId, q.author, q.contents, q.createdTime FROM quote q WHERE q.userId = ? ORDER BY q.createdTime DESC";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return next(err);
    let quotes = null;
    let error = err;
    if (result.length > 0) quotes = result;
    else error = "Quotes not found";
    res.send(createResult(error, quotes));
  });
});

// 3: POST /quotes - Add New Quotes
router.post('/', (req, res, next) => {
    // INSERT INTO quote (author, contents, userId) VALUES ('Swami Vivekananda', 'Arise, awake, and stop not until the goal is reached.', 1),
    const sql = "INSERT INTO quote (author, contents, userId) VALUES (?, ?, ?)"
    const {author, contents, userId} = req.body;
    db.query(sql, [author, contents, userId], (err, result) => {
        if(err)
            return next(err)
        const quote = { id: result.insertId, author: author, contents: contents }
        res.send(createResult(null, quote))
    })
})

// 4: PUT /quotes/:id - edit quote
router.put('/:id', (req, res, next) => {
    const sql = "UPDATE quote SET author = ?, contents = ? WHERE id = ?"
    const { author, contents } = req.body;
    const { id } = req.params
    db.query(sql, [author, contents, id], (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('Quote not found', null))
        res.send(createResult(null, 'Quote updated'))
    })
})

// 5: DELETE /quotes/:id - Delete quote
router.delete('/:id', (req, res, next) => {
    const sql = "DELETE FROM quote WHERE id = ?"
    const { id } = req.params
    db.query(sql, id, (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('quote not found', null))
        res.send(createResult(null, 'quote deleted'))
    })
})


// 6: POST /quotes/like - Quote like
router.post('/like', (req, res, next) => {
    // INSERT INTO favourite (userId, quoteId) VALUES (1, 2), (2, 1),      
    const sql = "INSERT INTO favourite (userId, quoteId) VALUES (?, ?)"
    const {userId, quoteId} = req.body;
    db.query(sql, [userId, quoteId], (err, result) => {
        if(err)
            return next(err)
        const like = { id: result.insertId, userId: userId, quoteId: quoteId }
        res.send(createResult(null, like))
    })
})


// 7: DELETE /quotes/like/:userId/:quoteId - Delete quote
router.delete('/like/:userId/:quoteId', (req, res, next) => {
    const sql = "DELETE FROM favourite WHERE userId = ? AND quoteId = ?"
    const { userId, quoteId } = req.params
    db.query(sql, [userId, quoteId], (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('not found', null))
        res.send(createResult(null, 'unliked'))
    })
})

module.exports = router;
