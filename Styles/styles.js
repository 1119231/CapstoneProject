import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  recipeCardGrid: {
    marginBottom: 3,
    width: '48%',
    height: 'auto',
    borderWidth: 1,
    backgroundColor: '#f9e5d8',
    borderColor: '#ffeedd',
    padding: 4,
    borderRadius: 10,
    // padding: 2,
  },


  recipeCardList: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#f9e5d8',
    backgroundColor: '#ffeedd',
    padding: 8,
    borderRadius: 10,



  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,


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
    justifyContent: 'space-evenly',
    borderRadius: 10,

  },
  favbar: {
    marginTop: 12,
    paddingLeft: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
    fontSize: 24,
    fontStyle: 'normal',
    color: '#d4a373',
  },

  image: {
    width: 10,
    height: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },


  btn_style: {
    // backgroundColor: '32cd32',
    borderColor: '#32cd32',
    alignItems: 'flex-end',

  },

  favoritesScrollContainer: {
    // backgroundColor: '#32cd32',
    paddingTop: 0,
    paddingLeft: 12,
    paddingRight: 8,
  },

  favoritesContainer: {
    marginTop: 8,
  }


});

export default styles