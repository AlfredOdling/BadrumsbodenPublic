import React, { Component } from 'react'

require('../../styles/_features/features.css')

export default class VVSFeatures extends Component {

  render() {
    return (
      <div id="features">
          <section id="three">
            <div>
              <img src="assets/icons/services/fastservice.svg" className="gauge" />

              <h3>Snabb service</h3>
              <p>
                Vi utför VVS service inom 5 arbetsdagar.<br />
                Allt du behöver inom vatten, värme och ventilation
              </p>
            </div>

            <div>
              <img src="assets/icons/services/pricetag.svg" className="tag" />

              <h3>Alltid fast pris</h3>
              <p>
                Har du problem med vattnet eller övrig vvs?
                Låt oss utföra servicearbetet, alltid till fast pris.
              </p>
            </div>

            <div>
              <img src="assets/icons/services/medkit.svg" />

              <h3>Akutservice</h3>
              <p>
                Åtgärdas under dagen. Kontakta oss för vidare information.
              </p>
            </div>
          </section>
      </div>
    )
  }
}
