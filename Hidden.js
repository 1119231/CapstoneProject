import React from 'react';


import { View, Text, TouchableOpacity } from 'react-native';

const Hidden = ({ hiddenRecipes, toggleVisibility }) => {
  return (
    <View>
     
      {hiddenRecipes.length === 0 ? (
        <Text>No recipes are hidden.</Text>
      ) : (
        <View>
          {hiddenRecipes.map((recipe) => (
            <View key={recipe.id}>
              <Text>{recipe.title}</Text>
              <TouchableOpacity onPress={() => toggleVisibility(recipe.id)}>
                <Text>Unhide</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Hidden;

import { View, Text } from 'react-native';

import { View, Text, TouchableOpacity } from 'react-native';


const Hidden = ({ hiddenRecipes, toggleVisibility }) => {
  return (
    <View>
     
      {hiddenRecipes.length === 0 ? (
        <Text>No recipes are hidden.</Text>
      ) : (
        <View>
          {hiddenRecipes.map((recipe) => (
            <View key={recipe.id}>
              <Text>{recipe.title}</Text>
              <TouchableOpacity onPress={() => toggleVisibility(recipe.id)}>
                <Text>Unhide</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};


export default Hidden;

