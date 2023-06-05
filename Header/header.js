import { View, Text , Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Header(props) {

   
  return (
<View style={styles.container}>
    <View style={styles.headstyle}>
    <Text style={styles.headtext} >Instant delicious</Text>
 <Icon name = 'cutlery' size={24} color = '#696969'/>
    </View>
    </View>
  );
}