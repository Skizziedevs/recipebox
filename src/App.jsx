import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import EditRecipeModal from './components/EditRecipeModal';
import AddRecipeModal from './components/AddRecipeModal';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);



  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes data from the JSON file
        const response = await fetch('../recipes.json');
        const data = await response.json();
  
        // Update recipes state
        setRecipes(data.recipes);
  
        // Select a random recipe
        const randomIndex = Math.floor(Math.random() * data.recipes.length);
        setSelectedRecipe(data.recipes[randomIndex]);
  
        // Save recipes to local storage
        localStorage.setItem('recipes', JSON.stringify(data.recipes));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      // Parse and set recipes from local storage
      const parsedRecipes = JSON.parse(storedRecipes);
      setRecipes(parsedRecipes);
  
      // Select a random recipe
      const randomIndex = Math.floor(Math.random() * parsedRecipes.length);
      setSelectedRecipe(parsedRecipes[randomIndex]);
    } else {
      // Fetch recipes if no recipes found in local storage
      fetchRecipes();
    }
  }, []);
  const handleRecipeClick = (index) => {
    setSelectedRecipe(recipes[index]);
  };

  const handleDeleteRecipe = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = recipes.filter(recipe => recipe !== selectedRecipe);
      const randomIndex = Math.floor(Math.random() * updatedRecipes.length);
      setSelectedRecipe(updatedRecipes[randomIndex]);
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
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Store updated recipes
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
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Store updated recipes
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
              <div >
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
