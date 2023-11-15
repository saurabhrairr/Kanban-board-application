const Board = require('../models/Board');

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBoard = async (req, res) => {
  try {
    const board = new Board({
      name: req.body.name,
      description: req.body.description,
      columns: [
        { name: 'To Do', items: [] },
        { name: 'In Progress', items: [] },
        { name: 'Completed', items: [] },
      ],
    });
    const newBoard = await board.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createColumn = async (req, res) => {
  const { name } = req.body;
  const newColumn = { name, items: [] };

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      { $push: { columns: newColumn } },
      { new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getColumns = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board.columns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateColumn = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'columns._id': req.params.columnId },
      { $set: { 'columns.$.name': name } },
      { new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      { $pull: { columns: { _id: req.params.columnId } } },
      { new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const { name, description, dueDate } = req.body;
  const newItem = { name, description, dueDate };

  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'columns._id': req.params.columnId },
      { $push: { 'columns.$.items': newItem } },
      { new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    const column = board.columns.find(col => col._id == req.params.columnId);
    res.json(column.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  const { name, description, dueDate } = req.body;

  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'columns._id': req.params.columnId, 'columns.items._id': req.params.itemId },
      { $set: { 'columns.$[column].items.$[item].name': name, 'columns.$[column].items.$[item].description': description, 'columns.$[column].items.$[item].dueDate': dueDate } },
      { arrayFilters: [{ 'column._id': req.params.columnId }, { 'item._id': req.params.itemId }], new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'columns._id': req.params.columnId },
      { $pull: { 'columns.$.items': { _id: req.params.itemId } } },
      { new: true }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn,
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
