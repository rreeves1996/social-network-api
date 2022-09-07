const router = require('express').Router();
const {
    getThought,
    getThoughts,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought)
;

// /api/thoughts/:id
router.route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought)
;

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(newReaction)
;

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)
;

module.exports = router;