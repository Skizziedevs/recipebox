import React, { useState } from 'react';
import '../App.css'

const EditRecipeModal = ({ recipe, onSave, onCancel }) => {
  // Initialize editedRecipe with a copy of the original recipe
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the field is empty, set it as an empty array instead of a string
    const updatedValue = value.trim() === '' ? [] : value.split('\n');
    setEditedRecipe({ ...editedRecipe, [name]: updatedValue });
  };
  

  const handleSave = () => {
    onSave(editedRecipe);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Recipe</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={editedRecipe.title}
          onChange={handleInputChange}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          name="ingredients"
          value={Array.isArray(editedRecipe.ingredients) ? editedRecipe.ingredients.join('\n') : ''}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="directions">Directions:</label>
        <textarea
          name="directions"
          value={Array.isArray(editedRecipe.directions) ? editedRecipe.directions.join('\n') : ''}
          onChange={handleInputChange}
        ></textarea>
        <div>
          <button onClick={handleSave}>Save</button>
          <button className='cancle' onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;
