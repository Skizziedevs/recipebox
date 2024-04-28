// AddRecipeModal.jsx

import React, { useState } from 'react';
import '../App.css';

const AddRecipeModal = ({ onSave, onCancel }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: [], // Initialize as an empty array
    directions: []   // Initialize as an empty array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients' || name === 'directions') {
      // If the input is for ingredients or directions, split the value into an array
      setNewRecipe({ ...newRecipe, [name]: value.split('\n') });
    } else {
      setNewRecipe({ ...newRecipe, [name]: value });
    }
  };
  
  const handleSave = () => {
    onSave(newRecipe);
    // Reset the form after saving
    setNewRecipe({
      title: '',
      ingredients: [],
      directions: []
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Recipe</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          name="ingredients"
          value={newRecipe.ingredients.join('\n')}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="directions">Directions:</label>
        <textarea
          name="directions"
          value={newRecipe.directions.join('\n')}
          onChange={handleInputChange}
        ></textarea>
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel} className='cancle'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;