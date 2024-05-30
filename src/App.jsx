import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditRecipeModal from './components/EditRecipeModal';
import AddRecipeModal from './components/AddRecipeModal';
import recipesData from './recipes.json'; // Import recipes directly

function App() {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('recipes')) || [recipesData] );
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleRecipeClick = (index) => {
    setSelectedRecipe(recipes[index]);
  };

  useEffect(() => {
    // Set recipes data from imported JSON
    
localStorage.setItem('recipes', JSON.stringify(recipes));
    // Select a random recipe on component mount
    const randomIndex = Math.floor(Math.random() * recipesData.recipes.length);
    setSelectedRecipe(recipesData.recipes[randomIndex]);
  }, [recipes]);
  


  const handleDeleteRecipe = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = recipes.filter(recipe => recipe !== selectedRecipe);
      setSelectedRecipe(null); // Clear selected recipe
      setRecipes(updatedRecipes);
    }
  };

  const handleEditRecipe = () => {
    setShowEditModal(true);
  };

  const handleSaveEditedRecipe = (editedRecipe) => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe === selectedRecipe) {
        return editedRecipe;
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
    setSelectedRecipe(editedRecipe);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleAddRecipe = () => {
    setShowAddModal(true);
  };

  const handleSaveNewRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setSelectedRecipe(newRecipe);
    setShowAddModal(false);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <div className="title">
        <h1><FontAwesomeIcon icon={faFire} /> RecipeBox</h1>
      </div>

      <div className="scrollable-list">
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index} onClick={() => handleRecipeClick(index)} className={index % 2 === 1 ? 'orange-bg' : 'gray-bg'}>
              {recipe.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="main">
        {selectedRecipe && (
          <div className="recipe">
            <div className="one">
              <h1>{selectedRecipe.title}</h1>
              <FontAwesomeIcon icon={faTrash} className='icon' onClick={handleDeleteRecipe} />
              <FontAwesomeIcon icon={faPenToSquare} className='icon' onClick={handleEditRecipe} />
            </div>
            <div className='mid'>
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Directions</h3>
                <ol>
                  {selectedRecipe.directions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="two">
              <FontAwesomeIcon icon={faPlus} className='icon2' onClick={handleAddRecipe} />
            </div>
          </div>
        )}

        {showEditModal && (
          <EditRecipeModal
            recipe={selectedRecipe}
            onSave={handleSaveEditedRecipe}
            onCancel={handleCancelEdit}
          />
        )}

        {showAddModal && (
          <AddRecipeModal
            onSave={handleSaveNewRecipe}
            onCancel={handleCancelAdd}
          />
        )}
      </div>
    </>
  );
}

export default App;




