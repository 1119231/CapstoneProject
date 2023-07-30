import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 


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
              <Image source={recipe.image} style={{ height: 150, width: 150 }} />
              <TouchableOpacity onPress={() => toggleVisibility(recipe.id)}>
              <Icon name="eye" size={20} color="green" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Hidden;
