const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  todo && await redis.incrAsync('added_todos');
  res.status(201).send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(204);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const singleTodo = await Todo.findById(req.todo.id);
  res.status(200).send(singleTodo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedResult = await Todo.findByIdAndUpdate(req.todo.id, req.body, {
    new: true,
    useFindAndModify: false
  });
  res.status(201).send(updatedResult);
});

router.use('/:id', findByIdMiddleware, singleRouter);


module.exports = router;
