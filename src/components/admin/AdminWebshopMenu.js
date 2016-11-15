import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('../../styles/_adminSimon/adminWebshopMenu.css')

export default class AdminWebshopMenu extends Component {

  /* When a user clicks a link, router redirects to the name of the link */
  handleClick(e) {
    var name = e.target.getAttribute('name')
    browserHistory.push('/admin/webshop/' + name)
  }

  /* Two menu items. When one is clicked, it changes background color depending on the URL */
  render() {
    return (
      <div id="adminWebshopMenu">
        <div name="produkter"
             onClick={this.handleClick.bind(this)}
             className={this.props.param=='produkter'?'active':'passive'}
        >
          <span name="produkter" >Produkter, kategorier och toppsäljare</span>
        </div>

        <div name="kampanjer"
             onClick={this.handleClick.bind(this)}
             className={this.props.param=='kampanjer'?'active':'passive'}
        >
          <span name="kampanjer">Kampanjer och banner</span>
        </div>
      </div>
    )
  }
}
