import { useState } from "react";
import "./App.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Shirts", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => setItems((items) => [...items, item]);
  return (
    <main>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </main>
  );
}

const Logo = () => (
  <h1>
    <span>🌴</span>
    <span>Far Away</span>
    <span>💼</span>
  </h1>
);

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items }) => {
  const styles = { textDecoration: "line-through" };
  return (
    <div className="list">
      <ul>
        {items.map(({ quantity, description, packed, id }) => (
          <li key={id}>
            <span style={packed == true ? styles : {}}>
              {quantity} {description}
            </span>
            <button>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Stats = () => (
  <footer>
    <em>🎒 You have X items on your list and you already packed X (X%)</em>
  </footer>
);
