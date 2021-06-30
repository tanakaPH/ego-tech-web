import * as Express from 'express';

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();

// DB接続
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/mongo_db_1?authSource=admin`);

// ユーザ情報登録
router.post('/users', (req: Express.Request, res: Express.Response) => {
  const user = new User(req.body);
  user.save((err: any, addedUser: any) => {
    if (err)
      return res.status(400).json({
        errorMessage: 'failed to add the user.'
      });
    res.send(addedUser);
  });
});

// ユーザ情報取得（全件）
router.get('/users', (req: Express.Request, res: Express.Response) => {
  User.find({}, (err: any, users: any) => {
    res.send(users);
  });
});

// ユーザ情報取得（ID指定）
router.get('/users/:id', (req: Express.Request, res: Express.Response) => {
  const params = req.params.id;
  User.find({id: params}, (err: any, user: any) => {
    res.send(user);
  });
});

// ユーザ情報削除（全件）
router.delete('/users', (req: Express.Request, res: Express.Response) => {
  User.remove(({}, err: any)=> {
    res.send(true);
  });
});

// ユーザ情報削除（ID指定）
router.delete('/users/:id', (req: Express.Request, res: Express.Response) => {
  const params = req.params.id;
  User.remove({id: params}, (err: any, deletedUser: any) => {
    res.send(deletedUser);
  });
});

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {  // 変更箇所
  res.render('index', { title: 'Express' });
});

module.exports = router;
