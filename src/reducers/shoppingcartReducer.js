import Immutable from 'seamless-immutable'

import { addToShoppingcart, createShoppingCart } from '../actions/shoppingcartActions'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const SUMMARY = 'SUMMARY'
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

const initialState = Immutable({
  summary: {
    sum: 0,
    quantity: 0
  }
})

export default function shoppingcartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state
        .setIn(['products', /*action.product.articleNr*/'sdf'], addArticle(action))

    case FETCH_PRODUCTS:
      return state
        .set(('products'), action.products)

    case DELETE_PRODUCT:
      return state
        .setIn(['products', action.articleNr], undefined)

    case SUMMARY:
      return state
        .set('summary', calculateSums(action, state))

    case FETCH_SUMMARY:
      return state
        .set('summary', fetchSum(action, state))

    case CREATE_SHOPPING_CART:
      return state
        .set(action.id, createCart(action))

    case UPDATE_QUANTITY:
      return state.
        set('summary', calculateQuantity(action, state))
  }

  return state
}

function addArticle(action) {
  return {
    product: action.product
  }
}

function calculateQuantity(action, state) {
  return {
    quantity: state.summary.quantity + action.quantity
  }
}

function calculateSums(action, state) {
  return {
      sum: state.summary.sum + action.price,
      quantity: state.summary.quantity + action.quantity
  }
}

function fetchSum(action, state) {
  return {
      sum: action.sum,
      quantity: action.quantity
  }
}

function calculateSumsDelete(action, state) {
  return {
      sum: state.summary.sum - action.product.price,
      quantity: state.summary.quantity - action.product.quantity
  }
}

function createCart(action) {
  return {
    id: action.id,
  }
}
