const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const SELECT_TYPE = 'SELECT_TYPE'

import firebase from 'firebase/app'

export function fetchFirebaseData(path, query, searchString) {
  var ref
  /* Get products in admin */
  if(path=='products'){
    ref = firebase.database()
    .ref()
    .child('webshop/products')
    .orderByChild(query)
    .equalTo(searchString)
  }
  else if(path=='lastProduct'){
    ref = firebase.database()
    .ref()
    .child('webshop/products')
    .orderByChild(query)
    .equalTo(searchString)
  }
  else if(path=='search'){
    ref = firebase.database()
    .ref()
    .child('webshop/products')
    .orderByChild(query)
    .startAt(searchString).endAt(searchString+'\uf8ff')
  }
  else if(path=='categories'){
    ref = firebase.database()
    .ref()
    .child('webshop/categories')
    .orderByChild(query)
    .equalTo(searchString)

    path = path+'/'+searchString
  }
  else if(path=='allCategories'){
    ref = firebase.database()
    .ref()
    .child('webshop/categories')
    .orderByChild(query)
  }
  else if(path=='gallery'){
    ref = firebase.database()
    .ref()
    .child('gallery')
    .orderByChild(query)
    .equalTo(searchString)

    path = path+'/'+searchString
  }
  else {
    ref = firebase.database()
    .ref()
    .child(path)
  }

  return (dispatch) => {
    ref.once('value', (snapshot) => {
      var items = []
      // Loop through {objects} in order
      snapshot.forEach( (childSnapshot) => {
        //The object
        var item = childSnapshot.val()
        //Get the key of object and push into object
        item['key'] = childSnapshot.key
        //Push object to array with items
        items.push(item)
      })
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder: path,
        items
      })
    })
  }
}

/* Fetches the last product Id that was added */
export function fetchProductId() {
  let ref = firebase.database().ref('webshop/products').endAt().limitToLast(1)

  return (dispatch) => {
    ref.on('child_added', (snapshot) => {
      let items = snapshot.val()
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder:'productId',
        items
      })
    })
  }
}

export function fetchFirebaseDataAdmin(path, query, searchString) {
  var ref
  /* Get products in admin */
  if(path=='products'){
    ref = firebase.database()
    .ref()
    .child('webshop/products')
    .orderByChild(query)
    .equalTo(searchString)
  }
  else if(path=='categories'){
    ref = firebase.database()
    .ref()
    .child('webshop/categories')
    .orderByChild(query)
    .equalTo(searchString)

    path = path+'/'+searchString
  }
  else if(path=='gallery'){
    ref = firebase.database()
    .ref()
    .child('gallery')
    .orderByChild(query)
    .equalTo(searchString)

    path = path+'/'+searchString
  }
  else {
    ref = firebase.database()
    .ref()
    .child(path)
  }

  return (dispatch) => {
    ref.on('value', (snapshot) => {
      var items = []
      // Loop through {objects} in order
      snapshot.forEach( (childSnapshot) => {
        //The object
        var item = childSnapshot.val()
        //Get the key of object and push into object
        item['key'] = childSnapshot.key
        //Push object to array with items
        items.push(item)
      })
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder: path,
        items
      })
    })
  }
}

export function fetchSingleFirebaseItem(path) {
  let ref = firebase.database().ref(path)

  return (dispatch) => {
    ref.on('value', (snapshot) => {
      let items = []
      items.push(snapshot.val())
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder: path,
        items
      })
    })
  }
}

export function deleteFirebaseElement(type, article) {
  var ref

  if(type=='products'){
    // ref = firebase.database()
    // .ref()
    // .child('webshop/products/'+article.key)
    // .remove()
    //
    // .then(() => {
      //console.log('Database: deleted!')
      var storageRef = firebase.storage()
      .ref()
      .child('webshop/products/'+article.filename)
      .delete()

      console.log('Storage: deleted!')
    //})
  } else if(type=='gallery'){
    ref = firebase.database()
    .ref()
    .child('gallery/'+article.key)
    .remove()

    .then(() => {
      console.log('Database: deleted!')
      var storageRef = firebase.storage()
      .ref()
      .child('gallery/'+article.filename)
      .delete()

      console.log('Storage: deleted!')
    })
  }

  return (dispatch) => {
    dispatch({
      type: DELETE_FIREBASE_DATA,
      folder: article.folder,
      productName: article.productName
    })
  }
}

export function selectSearchType(type) {
  return {
    type: SELECT_TYPE,
    searchType: type
  }
}
