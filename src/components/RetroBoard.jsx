import { useState } from 'react';
import './RetroBoard.css';
import RetroCategory from './RetroCategory';

const RetroBoard = () => {
  const [items, setItems] = useState({
    'Went Well': [
      {
        id: Date.now(),
        text: 'learning',
        votes: {
          up: 0,
          down: 0,
        },
      },
      {
        id: Date.now() + 1,
        text: 'Earn more money',
        votes: {
          up: 0,
          down: 0,
        },
      },
    ],
    'To Improve': [],
    'Action Items': [],
  });

  const categories = Object.keys(items);

  const moveItem = (category, index, direction) => {
    const currentCategory = categories.find((key) => items[key] === items[category]);

    let nextCategory;

    if (direction === 'left') {
      const prevCategories = categories.slice(categories.indexOf(currentCategory) - 1);
      nextCategory = prevCategories.length ? prevCategories[0] : 'Action Items';

    } else if (direction === 'right') {
      const nextCategories = categories.slice(categories.indexOf(currentCategory) + 1);
      nextCategory = nextCategories.length ? nextCategories[0] : 'Went Well';
    }

    const itemToMove = items[category][index];
    const updatedCategory = items[category].filter((_, i) => i !== index);
    const updatedNextCategory = [...items[nextCategory], itemToMove];

    setItems((prevtasks) => ({
      ...prevtasks,
      [category]: updatedCategory,
      [nextCategory]: updatedNextCategory,
    }));
  }

  return (
    <div className='retro-board'>
      {
        categories.map((category, index) => (
          <RetroCategory 
            key={index} 
            category={category} 
            items={items[category]} // --> Object
            setItems={setItems}
            moveItem={moveItem}
          />
        ))
      }
    </div>
  );
};

export default RetroBoard;
