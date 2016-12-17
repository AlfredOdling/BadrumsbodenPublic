import React, { Component } from 'react'
import SubCategoryList from './SubCategoryList'
import axios from 'axios'
import { browserHistory } from 'react-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'
import * as shoppingcartActions from '../../../actions/shoppingcartActions'

require('firebase/database')
require('../../../styles/_webshopPage/productView.css')

class Product extends Component {

  componentWillMount() {
    const { params } = this.props
    const { product } = params

    this.state = {
      productItem: [],
      subcatItems: [],
    }
    this.fetchProduct(product)
  }

  fetchProduct(articleNr) {
    axios.get('/products/articleNr/'+articleNr)
    .then(function (response) {
      this.setState({
        productItem: response.data
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  /* Sends the product to actions and displays a message "product added" with a timeout */
  clickedBuyBtn() {
    this.props.actions.shoppingcartActions.addToShoppingcart(this.state.productItem, this.refs.quantity.value)
    this.setState({
      clickedBuy: !this.state.clickedBuy
    })
    setTimeout(function() {
      this.setState({clickedBuy: !this.state.clickedBuy})
    }.bind(this), 1500);
  }

  clickHandler(category, subcategory) {
    if ( typeof(subcategory) === 'string') {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
    } else {
      browserHistory.push('/webshop/'+category)
    }
  }

  render() {
    const { productItem, subcatItems } = this.state
    const { articleNr, price, description, url, productName, category, subcategory } = productItem
    let styles = {paddingLeft: 10}

    return (
    <div id="productView">
      <div className="breadCrumbs">
        <span id="1" onClick={this.clickHandler.bind(this, category)} style={styles}>{category} ></span>
        <span id="2" onClick={this.clickHandler.bind(this, category, subcategory)} style={styles}>{subcategory} ></span>
        <span id="3" style={styles}>{productName}</span>
      </div>

      <section>
        <figure style={{padding:'5px', backgroundImage: 'url(' + url + ')'}} />
      </section>

      <section>
        <h2>{productName}</h2>
        <p>Artikelnummer: {articleNr}</p>

        <p>{description}</p>
        <p>Antal</p>
        <select ref="quantity" defaultValue="1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        <p className="cart">Lägg till i varukorg:</p>
        <div onClick={this.clickedBuyBtn.bind(this)} className="buy-btn">
          <span>{price}:-</span>
          <span><figure /></span>
        </div>

        <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.clickedBuy ? <p className="added">Produkt tillagd!</p> : ''}
        </ReactCSSTransitionGroup>
      </section>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      firebaseActions: bindActionCreators(firebaseActions, dispatch),
      shoppingcartActions: bindActionCreators(shoppingcartActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
