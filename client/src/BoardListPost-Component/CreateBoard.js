import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BoardForm() {
  const [boardData, setBoardData] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoardData({ ...boardData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8002/api/boards",
        boardData
      );
      // onBoardCreated(response.data);
      Swal.fire("Deleted!", "The board has been deleted.", "success");
      setBoardData({ name: "", description: "" });
      navigate("/BoardList");
    } catch (error) {
      console.error("Error creating board:", error);
      Swal.fire("Error!", "Failed to delete the board.", "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleFormSubmit} className="form-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={boardData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={boardData.description}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary mt-3">
          Create Board
        </button>
      </form>
    </div>
  );
}

export default BoardForm;
