import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe("Homemade Pizza",
     "Like your mother's do!", 
    "https://i4.hurimg.com/i/hurriyet/75/750x422/5d25cdf967b0a90c800e1e4d.jpg",
    [
      new Ingredient("Dough", 1),
      new Ingredient("Tomato", 1),
      new Ingredient("Pepperoni", 1),
      new Ingredient("Chedar Cheese", 1),
      new Ingredient("Meat", 1),
      new Ingredient("Mushroom", 5)
    ]),
    new Recipe("Hamburger",
     "This is a fast and delicious solution", 
     "https://i4.hurimg.com/i/hurriyet/75/750x422/5c0bb8df0f25441214fbfe93.jpg",
     [
      new Ingredient("Hamburger Buns", 2),
      new Ingredient("Meat", 1),
      new Ingredient("Salad", 1),
      new Ingredient("Bacon", 1)
     ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return [...this.recipes];
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngreidentsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
