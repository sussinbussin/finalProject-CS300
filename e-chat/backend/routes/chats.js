const router = require('express').Router();
let Chat = require('../models/chat.model');

router.route('/').get((req, res) => {
  Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const newChat = new Chat({
    username,
    description,
  });

  newChat.save()
  .then(() => res.json('Chat added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Chat.findById(req.params.id)
    .then(chat => res.json(chat))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then(() => res.json('Chat deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Chat.findById(req.params.id)
    .then(chat => {
      chat.username = req.body.username;
      chat.description = req.body.description;

      chat.save()
        .then(() => res.json('Chat updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;