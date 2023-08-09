import { useState } from 'react';
import './RetroItem.css';

const RetroItem = ({
  index,
  category,
  item,
  onDelete,
  onMove,
  onChangeValue
}) => {
  const [text, setText] = useState(item.text);
  const [votes, setVotes] = useState(item.votes);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChangeValue(item.id, 'text', newText);
  };

  const handleTextBlur = (e) => {
    const newText = e.target.value;
    if (newText) {
      setText(newText);
      onChangeValue(item.id, 'text', newText);
    } else {
      alert("You must have to write something");
    }
  }

  const handleVoteChange = (type) => {
    const newVotes = { ...votes };

    if (type === 'up') {
      newVotes.up = newVotes.up + 1;
    } else {
      newVotes.down = newVotes.down + 1;
    }
    
    setVotes(newVotes);
    onChangeValue(item.id, 'votes', newVotes);
  };

  const btnBackgroundColor = () => {
    if (category === 'Went Well') {
      return 'green';
    } else if (category === 'To Improve') {
      return 'rose';
    } else {
      return 'orange';
    }
  }

  return (
    <div className='retro-item'>
      <textarea
        aria-label='item text'
        autoFocus
        value={text}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        rows='1'
        required
      />

      <div className='item-votes'>
        <button
          className={btnBackgroundColor()}
          onClick={() => handleVoteChange('up')}
        >
          {votes.up}
        </button>
        <button
          className={btnBackgroundColor()}
          onClick={() => handleVoteChange('down')}
        >
          {votes.down}
        </button>
      </div>

      <div className='item-controls'>
        <button
          className={btnBackgroundColor()}
          onClick={() => onMove(category, index, 'left')}
        >
          &larr;
        </button>
        <button className='red' onClick={() => onDelete(index)}>X</button>
        <button
          className={btnBackgroundColor()}
          onClick={() => onMove(category, index, 'right')}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default RetroItem;
