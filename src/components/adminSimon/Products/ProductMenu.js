import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_adminSimon/_products/productMenu.css')

/* CategoryItem is the main category, which contains sub categories in it */
class CategoryItem extends Component {
  componentWillMount() {
    this.state = {clicked: false}
  }
  handleClick() {
    this.setState({clicked:!this.state.clicked})
  }

  render() {
    return (
      <div>
        <div className="listHead">
          <div onClick={this.handleClick.bind(this)}>
            {this.props.name}
          </div>
          {/*{<figure />}*/}
        </div>
        {this.state.clicked ? <SubListItems showProductTable={this.props.showProductTable} categories={this.props}/> : ''}
      </div>
    );
  }
}

class SubListItems extends Component {
  handleClick(subcategory, category) {
    browserHistory.push('/newAdmin/webshop/produkter/' + category.toLowerCase() + '/' + subcategory.toLowerCase())
    this.props.showProductTable()
  }

  render() {
    let category = this.props.categories.name
    return (
      <div>
        <ul>
          {this.props.categories.subCategories.map(function(subcategory, i) {
            return (
              <li key={i} onClick={this.handleClick.bind(this, subcategory, category)}>{subcategory}</li>
          )}, this)}
        </ul>
      </div>
    );
  }
}

export default class ProductMenu extends Component {
  componentWillMount() {
    /* Contains all the product menu items from the db */
    this.state = {
      categories: [
        {
          name: 'Badrumsinredning',
          subCategories: ['Aggregat', 'Bastudörrar', 'Lampor', 'Batterier'],
          key:'1'
        },
        {
          name: 'Dusch och badkar',
          subCategories: ['Duschar', 'badkar', 'stora', 'små'],
          key:'2'
        },
        {
          name: 'Toppsäljare',
          subCategories: ['Alla toppsäljare'],
          key:'3'
        },
      ]
    }
  }

  render() {
    /* Spits out all the product menu's and then a yellow menu item with the top-sellers */
    return (
      <div id="productMenu">
        {this.state.categories.map((category) => {
          return (
          <CategoryItem id="yellow"
            key={category.key}
            name={category.name}
            subCategories={category.subCategories}
            showProductTable={this.props.showProductTable}/>
        )})}
      </div>
    )
  }
}
