import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BoardList.css"

function App() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showUpdateFields, setShowUpdateFields] = useState(false);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await axios.get('http://localhost:8002/api/boards');
        setBoards(response.data);
      } catch (error) {
        setError('Error fetching boards');
        console.error('Error fetching boards:', error);
      }
    }

    fetchBoards();
  }, []);

  function deletuser(_id) {
    fetch(`http://localhost:8002/api/boards/${_id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        const resp = await res.json();
        console.log(resp);
        alert("delete ");
        setBoards(prevBoards => prevBoards.filter(board => board._id !== _id));
      })
      .catch(error => {
        console.error('Error deleting board:', error);
      });
  }

  function updatedata(_id) {
    const updatedData = {
      name: updatedName,
      description: updatedDescription,
    };

    fetch(`http://localhost:8002/api/boards/${_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (res) => {
        const resp = await res.json();
        console.log(resp);
        alert("update ");
        setBoards(prevBoards =>
          prevBoards.map(board =>
            board._id === _id ? { ...board, ...updatedData } : board
          )
        );
        setShowUpdateFields(false);
      })
      .catch(error => {
        console.error('Error updating board:', error);
      });
  }

  function handleUpdateClick() {
    setShowUpdateFields(true);
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Kanban Boards</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {boards.map((board) => (
            <li key={board._id} className="list-group-item">
              <h2>{board.name}</h2>
              <p>Description: {board.description}</p>
              <button className="btn btn-danger mr-2" onClick={() => deletuser(board._id)}>Delete</button>
              {showUpdateFields ? (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Updated Name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Updated Description"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={() => updatedata(board._id)}>Update</button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
              )}
              <h3>Columns:</h3>
              <ul className="list-group">
                {board.columns.map((column) => (
                  <li key={column._id} className="list-group-item">
                    <p>Column Name: {column.name}</p>
                    <h4>Items:</h4>
                    <ul className="list-group">
                      {column.items.map((item) => (
                        <li key={item._id} className="list-group-item">
                          <p>Item Name: {item.name}</p>
                          <p>Description: {item.description}</p>
                          {item.dueDate && <p>Due Date: {item.dueDate}</p>}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
