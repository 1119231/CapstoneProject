
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, Alert, Modal, useColorScheme, } from 'react-native';
import styles from './Styles/styles';
import Header from './Header/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Hidden from './Hidden';
import * as database from './database';
import { collection, addDoc, doc, updateDoc, query, where, deleteDoc, getDocs } from "firebase/firestore";
import { load, save, update, remove } from "./database"; // Update the import statement for the database functions
import { db, storage } from "./database/config";
import { Clipboard } from 'react-native';
import { getDownloadURL, ref } from "firebase/storage";


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
  const [hiddenRecipes2, setHiddenRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
    fetchFavoriteRecipes();
    // handleSearch();
  }, []);



  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipe"));
      console.log("Query snapshot:", querySnapshot.size);

      const recipesData = [];

      querySnapshot.forEach(async (doc) => {
        console.log("fetching data")
        const data = doc.data();

        // const imagePath = data.imagePath; // Assuming "imagePath" is the field containing the relative path to the image in Firebase Storage.
        // const fileRef = ref(storage, imagePath); // Create a reference to the specific file using the imagePath field.
        // const imageURL = await getDownloadURL(fileRef); 
        // console.log("Recipes data:", imageURL)
        console.log("fetching image")
        recipesData.push({ id: doc.id, ...doc.data(), rating: data.rating || 0, isHidden: data.isHidden || false, });
      });
      setRecipes(recipesData);
      setAllRecipes(recipesData);




    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  const fetchFavoriteRecipes = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "recipe"), where("isFavorite", "==", true)));
      const favoriteRecipes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavorites(favoriteRecipes);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };


  const addRecipeToFavorites = async (recipe) => {

    try {
      // Update the "isFavorite" field to true in the recipe document
      await updateDoc(doc(db, "recipe", recipe.id), { isFavorite: true });

      // Add the recipe to the favorites state
      setFavorites([...favorites, { ...recipe, isFavorite: true }]);
      const updatedRecipes = recipes.map((rec) =>
        rec.id === recipe.id ? { ...rec, isFavorite: true } : rec
      );
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
    }
  };
  const removeFavorite = async (recipeId, favorites) => {

    try {
      // Get the document reference for the recipe with the given recipeId
      const recipeDocRef = doc(db, "recipe", recipeId);

      // Update the "isFavorite" field to false in the recipe document
      await updateDoc(recipeDocRef, { isFavorite: false });

      // Update the favorites state by removing the recipe with the matching ID
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== recipeId);
      setFavorites(updatedFavorites);
      const updatedRecipes = recipes.map((rec) =>
        rec.id === recipeId ? { ...rec, isFavorite: false } : rec
      );
      setRecipes(updatedRecipes);

    } catch (error) {
      console.error("Error removing from favorites:", error);
    }

  };

  const addNoteToRecipe = async (recipeId, note) => {
    try {
      // Update the note for the recipe in the "recipes" collection in Firestore
      await updateDoc(doc(db, "recipe", recipeId), { note });
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === recipeId) {
          return { ...recipe, note };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error adding note to recipe:", error);
    }
  };
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };




  const handleSearch = () => {
    const filteredRecipes = allRecipes.filter((recipe) => {
      const isHidden2 = hiddenRecipes.some((hiddenRecipe) => hiddenRecipe.id === recipe.id);
      if (isHidden2) {
        return false; // Exclude hidden recipes from the search results
      }

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
  }, [searchQuery, selectedTags, allRecipes]);




  const toggleRecipeVisibility = async (recipeId) => {
    try {
      // Get the recipe object from the recipes array based on the recipeId
      const recipe = recipes.find((rec) => rec.id === recipeId);

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      // Toggle the "isHidden" field to the opposite value (true -> false, false -> true) in the recipe document
      await updateDoc(doc(db, "recipe", recipe.id), { isHidden: !recipe.isHidden });

      // Update the local state to reflect the visibility change
      const updatedRecipes = recipes.map((rec) => {
        if (rec.id === recipe.id) {
          return { ...rec, isHidden: !rec.isHidden };
        }
        return rec;
      });

      setHiddenRecipes(updatedRecipes.filter((rec) => rec.isHidden));
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error toggling recipe visibility:", error);
    }

  }
  const visibleRecipes = recipes.filter((recipe) => !recipe.isHidden);
  const hiddenRecipes = recipes.filter((recipe) => recipe.isHidden);


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

  const addRating = async (recipeId, rating) => {
    try {
      // Update the rating for the recipe in the "recipes" collection in Firestore
      await updateDoc(doc(db, "recipe", recipeId), { rating });
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === recipeId) {
          return { ...recipe, rating };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error adding rating to recipe:", error);
    }
  };



  const removeNote = async (recipeId) => {
    try {
      // Update the note for the recipe in the "recipe" collection in Firestore to null (remove the note)
      await updateDoc(doc(db, "recipe", recipeId), { note: null });

      // Update the local state to remove the note from the recipe
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === recipeId) {
          return { ...recipe, note: null };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);

    } catch (error) {
      console.error("Error removing note from recipe:", error);
    }
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

                      {recipes.filter((recipe) => !recipe.isHidden).map((recipe) => (

                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          addToFavorites={addRecipeToFavorites}
                          removeFavorite={removeFavorite}
                          favorites={favorites}
                          setFavorites={setFavorites}
                          addNote={addNoteToRecipe}
                          addRating={addRating}
                          viewMode={viewMode}
                          removeNote={removeNote}
                          isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                          // handleToggleVisibility={handleToggleVisibility}
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
            {() => (
              <View style={[styles.favoritesContainer, { borderRadius: 10 }]}>
                <Text style={styles.favbar}>Favorites</Text>
                <ScrollView style={styles.favoritesScrollContainer}>
                  {favorites.length === 0 ? (
                    <Text>No favorite recipes added.</Text>
                  ) : (
                    <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
                      {favorites.filter((favorite) => !favorite.isHidden).map((recipe) => (

                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          addToFavorites={addRecipeToFavorites}
                          removeFavorite={removeFavorite}
                          addNote={addNoteToRecipe}
                          favorites={favorites}
                          setFavorites={setFavorites}
                          viewMode={viewMode}
                          removeNote={removeNote}
                          isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                          toggleVisibility={toggleRecipeVisibility}
                          recipes={recipes}
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


const RecipeCard = ({ recipe, removeNote, addToFavorites, removeFavorite, favorites, addNote, addRating, viewMode, isFavorite, setFavorites, toggleVisibility }) => {
  const [note, setNote] = useState(recipe.note || '');
  const [rating, setRating] = useState(recipe.rating || 0);
  const [showDetails, setShowDetails] = useState(false);



  const handleAddToFavorite = async () => {
    addToFavorites(recipe);
  };


  const handleAddNote = () => {
    addNote(recipe.id, note);

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
  // const handleToggleVisibility = async (recipeId) => {
  //   // Call the prop function instead of the local function
  //   toggleVisibility(recipeId);
  // };


  const handleRemoveFavorite = async (recipeId) => {
    removeFavorite(recipe.id, favorites);

  };


  const handleCloseDetails = () => {
    setShowDetails(false);
  };


  const handleRatingChange = (value) => {
    setRating(value);
    addRating(recipe.id, value);
  };


  const handleRemoveNote = async (recipeId) => {
    try {
      await removeNote(recipeId);
    } catch (error) {
      console.error("Error removing note from recipe:", error);
    }
    setNote('')

  };
  return (

    <View style={viewMode === 'grid' ? styles.recipeCardGrid : styles.recipeCardList}>
      <TouchableOpacity onPress={handleToggleDetails}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Image source={require('../Instant_Delicious/assets/pasta_dish1.jpeg')} style={{ height: 150, width: 150 }} />
      </TouchableOpacity>

      <Modal
        visible={showDetails}
        animationType="slide"
      >
        <ScrollView>
          <View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity style={styles.clearButton} onPress={handleCloseDetails}>
                <Icon name="close" size={20} color="black" style={{ marginLeft: 350 }} />
              </TouchableOpacity>

              {showDetails && (

                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>


                  <Image source={require('../Instant_Delicious/assets/pasta_dish1.jpeg')} style={{
                    height: 150, width: 150,
                    alignSelf: 'flex-start', margin: 8
                  }} />
                  <View>
                    <RecipeDetails ingredients={recipe.ingredients} instructions={recipe.instructions} />
                  </View>
                  <View>

                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          Clipboard.setString(recipe.instructions);
                          Alert.alert('Copied to clipboard', 'The recipe instructions have been copied to the clipboard.');
                        }}>
                        <Text Copy recipe></Text>
                        <Icon name="copy" size={20} color="#1a6cf0" text='copy' />

                      </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>

                      <TouchableOpacity onPress={handleToggleVisibility} style={styles.button}>
                        <Icon name="eye-slash" size={20} color="#1a6cf0" style={{ marginLeft: 320, }} />
                        {/* <Text>{recipe.hidden ? 'Unhide' : 'Hide'}</Text> */}
                      </TouchableOpacity>

                      {!isFavorite && (
                        <TouchableOpacity onPress={handleAddToFavorite} style={styles.button}>
                          <Icon name="heart-o" size={20} color="#ff70a6" style={{ paddingRight: 10 }} />
                          {/* <Text style={styles.buttonText}></Text> */}
                        </TouchableOpacity>
                      )}
                      {isFavorite && (
                        <TouchableOpacity onPress={() => handleRemoveFavorite(recipe.id, favorites)} style={styles.button}>
                          <Icon name="heart" size={20} color="#ff70a6" style={{ paddingRight: 10 }} />
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
                    </View>

                    <View>
                      <Button title='Cancel' onPress={() => handleRemoveNote(recipe.id)} >
                        {/* <Icon name="Discard" size={20} color="#1a6cf0" style={{ padding: 20 }} /> */}
                      </Button>
                    </View>
                    <View>
                      <Button title='Save' onPress={handleAddNote} />
                    </View>


                  </View>
                </View>
              )}
            </View>


          </View>
        </ScrollView>

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
