import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from 'react-native-vector-icons';
//import { Hidden } from '../Hidden';


export default function Header() {
  const navigation = useNavigation();
  const [showHidden, setShowHidden] = useState(false);

  const handleHiddenPress = () => {
    setShowHidden(!showHidden);
  };
  const handleHideOptionPress = () => {
    navigation.navigate('Hidden');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headstyle}>
        <Text style={styles.headtext} >Instant delicious</Text>
        <Icon name='cutlery' size={24} color='#696969' />

        <TouchableOpacity onPress={handleHiddenPress} style={styles.menuButton}>
          <MaterialIcons
            name="more-vert"
            size={24}
            color="#696969"
            style={styles.dotsIcon}
          />
        </TouchableOpacity>

        {showHidden && (
          <TouchableOpacity onPress={handleHideOptionPress} style={styles.menuButton}>
            <Text>Hidden</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
