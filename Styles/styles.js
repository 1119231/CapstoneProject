import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  recipeCardGrid: {
    marginBottom: 3,
    width: '48%',
    borderWidth: 10,
    borderColor: '#1ecbe1',
    // padding: 2,
  },
  recipeCardList: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: 'green',
    paddingLeft: 20,
    display: 'flex',
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    // marginBottom: 100,

  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#fdfcfc',  //background color
    // borderColor: '#1ecbe1',
  },
  listContainer: {
    flexDirection: 'column',
    backgroundColor: '#fdfcfc',
    borderColor: '#32cd32',
    justifyContent: 'space-evenly'
  },
  favbar: {
    marginTop: 12,
    paddingLeft: 10,
    paddingBottom: 10,
    alignItems: 'left',
    fontSize: 14,
    fontStyle: 'normal',
    color: '#32cd32',
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },


  btn_style: {
    backgroundColor: '32cd32',
    borderColor: '#32cd32',
  },
});

export default styles