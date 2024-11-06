
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [colorData, setColorData] = useState([]);
  const [newColor, setNewColor] = useState({ name: '', colors: [] });

  useEffect(() => {
    fetch('http://localhost:5030/colors')
      .then((response) => response.json())
      .then((data) => setColorData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5030/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColor),
    })
      .then((response) => response.json())
      .then((data) => {
        setColorData([...colorData, data]);
        setNewColor({ name: '', colors: [] });
      })
      .catch((error) => console.error('Error saving data:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5030/colors/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setColorData(colorData.filter((color) => color._id !== id));
        } else {
          console.error('Error deleting data:', response);
        }
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  return (
    <div className="app-container">
      <h1 className="title">Color Palette Manager</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={newColor.name}
          onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
        />
        <input
          type="text"
          className="input"
          placeholder="Colors (comma-separated)"
          value={newColor.colors.join(',')}
          onChange={(e) =>
            setNewColor({ ...newColor, colors: e.target.value.split(',') })
          }
        />
        <button className="button" type="submit">Add Color</button>
      </form>
      <h2 className="subtitle">Stored Colors:</h2>
      <ul className="color-list">
        {colorData.map((color) => (
          <li className="color-item" key={color._id}>
            <strong>{color.name}</strong>: {color.colors.join(', ')}
            <button className="delete-button" onClick={() => handleDelete(color._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
