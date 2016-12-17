import axios from 'axios'
import OverlayMessages from './OverlayMessages'
import React, { Component } from 'react'

require('../../styles/_servicesPage/vvsRequest.css')

export default class VVSRequest extends Component {
  componentWillMount() {
    this.state = {
      form: {},
      responseType: '',
      overlay: false,
    }
  }

  /* Takes the input fields and stores them in the state */
  submitForm(e) {
    e.preventDefault()
    let inputValues = {}

    // Get all input fields
    for(let input in this.refs) {
      inputValues[input] = this.refs[input].value
    }

    // axios({
    //   method: 'post',
    //   url: 'https://badrumsboden.herokuapp.com/email/VVSRequest',
    //   data: inputValues
    // })
    axios.post('/email/VVSRequest', inputValues)
      .then(function (res) {
        console.log("responseType", res)
        this.setResponseType('message')
      }.bind(this))
      .catch(function (err) {
        console.log("error", err)
        this.setResponseType('error')
      }.bind(this))

    this.setState({
      form: {}
    })
  }
  /* Sets the response type of this component */
  setResponseType(response) {
    this.setState({
      responseType: response,
      overlay:true
    })
  }

  exitOverlay() {
    this.setState({
      overlay:false
    })
  }
  render() {
    var styleVar = {
      backgroundImage: 'url(../../assets/images/services/vvs_green_bg.svg)',
      backgroundPosition: 'left center'
    }

    return (
      <div className="serviceForm" id="vvsRequest" style={styleVar}>
        {this.state.overlay ?
          <OverlayMessages
            responseType={this.state.responseType}
            exitOverlay={this.exitOverlay.bind(this)}
            errorMessage={"Försök igen eller skicka ett mail till info@badrumsboden.se med din förfrågan"} />
           :''}


        <section>
          <div>
            <h2>Kontakta oss för VVS och värmejobb!</h2>
            <p>
              Skriv ditt meddelande till oss med din VVS-förfrågan, så svarar vi så fort vi kan.<br /><br />
            Du kan kontakta oss om all form av VVS-arbeten och värmejobb. <br/>
            </p>

            <p style={{fontStyle:'italic', fontSize:'98%'}}>
              <br/>
              Fält som är markerade med * är obligatoriska fält.
            </p>
          </div>

          <div>
            <form onSubmit={this.submitForm.bind(this)} name="vvsRequest">
              <div>
                <h4>Namn*</h4>
                <input type="text" ref="namn" required="true"/>

                <h4>Telefonnummer*</h4>
                <input type="text" ref="telefonNummer" required="true"/>

                <h4>E-post*</h4>
                <input type="text" ref="epost" required="true"/>
              </div>

              <div>
                <div className="circle">Svar<br /> inom 24h!</div>
                <h4>Meddelande*</h4>
                  <textarea ref="meddelande" required="true"/>
                  <input type="submit" className="btn" id="send" value="Skicka förfrågan"/>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
