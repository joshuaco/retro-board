import './RetroCategory.css';
import './RetroItem.css';
import RetroItem from './RetroItem';

const RetroCategory = ({ category, items, setItems, moveItem }) => {
  const handleAddItem = () => {
    setItems((prevtasks) => ({
      ...prevtasks,
      [category]: [
        ...prevtasks[category],
        { id: Date.now(), text: '', votes: { up: 0, down: 0 } },
      ],
    }));
  };

  const handleValueChange = (itemID, key, newValue) => {
    const currentItems = [...items];
    const updatedItems = currentItems.map((item) => {
      if (item.id === itemID) {
        return { ...item, [key]: newValue };
      }
      return item;
    })
    setItems((prevItems) => ({
      ...prevItems,
      [category]: updatedItems,
    }))
  }

  const handleDeleteItem = (index) => {
    const currentItems = [...items];
    currentItems.splice(index, 1);
    setItems((prevItems) => ({
      ...prevItems,
      [category]: currentItems,
    }));
  };

  const colorCategory = () => {
    if (category === 'Went Well') {
      return 'green';
    } else if (category === 'To Improve') {
      return 'rose';
    } else {
      return 'orange';
    }
  }

  return (
    <div className='retro-category'>
      <div className={`category-title ${colorCategory()}`}>
        <h2>{category}</h2>
      </div>
      <button onClick={handleAddItem}>+</button>
      {items.map((item, index) => (
        <RetroItem
          key={`${item.id}-${index}`}
          index={index}
          item={item}
          category={category}
          onChangeValue={handleValueChange}
          onDelete={handleDeleteItem}
          onMove={moveItem}
        />
      ))}
    </div>
  );
};

export default RetroCategory;
