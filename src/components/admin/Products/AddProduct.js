import React, { Component } from 'react'
import firebase from 'firebase/app'
require('../../../styles/_admin/_products/addProduct.css')
import axios from 'axios'

export default class AddProduct extends Component {
  componentWillMount() {
    /* The id tells which id the last product had, so the next can be incremented */
    this.state = {
      infoText: "Väntar på uppladdning...",
      color: "LimeGreen"
    }
  }

  /* Takes the values from the form and puts in the state when submitted */
  submitForm(e) {
    e.preventDefault()
    let articleNr = this.refs.articleNr.value;
    let supplier = this.refs.supplier.value;
    let productName = this.refs.productName.value.toLowerCase();
    let bild = this.refs.bild.value;
    let description = this.refs.description.value;
    let price = this.refs.price.value;
    let file = this.refs.bild.files[0]

    /* Check if any form fields are empty */
    if(articleNr=='' || supplier=='' || productName=='' || bild=='' || description=='') {
      this.setState({
        infoText:"Alla fält måste innehålla ett värde",
        color:"red"
      })
    }
    else if(isNaN(price)) {
      this.setState({
        infoText:"Pris måste vara endast siffror",
        color:"red"
      })
    }
    else {
      //Image upload
      var filedata = new FormData();
      filedata.append('file', file);

      this.setState({
        infoText: 'Laddar upp till databasen...',
        color: "LimeGreen"
      })

      axios.post('/image', filedata)
      .then(function (res) {
        axios.post('/products', {
          url: res.data.url,
          filename: file.name,
          img_id: res.data.img_id,
          articleNr,
          supplier,
          productName,
          description,
          price,
          category: this.props.param.category,
          subcategory: this.props.param.subcategory
        })
        .then(function (response) {
          /* Successful uploads */
          // Reset inputtext
          this.refs.fileHolder.value = ''
          this.refs.articleNr.value = ''
          this.refs.supplier.value = ''
          this.refs.productName.value = ''
          this.refs.bild.value = ''
          this.refs.description.value = ''
          this.refs.price.value = ''

          this.setState({
            infoText: 'Lyckades ladda upp!',
            color: "LimeGreen"
          })

          let subcat = this.props.param.subcategory
          this.props.fetchData('subcategory', subcat)
        }.bind(this))
        .catch(function (error) {
          this.setState({
            infoText: error,
            infoColor: 'red'
          })
          console.log(error);
        }.bind(this))
      }.bind(this))
      .catch(function (err) {
        // Handle unsuccessful uploads
        this.setState({
          infoText: error,
          color: "red"
        })
      })
    }
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }

  render() {
    return (
      <div id="addProduct">
        <h3>Lägg till produkter i: <span>/{this.props.param.category || ''}/{this.props.param.subcategory || ''}</span></h3>

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="addProductField">
            <div id="lostContainer">
              <section>
                <div>
                  <p>Artikelnr.</p>
                  <input type="text" ref="articleNr" />
                </div>

                <div>
                  <p>Leverantör</p>
                  <input type="text" ref="supplier"/>
                </div>

                <div>
                  <p>Produktnamn</p>
                  <input type="text" ref="productName"/>
                </div>

                <div>
                  <p>Pris</p>
                  <input type="text" ref="price"/>
                </div>

                <div>
                  <p>Bild</p>
                  <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
                  <input type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this)} />
                  <label htmlFor="picUpload">Välj bild</label>
                </div>

                <div>
                  <p>Status uppladdning</p>
                  <div className="infoText" style={{color: this.state.color}}>
                    {this.state.infoText}
                  </div>
                </div>
              </section>

              <section>
                <p>Beskrivning</p>
                <textarea type="text" ref="description" />
              </section>
            </div>
          </div>

          <input type="submit" className="btn greenButton" value="Spara produkter"/>
        </form>
      </div>
    )
  }
}
