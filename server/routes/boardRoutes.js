const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.post('/', boardController.createBoard);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

router.post('/:id/columns', boardController.createColumn);
router.get('/:id/columns', boardController.getColumns);
router.put('/:boardId/columns/:columnId', boardController.updateColumn);
router.delete('/:boardId/columns/:columnId', boardController.deleteColumn);

router.post('/:boardId/columns/:columnId/items', boardController.createItem);
router.get('/:boardId/columns/:columnId/items', boardController.getItems);
router.put('/:boardId/columns/:columnId/items/:itemId', boardController.updateItem);
router.delete('/:boardId/columns/:columnId/items/:itemId', boardController.deleteItem);

module.exports = router;
