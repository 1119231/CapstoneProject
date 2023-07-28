
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, Alert , Modal} from 'react-native';
import styles from './Styles/styles';
import Header from './Header/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Hidden from './Hidden';
import { Clipboard } from 'react-native';

import { Clipboard } from 'react-native';


const Tab = createBottomTabNavigator();
const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
 
  const [tags, setTags] = useState(['pasta', 'chicken', 'salad', 'pancakes', 'sandwich']);
  const [allRecipes, setAllRecipes] = useState([]);
  const [hiddenRecipes, setHiddenRecipes] = useState([]);
  useEffect(() => {
     fetchRecipes();
    // handleSearch();
  }, []);

  const fetchRecipes = () => {
    const mockRecipes = [
      {
        id: 1,
        title: 'Pasta Carbonara',
        tags: ['pasta', 'italian'],
        ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'],
        instructions: 'Cook the spaghetti according to package instructions. Drain and set aside' +
          'In a large pan, heat olive oil over medium heat. Add minced garlic and diced onion. Cook until onion becomes translucent' +
          'Add ground beef to the pan. Cook until browned and fully cooked' +
          'Stir in tomato sauce, salt, and pepper. Simmer for 10-15 minutes' +
          'Serve the Bolognese sauce over the cooked spaghetti. Optionally, sprinkle grated Parmesan cheese on top',
          image: require('../Instant_Delicious/assets/pasta_dish1.jpeg'),
      },
      {
        id: 2,
        title: 'Chicken Curry',
        tags: ['chicken', 'curry'],
        ingredients: ['Chicken', 'Onion', 'Coconut Milk', 'Curry Powder'],
        instructions: 'Cut the chicken breast into small, bite-sized pieces. Season with salt and pepper' +
          'Heat vegetable oil in a large pan or wok over high heat. Add minced garlic and grated ginger. Stir-fry for a minute' +
          'Add the chicken to the pan. Cook until browned and cooked through.' +
          'Add the mixed vegetables to the pan. Stir-fry until they are crisp-tender.' +
          'Pour soy sauce over the chicken and vegetables. Stir well to combine and coat everything evenly.' +
          'Serve the chicken stir-fry over steamed rice or noodles',


         image: require('../Instant_Delicious/assets/Chicken_dish2.jpeg'),


          image: require('../Instant_Delicious/assets/Chicken_dish2.jpeg'),

        //  image: require('../Instant_Delicious/assets/Chicken_dish2.jpeg'),



         image: require('../Instant_Delicious/assets/Chicken_dish2.jpeg'),

      },
      {
        id: 3,
        title: 'Caprese Salad',
         tags: ['salad', 'italian'],
        ingredients: ['Tomatoes, Fresh mozzarella cheese, Fresh basil leaves, Extra virgin olive oil, Balsamic vinegar , Salt, Pepper'],
        instructions: 'Slice the tomatoes and fresh mozzarella into ¼-inch thick slices.Arrange the tomato and mozzarella slices on a serving plate, alternating them.' +
          'Place a fresh basil leaf on top of each tomato and mozzarella slice.' +
          'Drizzle the salad with extra virgin olive oil and balsamic vinegar.' +
          'Season with salt and pepper to taste.' +
          'Serve the Caprese salad as an appetizer or side dish',
         image: require('../Instant_Delicious/assets/dish1.jpeg'),
      },
      {
        id: 4,
        title: 'Banana Pancakes',
        tags: ['pancakes', 'breakfast'],
        ingredients: ['Ripe bananas, All-purpose flour,Milk, Eggs, Baking powder, Salt,Butter or oil (for cooking)'],
        instructions: 'Mash the ripe bananas in a mixing bowl' +
          'Add the all-purpose flour, milk, eggs, baking powder, and salt to the mashed bananas. Stir until well combined.Heat a non-stick pan or griddle over medium heat. Add a' +
          ' small amount of butter or oil to the pan.Pour a ladleful of the pancake batter onto the pan. Cook until bubbles form on the surface, then flip and cook the other side until golden brown.' +
          'Repeat the process with the remaining batter, adding more butter or oil to the pan as needed.' +
          'Serve the banana pancakes with your favorite toppings, such as maple syrup or fresh fruits',
          image: require('../Instant_Delicious/assets/pancake_dish4.jpeg'),
      },
      {
        id: 5,
        title: 'Greek Salad',
        tags: ['salad', 'greek'],
        ingredients: ['Cucumber', 'Onion', 'Tomatoes', 'Kalamata olives', 'Feta cheese', 'Extra virgin olive oil', "Lemon juice", 'salt', 'pepper'],
        instructions: 'Dice the cucumber, tomatoes, and red onion into bite-sized pieces. Pit and halve the Kalamata olives.Crumble the feta cheese.' +
          'Chop the fresh parsley. In a large bowl, combine the diced cucumber, tomatoes, red onion, Kalamata olives, feta cheese, and fresh parsley.' +
          '  Drizzle extra virgin olive oil and lemon juice over the salad. Season with salt and pepper Toss everything together until well coated.' +
          'Serve the Greek salad as a refreshing and healthy side dish.',
         image: require('../Instant_Delicious/assets/greek_dish5.jpeg'),
      },
      {
        id: 6,
        title: 'Grilled Sandwich',
        tags: ['sandwich', 'grilled'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/grilledsand_dish6.jpeg'),
      },
      {
        id: 7,
        title: 'Classic Tomato Pasta:',
        tags: ['sandwich','tomato','Classic'],
        ingredients: ['spaghetti', 'tomato sauce','garlic', 'olive oil','dried oregano'],
        instructions: 'Cook the spaghetti according to the package instructions. Drain and set asideHeat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'In a pan, heat olive oil over medium heat. Add minced garlic and cook until fragrant.lace a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Add the tomato sauce, dried oregano, salt, and pepper. Simmer for 5 minutes.Place the sandwich onto the heated skillet or griddle.' +
          'Toss the cooked spaghetti in the tomato sauce until well coated.ook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Serve hot with grated Parmesan cheese on top.Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' ,
          image: require('../Instant_Delicious/assets/tomatopasta.jpeg'),
      },
      {
        id: 8,
        title: 'Chicken Stir-Fry',
        tags: ['chicken','stir-fry'],
        ingredients: ['chicken', 'oil', 'soy sauce','garlic','ginger', 'Cooked rice or noodles'],
        instructions: 'Heat vegetable oil in a large pan or wok over high heat.' +
          'Add minced garlic and grated ginger. Stir-fry for a minute' +
          'Add the sliced chicken to the pan. Cook until browned and fully cooked.' +
          'Add the mixed vegetables to the pan. Stir-fry until they are crisp-tender.' +
          'Pour soy sauce over the chicken and vegetables. Stir well to combine and coat everything evenly.' +
          'Serve the chicken stir-fry over steamed rice or noodles.',
          image: require('../Instant_Delicious/assets/chickenfry.jpeg'),
      },
      {
        id: 9,
        title: 'Guacamole',
        tags: ['Guacamole'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/guacamole.jpeg'),
      },
      {
        id: 10,
        title: 'Omelette',
        tags: ['Omelette'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/Omelette.jpeg'),
      },


      },
      {
        id: 7,
        title: 'Classic Tomato Pasta:',
        tags: ['sandwich','tomato','Classic'],
        ingredients: ['spaghetti', 'tomato sauce','garlic', 'olive oil','dried oregano'],
        instructions: 'Cook the spaghetti according to the package instructions. Drain and set asideHeat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'In a pan, heat olive oil over medium heat. Add minced garlic and cook until fragrant.lace a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Add the tomato sauce, dried oregano, salt, and pepper. Simmer for 5 minutes.Place the sandwich onto the heated skillet or griddle.' +
          'Toss the cooked spaghetti in the tomato sauce until well coated.ook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Serve hot with grated Parmesan cheese on top.Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' ,
          image: require('../Instant_Delicious/assets/tomatopasta.jpeg'),
      },
      {
        id: 8,
        title: 'Chicken Stir-Fry',
        tags: ['chicken','stir-fry'],
        ingredients: ['chicken', 'oil', 'soy sauce','garlic','ginger', 'Cooked rice or noodles'],
        instructions: 'Heat vegetable oil in a large pan or wok over high heat.' +
          'Add minced garlic and grated ginger. Stir-fry for a minute' +
          'Add the sliced chicken to the pan. Cook until browned and fully cooked.' +
          'Add the mixed vegetables to the pan. Stir-fry until they are crisp-tender.' +
          'Pour soy sauce over the chicken and vegetables. Stir well to combine and coat everything evenly.' +
          'Serve the chicken stir-fry over steamed rice or noodles.',
          image: require('../Instant_Delicious/assets/chickenfry.jpeg'),
      },
      {
        id: 9,
        title: 'Guacamole',
        tags: ['Guacamole'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/guacamole.jpeg'),
      },
      {
        id: 10,
        title: 'Omelette',
        tags: ['Omelette'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/Omelette.jpeg'),
      },


      {
        id: 11,
        title: 'chicken biriyani',
        tags: ['chicken', 'biriyani'],
        ingredients: ['Bread slices', 'Cheese slices', 'Butter'],
        instructions: 'Heat a non-stick skillet or griddle over medium heat. Butter one side of each bread slice.' +
          'Place a cheese slice between two bread slices, with the buttered sides facing outwards' +
          'Place the sandwich onto the heated skillet or griddle.' +
          'Cook for a few minutes on each side, until the bread turns golden brown and the cheese melts.' +
          'Remove the grilled cheese sandwich from the skillet or griddle and let it cool for a minute.' +
          'Cut the sandwich diagonally into halves or quarters, if desired.' +
          'Serve the grilled cheese sandwich warm and enjoy its gooey and comforting goodness!',
          image: require('../Instant_Delicious/assets/biriyani.jpeg'),



        //  image: require('../Instant_Delicious/assets/grilledsand_dish6.jpeg'),



      }

    ];

   setRecipes(mockRecipes);
    setAllRecipes(mockRecipes);
  };

  
  const addRecipeToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  const removeFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== recipeId);
    setFavorites(updatedFavorites);
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
    const filteredRecipes = allRecipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch =
        selectedTags.length === 0 ||
        recipe.tags.some((tag) => selectedTags.includes(tag.toLowerCase()));
      return titleMatch && tagMatch;
    });

    setRecipes(filteredRecipes);
   
    
  };


  

  useEffect(() => {
     handleSearch();
  }, [searchQuery, selectedTags,allRecipes]);


   
  useEffect(() => {
    fetchRecipes();
  }, [selectedTags]);
  
  
  const toggleRecipeVisibility = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, hidden: !recipe.hidden };
      }
      return recipe;
    });
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== recipeId);
    setHiddenRecipes(updatedRecipes.filter((recipe) => recipe.hidden));
    setRecipes(updatedRecipes);
    setFavorites(updatedFavorites);
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0); 
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setRecipes(allRecipes);
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
   // fetchRecipes();
  };
  
  const addRating = (recipeId, rating) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, rating };
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  const copyInstructionsToClipboard = (instructions) => {
    Clipboard.setString(instructions);
    Alert.alert('Copied to clipboard', 'The recipe instructions have been copied to the clipboard.');
  };

  
  return (
    <NavigationContainer>
    <View style={[styles.headview, { marginBottom: 20 }]}>

      <Header />
      <Tab.Navigator>
      <Tab.Screen name='Recipes'>
      {() => (
         <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={handleInputChange}
          onSubmitEditing={handleSearch}
        />
        {isSearching ? (
          <TouchableOpacity style={styles.searchButton} onPress={clearSearch}>
            <Icon name="close" size={20} color="#1a6cf0" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#1a6cf0" />
          </TouchableOpacity>
        )}

      </View>

      <View style={styles.tagsContainer}>
  {tags.map((tag) => (
    <TouchableOpacity
      key={tag}
      style={[
        styles.tag,
        selectedTags.includes(tag) ? styles.selectedTag : null,
      ]}
      onPress={() => handleTagSelect(tag)}
    >
      <Text style={styles.tagText}>{tag}</Text>
    </TouchableOpacity>
  ))}
</View>


      <View>
        <TouchableOpacity
          style={styles.head}
          title={viewMode === 'grid' ? 'List View' : 'Grid View'}
          onPress={toggleViewMode}
        >
          {viewMode === 'grid' ? (
            <Icon name="th-list" size={20} color="#1a6cf0" />
          ) : (
            <Icon name="th-large" size={20} color="#1a6cf0" />
          )}
        </TouchableOpacity>


      </View>
     
  
          <ScrollView>
            <ScrollView></ScrollView>
          <Text></Text>
          {recipes.length === 0 ? (
            <Text>No recipes available.</Text>
          ) : (
            <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>

              {recipes.filter((recipe) => !recipe.hidden).map((recipe) => (

                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  addToFavorites={addRecipeToFavorites}
                  removeFavorite={removeFavorite}

                  addNote={addNoteToRecipe}
                  addRating={addRating}
                  viewMode={viewMode}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                  toggleVisibility={toggleRecipeVisibility}
                />

              ))}

            </View>
          )}
          
        </ScrollView>
        </View>
        )}
        </Tab.Screen>
        <Tab.Screen name='Favourites'>
          {()=>(
        <View style={[styles.favoritesContainer, { borderRadius: 10 }]}>
          <Text style={styles.favbar}>Favorites</Text>
          <ScrollView style={styles.favoritesScrollContainer}>
            {favorites.length === 0 ? (
              <Text>No favorite recipes added.</Text>
            ) : (
              <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
                {favorites.filter((favorite) => !favorite.hidden).map((recipe) => (

                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    addToFavorites={addRecipeToFavorites}
                    removeFavorite={removeFavorite}
                    addNote={addNoteToRecipe}
                    viewMode={viewMode}
                    isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                    toggleVisibility={toggleRecipeVisibility}
                  />
                ))}

              </View>
              
            )}
          </ScrollView>
        </View>
        
          )}
        </Tab.Screen>
        <Tab.Screen name='HiddenRecipes'>
            {() => (
              <Hidden
                hiddenRecipes={hiddenRecipes}
                toggleVisibility={toggleRecipeVisibility}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
       
    </View >
    </NavigationContainer>
  );
};

const RecipeDetails = ({ ingredients, instructions }) => (
  
  <View style={styles.recipeDetails}>
    <Text style={styles.detailsTitle}>Ingredients:</Text>
    {ingredients.map((ingredient, index) => (
      <Text key={index} style={styles.detailsText}>{ingredient}</Text>
    ))}

    <Text style={styles.detailsTitle}>Instructions:</Text>
    <Text style={styles.detailsText}>{instructions}</Text>
  </View>
);


const RecipeCard = ({ recipe, addToFavorites, removeFavorite, addNote, addRating, viewMode, isFavorite, toggleVisibility }) => {
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0);
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
    Alert.alert(
      'Confirmation',
      'Are you sure you want to hide this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Okay',
          onPress: () => {
            toggleVisibility(recipe.id);
          },
        },
      ]
    );
   
  };
  const handleRemoveFavorite = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove this recipe from favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Okay',
          onPress: () => {
            removeFavorite(recipe.id);
          },
        },
      ]
    );
  };


  const handleCloseDetails = () => {
    setShowDetails(false);
  };


  const handleRatingChange = (value) => {
    setRating(value);
    addRating(recipe.id, value);
  };

  return (

    <View style={viewMode === 'grid' ? styles.recipeCardGrid : styles.recipeCardList}>
      <TouchableOpacity onPress={handleToggleDetails}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Image source={recipe.image} style={{ height: 150, width: 150 }} />
      </TouchableOpacity>

<Modal
      visible={showDetails}
      animationType="slide"
     
    >
      <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={handleCloseDetails}>
                <Icon name="close" size={18} color="red" />
          </TouchableOpacity>

      {showDetails && (

        <View>
           <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Image source={recipe.image} style={{ height: 150, width: 150 }} />
         <RecipeDetails ingredients={recipe.ingredients} instructions={recipe.instructions} />
      <View > 

        <View>
        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    Clipboard.setString(recipe.instructions);
    Alert.alert('Copied to clipboard', 'The recipe instructions have been copied to the clipboard.');
  }}
>
  <Icon name="clipboard" size={18} color="#1a6cf0" />

  <Text style={styles.buttonText}>Copy to clipboard</Text>

</TouchableOpacity>
          </View>
      <View style={styles.buttonContainer}>

     


        <TouchableOpacity onPress={handleToggleVisibility} style={styles.button}>
          <Icon name="eye-slash" size={18} color="#1a6cf0" />
          {/* <Text>{recipe.hidden ? 'Unhide' : 'Hide'}</Text> */}
        </TouchableOpacity>

        {!isFavorite && (
          <TouchableOpacity onPress={handleAddToFavorite} style={styles.button}>
            <Icon name="heart-o" size={18} color="#ff70a6" />
            {/* <Text style={styles.buttonText}></Text> */}
          </TouchableOpacity>
        )}
        {isFavorite && (
          <TouchableOpacity onPress={handleRemoveFavorite} style={styles.button}>
            <Icon name="heart" size={18} color="#ff70a6" />
          </TouchableOpacity>
        )}
       
       </View>
       <View style={styles.notecontainer} >
        <TextInput styles={styles.noteinput}
          value={note}
          onChangeText={(text) => setNote(text)}
          placeholder="Add a note..."
          style={{ flex: 1 }}

        />
        <Button title='Save' onPress={handleAddNote} />
        <TouchableOpacity onPress={handleAddNote}>
          <Icon name="trash" size={18} color="#1a6cf0" />
        </TouchableOpacity>
      
      </View>

      </View>

      </View>
       
      )}
               

   </View>
     </Modal>
 

<View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rate:</Text>
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRatingChange(star)}
              style={styles.ratingStar}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-o'}
                size={18}
                color={star <= rating ? '#FFD700' : '#D3D3D3'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>


    </View>
    
    
  );
};

export default RecipeApp;
