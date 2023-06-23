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
    marginBottom: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    paddingLeft: 20,
    display: 'flex',
    shadowOffset: {
      width: 0,
      height: 1,
    },
   
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    padding: 10,
   },
  btn_style: {
  
  },
  details: {
    color:'green'
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
    backgroundColor: '#fffec8', 
   
  },
  listContainer: {
    flexDirection: 'column',
    backgroundColor: '#fbbf77',
    borderColor: '#32cd32',
    justifyContent: 'space-evenly'
  },
  favbar: {
    marginTop: 12,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingLeft: 150,
    fontSize: 15,
    fontStyle: 'normal',
    color: 'green',
    backgroundColor: '#A5D6A7',
   
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  favoritesScrollContainer: {
    height: 200, 
  },
 headview: {
    flex: 1,
  },

  notecontainer: {
  
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,

  },
  noteinput: {
    width: '100%',
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
   
 
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },


});

export default styles