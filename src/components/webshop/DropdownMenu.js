import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_webshopPage/dropdownMenu.css')

export default class DropdownMenu extends Component {

  clickHandler(e) {
    let category = e.target.parentNode.id+'/'

    if (category=='menu/') {
      browserHistory.push('/webshop/')
    }else {
      let subcategory = e.target.textContent.toLowerCase()
      browserHistory.push('/webshop/'+category+subcategory)
    }
  }

  render() {
    return (
      <div>
          <div id="menu" onClick={this.clickHandler.bind(this)}>
              <div>Badrumsinredning
                <section id="badrumsinredning">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div>Dusch och badkar
                <section id="duschOchBadkar">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div>Blandare
                <section id="blandare">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>Bastu
                <section id="bastu">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>VVS
                <section id="VVS">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>Värme och pumpar
                <section id="varmeOchPumpar">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>
          </div>
      </div>
    )
  }
}
