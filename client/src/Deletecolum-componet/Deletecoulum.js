import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Deletecoulum() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await axios.get("http://localhost:8002/api/boards");
        setBoards(response.data);
      } catch (error) {
        setError("Error fetching boards");
        console.error("Error fetching boards:", error);
      }
    }

    fetchBoards();
  }, []);

  const deleteColumn = async (boardId, columnId) => {
    try {
      const response = await fetch(
        `http://localhost:8002/api/boards/${boardId}/columns/${columnId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Column deleted successfully");
        Swal.fire("Deleted!", "The column has been deleted.", "success");

        // Fetch the updated boards after deleting a column
        const updatedBoardsResponse = await axios.get(
          "http://localhost:8002/api/boards"
        );
        setBoards(updatedBoardsResponse.data);
      } else {
        console.error("Failed to delete column");
        Swal.fire("Error!", "Failed to delete the column.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              <h3>Columns:</h3>
              <ul className="list-group">
                {board.columns.map((column) => (
                  <li key={column._id} className="list-group-item">
                    <p>Column Name: {column.name}</p>
                   
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteColumn(board._id, column._id)}
                    >
                      Delete Column
                    </button>
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

export default Deletecoulum;
