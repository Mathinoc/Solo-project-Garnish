import React from 'react';
import { getRecipeByIdData } from './../data';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import './../styling/RecipeDetail.css';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';
import SimilarList from './SimilarList';
import { getRecipeById } from './../services/recipeService';
import BarChart from '../charts/BarChart';


export default function RecipeDetail({ myList, toggleHeart }) {

  let { recipeId } = useParams();
  //! data storage
  // let params = useParams();
  // let recipe = getRecipeByIdData(parseInt(params.recipeId, 10));
  // let recipeId = params.recipeId;
  // myList.includes(recipe.id) ? recipe["favorite"] = true : recipe["favorite"] = false;
  //! API
  console.log('recipe ID', recipeId);
  const [recipe, setRecipe] = useState({});
  const [heartToggle, setHeartToggle] = useState();

  useEffect(() => {
    getRecipeById(recipeId, {})
    .then(recipeResult => {

    if (recipeResult['id'] === parseInt(recipeId, 10)) {
      myList.includes(recipeResult['id']) ? recipeResult["favorite"] = true : recipeResult["favorite"] = false;
      console.log('recipeModified', recipeResult);
      setHeartToggle(recipeResult["favorite"])
      setRecipe(recipeResult);
      console.log('recipe ID', recipe);
      return
    }
    alert('Could not get recipe details :/')
  })
      .catch(error => console.log("RecipeDetail()", error))
  }, [recipeId])



  function handleClick(id) {
    toggleHeart(id);
    setHeartToggle(!heartToggle)
  }
  console.log('reeeecipe', recipe)

  return (
    <>
      <div className="recipe-detail-container">
        <div className="recipe-detail-top">
          <p>{recipe.title}</p>
          <button className="heart-btn-detail" onClick={() => handleClick(recipe.id)} >
            {heartToggle ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart heart-fill"></i>}
          </button>
        </div>
        <div className="recipe-detail-middle">
          <div className="graph-container">
            <BarChart recipe={recipe} />
          </div>
          <img src={recipe.image} className="cover-img" />
        </div>

        <div className="recipe-detail-bottom">
          <div className="ingredient-class" >
            <h2>Ingredients</h2>
            <p>Servings {recipe.servings}</p>
            {recipe.extendedIngredients ?
              <IngredientList ingredients={recipe.extendedIngredients} />
              :
              <p>Couldn't find ingredients</p>
            }
          </div>
          <div className="instruction-class">
            <h2>Instructions</h2>
            {recipe.analyzedInstructions ?
              <InstructionList instructions={recipe.analyzedInstructions[0].steps} />
              :
              <p>Couldn't find instructions</p>
            }
          </div>
        </div>
      </div>
      <div>
        <h2>Similar recipes</h2>
        {/* <SimilarList id={recipeId} number={4} /> */}
      </div>
    </>
  )
}