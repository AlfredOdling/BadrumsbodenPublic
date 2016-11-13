import cookie from 'react-cookie'
import firebase from 'firebase/app'

const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

export function addProduct(product, quantity) {

  let object = {
    articleNr: product.articleNr,
    quantity: quantity //+ parseInt(cookieObj.quantity)
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('product'+product.articleNr, stringObj, { path: '/', expires: d })

  return {
    type: ADD_PRODUCT,
    info: 'added_product'
  }
}

export function updateArticleQuantity(articleNr, quantity) {
  let cookies =  cookie.load('product123123')

  let object = {
    quantity: cookie.quantity + quantity,
    articleNr: cookie.articleNr
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('product'+articleNr, stringObj, { path: '/', expires: d })


  return {
    type: UPDATE_QUANTITY,
    articleNr,
    quantity: object
  }
}

export function deleteProduct(articleNr) {
  cookie.remove('articles'+[articleNr], { path: '/'})

  return {
    type: DELETE_PRODUCT,
    articleNr
  }
}

export function updateSummary(quantity, price) {
  let cookieObj = cookie.load('summary')

  if (!cookieObj) {
    cookieObj = { quantity: 0, sum: 0 }
  }

  let object = {
    sum: parseInt(cookieObj.sum) + parseInt(price*quantity),
    quantity: parseInt(cookieObj.quantity) + quantity
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('summary', stringObj, { path: '/', expires: d })

  return {
    type: FETCH_SUMMARY,
    quantity: object.quantity,
    sum: object.sum
  }
}

export function fetchSummary() {
  let cookieObj = cookie.load('summary')

  if (!cookieObj) {
    cookieObj = { quantity: 0, sum: 0 }
  }

  return {
    type: FETCH_SUMMARY,
    quantity: cookieObj.quantity,
    sum: cookieObj.sum
  }
}

export function addToShoppingcart(product, quantity) {
  return (dispatch) => {
    dispatch( addProduct(product, quantity))
    dispatch( updateSummary(parseInt(quantity), parseInt(product.price)))
  }
}

export function removeFromShoppingcart(product) {
  return (dispatch) => {
    dispatch( deleteProduct(product.articleNr))
    dispatch( updateSummary(parseInt(-product.quantity), parseInt(product.price)))
  }
}

export function updateQuantity(product, quantity) {
  return (dispatch) => {
    dispatch( updateArticleQuantity(product.articleNr, quantity))
    dispatch( updateSummary(parseInt(quantity), parseInt(product.price)))
  }
}
