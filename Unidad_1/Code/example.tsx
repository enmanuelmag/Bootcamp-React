import React from 'react';

import { saveDB } from './db';

const Component = () => {
  const [loading, setLoading] = React.useState(true);

  const [name, setName] = React.useState('John Doe');

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setLoading(true);

          saveDB({ name })
            .then(() => alert('Saved!'))
            .catch((error) => alert(`Error: ${error.message}`))
            .finally(() => setLoading(false));
        }}
      >
        Save
      </button>
    </div>
  );

  function handleClick(value: string) {
    setName(value);
  }
};

export default Component;
