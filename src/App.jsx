import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  // Adding Items
  const handleAddItems = (item) => {
    setItems([...items, item]);
  };
  // Deleting Items
  const handleDeleteItems = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  // Updating Items
  const handleToggleItems = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  // Clearin the items from the Ui
  const handleClearList = () => {
    let confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  };

  return (
    <main>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

const PackingList = ({ items, onDeleteItems, onToggleItems, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  return (
    <div className="list">
      <ul>
        {sortedItems.map(({ quantity, description, packed, id }) => (
          <li key={id}>
            <input
              type="checkbox"
              value={packed}
              onChange={() => onToggleItems(id)}
            />
            <span
              style={packed == true ? { textDecoration: "line-through" } : {}}
            >
              {quantity} {description}
            </span>
            <button onClick={() => onDeleteItems(id)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
};

const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <footer>
        <small>start parking your travelling list 🛬</small>
      </footer>
    );
  }

  const itemsQty = items.length;
  const totalItemsPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((totalItemsPacked / itemsQty) * 100);

  return (
    <footer>
      <small>
        {percentage === 100
          ? "You have got everything ready to go 🛩️"
          : ` 🎒 You have ${itemsQty} items on your list and you already packed
        ${totalItemsPacked} (${percentage}%)`}
      </small>
    </footer>
  );
};
