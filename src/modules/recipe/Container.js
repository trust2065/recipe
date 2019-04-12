import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Ingredient, Step } from './components';
import { LoadingIndicator } from '../../components';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  changeIsEdit,
  imgUpload,
  ingredientAdd,
  ingredientChange,
  ingredientDelete,
  nameChange,
  stepAdd,
  stepChange,
  stepDelete,
  recipeFetch,
  recipeUpdate,
  reset
} from './reducer';
import { FaSave, FaPlus, FaRegEdit, FaClipboardList } from 'react-icons/fa';

// let recipeId;
const Recipe = connect(store => {
  const { recipeId, steps, ingredients, name, imgURL } = store.recipe.data;
  const {
    fetching,
    fetched,
    updating,
    updated,
    uploading,
    isEdit
  } = store.recipe.meta;
  return {
    recipeId,
    steps,
    ingredients,
    isEdit,
    name,
    imgURL,
    fetching,
    fetched,
    updating,
    updated,
    uploading
  };
})(
  class Recipe extends Component {
    componentDidMount() {
      const recipeId = this.props.match.params.id;
      // console.log('recipe id: ' + recipeId);
      this.props.dispatch(recipeFetch(recipeId));
    }

    handleAddIngredient = () => {
      this.props.dispatch(ingredientAdd());
    };

    handleAddStep = () => {
      this.props.dispatch(stepAdd());
    };

    handleUpdateRecipe = () => {
      const { recipeId, name, steps, ingredients, imgURL } = this.props;
      this.props.dispatch(
        recipeUpdate(recipeId, name, ingredients, steps, imgURL)
      );
    };

    handleIngredientChange = (e, i) => {
      const changedText = e.target.value;
      this.props.dispatch(ingredientChange(i, changedText));
    };

    handleStepChange = (e, i) => {
      const changedText = e.target.value;
      this.props.dispatch(stepChange(i, changedText));
    };

    handleNameChange = e => {
      this.props.dispatch(nameChange(e.target.value));
    };

    handleStepDelete = i => {
      this.props.dispatch(stepDelete(i));
    };

    handleIngredientDelete = i => {
      // console.log('delete: ' + i);
      this.props.dispatch(ingredientDelete(i));
    };

    handleImageUpload = e => {
      console.log('handleImageUpload');
      this.props.dispatch(imgUpload(e));
    };

    render() {
      // console.log('render Recipe');
      // console.log(this.props);
      const {
        name,
        fetching,
        updating,
        updated,
        uploading,
        recipeId,
        imgURL,
        isEdit
      } = this.props;

      const ingredients = _.get(this.props, 'ingredients', []);
      const steps = _.get(this.props, 'steps', []);

      let ingredientsRow = [];
      let stepsRow = [];

      ingredientsRow = ingredients.map((ingredient, i) => (
        <Ingredient
          key={`ingredient_${i}`}
          onChange={e => this.handleIngredientChange(e, i)}
          onDelete={() => this.handleIngredientDelete(i)}
          name={ingredient.name}
          isEdit={isEdit}
        />
      ));

      stepsRow = steps.map((step, i) => (
        <Step
          key={`step_${i}`}
          desp={step.desp}
          step={i + 1}
          onChange={e => this.handleStepChange(e, i)}
          onDelete={() => this.handleStepDelete(i)}
        />
      ));

      let styleBtnUpdateText;
      let toggleDisable = false;
      let btnUpdateText;

      if (fetching || updating || uploading) {
        if (fetching) {
          btnUpdateText = 'Fetching';
        } else if (updating) {
          btnUpdateText = 'Saving...';
        } else if (uploading) {
          btnUpdateText = 'Image Uploading';
        }
        toggleDisable = true;
        styleBtnUpdateText = 'btn-warning disable';
      } else if (updated) {
        btnUpdateText = 'Saved';
        toggleDisable = true;
        styleBtnUpdateText = 'btn-success disable';
        setTimeout(() => {
          this.props.dispatch(reset());
        }, 2000);
      } else {
        btnUpdateText = 'Save';
        styleBtnUpdateText = 'btn-origin';
      }

      return fetching ? (
        <LoadingIndicator />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contents">
                <div className="d-flex">
                  <div className="form-group">
                    {/* <label htmlFor="name">Name</label> */}
                    {isEdit ? (
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={this.handleNameChange}
                      />
                    ) : (
                      <h2>{name}</h2>
                    )}
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      value={recipeId}
                      readOnly
                    />
                  </div> */}
                </div>
                <div className="form-group">
                  <h4 className="mt-4" style={{ color: '#302f87' }}>
                    Ingredients
                  </h4>
                  <hr />
                  <div
                    className="d-flex"
                    style={{
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}>
                    {ingredientsRow}
                  </div>
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn "
                      style={{ padding: '8px 0.5rem 0px 0.5rem' }}
                      onClick={this.handleAddIngredient}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <h4 className="mt-4" style={{ color: '#302f87' }}>
                    Steps
                  </h4>
                  <hr />
                  {stepsRow}
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn"
                      style={{ padding: '8px 0.5rem 0px 0.5rem' }}
                      onClick={this.handleAddStep}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <div className="mb-4">
                <button
                  className="btn btn-block"
                  onClick={() => this.props.dispatch(changeIsEdit(!isEdit))}>
                  Edit
                </button>
              </div> */}
              <div className="mb-4 d-flex">
                <button
                  disabled={toggleDisable}
                  className={`btn btn-block ${styleBtnUpdateText} mr-2 `}
                  onClick={this.handleUpdateRecipe}
                  style={{ flex: 1 }}>
                  {fetching ? (
                    btnUpdateText
                  ) : (
                    <div>
                      <FaSave /> {btnUpdateText}
                    </div>
                  )}
                </button>
                {recipeId && (
                  <Link
                    to={`/recipe/${recipeId}/history`}
                    className="mr-2"
                    style={{ flex: 1 }}>
                    <button className="btn btn-block">
                      <FaClipboardList /> Listings
                    </button>
                  </Link>
                )}
                {recipeId && (
                  <Link
                    to={`/recipe/${recipeId}/history/create`}
                    className=""
                    style={{ flex: 1 }}>
                    <button className="btn btn-block">
                      <FaPlus /> Listing
                    </button>
                  </Link>
                )}
              </div>
              {!imgURL ||
                (imgURL !== '' && (
                  <div className="d-flex align-items-center justify-content-center position-relative selectImage">
                    <img className="img-fluid" src={imgURL} alt="img" />
                    <div
                      id="imgur"
                      className="position-absolute selectImageSelector"
                      style={{ left: 0, top: 0 }}>
                      <label
                        htmlFor="inputRecipeImg"
                        className="btn btn-block mb-4 labelButton"
                        disabled={updating}>
                        <FaRegEdit />
                      </label>
                      <input
                        style={{ display: 'none' }}
                        id="inputRecipeImg"
                        type="file"
                        accept="image/*"
                        data-max-size="5000"
                        onChange={this.handleImageUpload}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
  }
);
export default Recipe;
