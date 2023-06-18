import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './Styles/styles';
import Header from './Header/header';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    const mockRecipes = [
      {
        id: 1,
        title: 'Pasta Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'],
        instructions: '.Cook the spaghetti according to package instructions. Drain and set aside' +
          'In a large pan, heat olive oil over medium heat. Add minced garlic and diced onion. Cook until onion becomes translucent' +
          'Add ground beef to the pan. Cook until browned and fully cooked' +
          'Stir in tomato sauce, salt, and pepper. Simmer for 10-15 minutes' +
          'Serve the Bolognese sauce over the cooked spaghetti. Optionally, sprinkle grated Parmesan cheese on top',
      },
      {
        id: 2,
        title: 'Chicken Curry',
        ingredients: ['Chicken', 'Onion', 'Coconut Milk', 'Curry Powder'],
        instructions: 'Cut the chicken breast into small, bite-sized pieces. Season with salt and pepper' +
          'Heat vegetable oil in a large pan or wok over high heat. Add minced garlic and grated ginger. Stir-fry for a minute' +
          'Add the chicken to the pan. Cook until browned and cooked through.' +
          'Add the mixed vegetables to the pan. Stir-fry until they are crisp-tender.' +
          'Pour soy sauce over the chicken and vegetables. Stir well to combine and coat everything evenly.' +
          'Serve the chicken stir-fry over steamed rice or noodles',
        image: '',
      },
      {
        id: 3,
        title: 'Caprese Salad',
        ingredients: ['Tomatoes, Fresh mozzarella cheese, Fresh basil leaves, Extra virgin olive oil, Balsamic vinegar , Salt, Pepper'],
        instructions: 'Slice the tomatoes and fresh mozzarella into ¼-inch thick slices.Arrange the tomato and mozzarella slices on a serving plate, alternating them.' +
          'Place a fresh basil leaf on top of each tomato and mozzarella slice.' +
          'Drizzle the salad with extra virgin olive oil and balsamic vinegar.' +
          'Season with salt and pepper to taste.' +
          'Serve the Caprese salad as an appetizer or side dish',
        Image: 'img.jpeg',
      },
      {
        id: 4,
        title: 'Banana Pancakes',
        ingredients: ['Ripe bananas, All-purpose flour,Milk, Eggs, Baking powder, Salt,Butter or oil (for cooking)'],
        instructions: 'Mash the ripe bananas in a mixing bowl' +
          'Add the all-purpose flour, milk, eggs, baking powder, and salt to the mashed bananas. Stir until well combined.Heat a non-stick pan or griddle over medium heat. Add a' +
          ' small amount of butter or oil to the pan.Pour a ladleful of the pancake batter onto the pan. Cook until bubbles form on the surface, then flip and cook the other side until golden brown.' +
          'Repeat the process with the remaining batter, adding more butter or oil to the pan as needed.' +
          'Serve the banana pancakes with your favorite toppings, such as maple syrup or fresh fruits',
        image: 'img.jpeg',
      },
      {
        id: 5,
        title: 'Greek Salad',
        ingredients: ['Cucumber', 'Onion', 'Tomatoes', 'Kalamata olives', 'Feta cheese', 'Extra virgin olive oil', "Lemon juice", 'salt', 'pepper'],
        instructions: '.Dice the cucumber, tomatoes, and red onion into bite-sized pieces. Pit and halve the Kalamata olives.Crumble the feta cheese.' +
          'Chop the fresh parsley. In a large bowl, combine the diced cucumber, tomatoes, red onion, Kalamata olives, feta cheese, and fresh parsley.' +
          '  Drizzle extra virgin olive oil and lemon juice over the salad. Season with salt and pepper Toss everything together until well coated.' +
          'Serve the Greek salad as a refreshing and healthy side dish.',
        image: 'img.jpeg',
      },
      {
        id: 6,
        title: 'Grilled Sandwich',
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
        image: 'img.jpeg',
      }

    ];

    setRecipes(mockRecipes);
  };



  const addRecipeToFavorites = (recipe) => {
    //const { title, ingredients, instructions } = recipe;
    setFavorites([...favorites, recipe]);
  };



  const addNoteToRecipe = (recipeId, note) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, note };
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
  };



  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  const handleSearch = () => {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setRecipes(filteredRecipes);
  };

  const toggleRecipeVisibility = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, hidden: !recipe.hidden };
      }
      return recipe;
    });
  
    setRecipes(updatedRecipes);
  };
  
  return (
    <View style={styles.headview}>
    
      <Header />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="#1a6cf0" />
        </TouchableOpacity>
      </View>
      <View >
           <Button styles={styles.head} title={viewMode === 'grid' ? 'List View' : 'Grid View'} onPress={toggleViewMode} />
      </View>

      <ScrollView>
        <Text></Text>
        {recipes.length === 0 ? (
          <Text>No recipes available.</Text>
        ) : (
          <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>

            {recipes.map((recipe) => (
            
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                addToFavorites={addRecipeToFavorites}
                addNote={addNoteToRecipe}
                viewMode={viewMode}
      isFavorite={favorites.some((fav) => fav.id === recipe.id)}
      toggleVisibility={toggleRecipeVisibility}
              />
              
            ))}

          </View>
        )}
        <Image source={{ uri: RecipeApp.jpeg }} style={styles.image} />
        <Text style={styles.favbar}>Favorites</Text>
        {favorites.length === 0 ? (
          <Text>No favorite recipes added.</Text>
        ) : (
          <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
            {favorites.map((recipe) => (
             
             <RecipeCard
             key={recipe.id}
             recipe={recipe}
             addToFavorites={addRecipeToFavorites}
             addNote={addNoteToRecipe}
             viewMode={viewMode}
             isFavorite={true} 
           />
         ))}

          </View>
        )}
      </ScrollView>
    </View>
  );
};

const RecipeDetails = ({ ingredients, instructions }) => (
  <View>
    <Text style={styles.details}>Ingredients:</Text>
    {ingredients.map((ingredient, index) => (
      <Text key={index}>{ingredient}</Text>
    ))}

    <Text style={styles.details}>Instructions:</Text>
    <Text>{instructions}</Text>
  </View>
);

const RecipeCard = ({ recipe, addToFavorites, addNote, viewMode, isFavorite, toggleVisibility }) => {
  const [note, setNote] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToFavorite = () => {
    addToFavorites(recipe);
  };

  const handleAddNote = () => {
    addNote(recipe.id, note);
    setNote('');
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleVisibility = () => {
    toggleVisibility(recipe.id);
  };


  return (

    <View style={viewMode === 'grid' ? styles.recipeCardGrid : styles.recipeCardList}>
     
        <TouchableOpacity onPress={handleToggleDetails}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
        </TouchableOpacity>
        {showDetails && (
          <RecipeDetails ingredients={recipe.ingredients} instructions={recipe.instructions} />
        )}
        <Image source={{ uri: recipe.jpg }} style={styles.img} />

        {!isFavorite && ( 
        <View style={styles.btn_style}>
           <Button title={recipe.hidden ? 'Unhide' : 'Hide'} onPress={handleToggleVisibility} />
          <Button title="Add to Favorites" onPress={handleAddToFavorite}
           />
     
        </View>
        )}
        <View>
          <TextInput
            value={note}
            onChangeText={(text) => setNote(text)}
            placeholder="Add a note..."
          />
          <TouchableOpacity onPress={handleAddNote}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
   

    </View>


  );
};




export default RecipeApp;