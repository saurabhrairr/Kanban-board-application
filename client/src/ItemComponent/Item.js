// import React, { useState } from 'react';
// import axios from 'axios';

// const Item = () => {
//   const [itemName, setItemName] = useState('');
//   const [itemDescription, setItemDescription] = useState('');
//   const [itemDueDate, setItemDueDate] = useState('');
//   const [error, setError] = useState(null);
//   const [boards, setBoards] = useState([]);

//   const addItem = async (boardId, columnId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8002/api/boards/${boardId}/columns/${columnId}/items`,
//         {
//           name: itemName,
//           description: itemDescription,
//           dueDate: itemDueDate,
//         }
//       );

//       // Handle successful response, if needed
//       console.log('Item added successfully:', response.data);

//       // Clear form fields after successful addition
//       setItemName('');
//       setItemDescription('');
//       setItemDueDate('');
//     } catch (error) {
//       // Handle error, if needed
//       console.error('Error adding item:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Item</h2>
//       <div className="container mt-5">
//       <h1 className="mb-4">Kanban Boards</h1>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <ul className="list-group">
//           {boards.map((board) => (
//             <li key={board._id} className="list-group-item">
//               <h2>{board.name}</h2>
//               <h3>Columns:</h3>
//               <ul className="list-group">
//                 {board.columns.map((column) => (
//                   <li key={column._id} className="list-group-item">
//                     <p>Column Name: {column.name}</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//       <form>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <input
//             type="text"
//             value={itemDescription}
//             onChange={(e) => setItemDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Due Date:
//           <input
//             type="text"
//             value={itemDueDate}
//             onChange={(e) => setItemDueDate(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="button" onClick={addItem}>
//           Add Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Item;
