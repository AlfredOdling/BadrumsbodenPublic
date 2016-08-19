import React, { Component } from 'react'

export default class GalleryElement extends Component {

  render() {

    return (
      <div>
        <li>{this.props.item.name}</li>
        <br/>
        <img src={this.props.item.url} alt="" />
        <br/>
        <button type="button">Delete</button>
      </div>
    )
  }
}
