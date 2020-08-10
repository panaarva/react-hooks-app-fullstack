const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const client = require('../lib/config').pool;
const {incode} = require('../lib/utils');
client.connect();

router.get('/', async (req, res, next) => {
    try {
        const response = await client.query(`SELECT *
                                           FROM public.user`);
        if (response.rows.length === 0) {
            next(createError(404, 'NOT FOUND'));
        } else {
            const authCode = incode(response,null);
            res.status(200);
            res.send(authCode);
        }
    } catch (e) {
        console.log(e);
        next(createError(404, 'NOT FOUND'));
    }
})
router.post('/', async (req, res, next) => {
    const {username, userpassword, email, gender, bornday} = req.body;
    try {
        const response = await client.query(`INSERT INTO public.user (username, userpassword, email, gender, bornday)
                                             VALUES ($1, $2, $3, $4, $5)
                                             RETURNING id`, [username, userpassword, email, gender, new Date(bornday)]);
        const {id} = response.rows[0];
        res.status(200);
        res.send(id);
    } catch (e) {
        next(createError(404, 'NOT FOUND'));
    }

})
router.delete('/', async (req, res, next) => {
    const {userId} = req.query;
    try {
        const {rows} = await client.query(`DELETE
                                           from public.user
                                           where id = $1`, [userId]);
        if (rows === 0) {
            next(createError(404, 'INVALID USER'));
        } else {
            res.status(200);
            res.send('success');
        }
    } catch (e) {
        console.log(e);
        next(createError(404, 'NOT FOUND'));
    }
})
router.put('/', async (req, res, next) => {
    const {username, userpassword, email, gender, bornday} = req.body;
    const {userId} = req.query;
    try {
        const {rows} = await client.query(`UPDATE public.user
                                           SET username     = $1,
                                               userpassword = $2,
                                               email        = $3,
                                               gender       = $4,
                                               bornday      = $5
                                           where id = $6 RETURNING id`, [username, userpassword, email, gender, new Date(bornday), userId]);
        if (rows.length === 0) {
            next(createError(404, 'INVALID USER'));
        } else {
            res.status(200);
            res.send('success');
        }
    } catch (e) {
        console.log(e);
        next(createError(404, 'NOT FOUND'));
    }

})
module.exports = router;