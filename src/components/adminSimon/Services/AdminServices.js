import React, { Component } from 'react'
import AdminGallery from './AdminGallery'

require('styles/_adminSimon/_services/adminServices.css')

export default class AdminServices extends Component {
  render() {
    return (
      <div id="adminServices">
        <AdminGallery />
      </div>
    )
  }
}