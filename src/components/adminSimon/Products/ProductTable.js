import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('styles/_adminSimon/_products/productTable.css')
require('styles/_fixedDataTable/fixed-data-table.css')

/* The ProductTable contains a FittedTable which comes from Facebook's
* fixed-data-table, and it's responsive. In the table there is six columns
* with data from the database. Then comes the AddProduct component
*/
class ProductTable extends Component {

  componentWillMount() {
    this.state = {
      products: [],
      columns: [],
      path: ''
    }
    console.log('1');
    browserHistory.listen( (event) => {
      let newVar = event.pathname.replace('/newAdmin', '')

      this.props.fetchFirebaseData(newVar)
console.log('2');
      this.setState({
        path: newVar
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('3');

    let path = 'webshop/produkter/badrumsinredning/stolar'
    let fbData = nextProps.firebaseData ? nextProps.firebaseData[this.state.path].items : []

    let arrr = fbData.map( (item) => {
      return [item.articleNr, item.supplier, item.productName, item.description, item.filename]
    }
  )

  this.state = {
    products: arrr,
    columns: [
      ['Artikelnr.'],
      ['Leverantör'],
      ['Namn'],
      ['Beskrivning'],
      ['Bild']
    ]
  }
}

render() {
console.log('4');
  return (
    <div id="productTable">
      <FittedTable
        rowHeight={50}
        rowsCount={this.state.products.length}
        headerHeight={50}
        >
        <Column
          header={<Cell>{this.state.columns[0]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][0]}
            </Cell>
          )}
          flexGrow={1}
          width={50}
          />

        <Column
          header={<Cell>{this.state.columns[1]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][1]}
            </Cell>
          )}
          flexGrow={1}
          width={150}
          />
        <Column
          header={<Cell>{this.state.columns[2]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][2]}
            </Cell>
          )}
          flexGrow={1}
          width={300}
          />
        <Column
          header={<Cell>{this.state.columns[3]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][3]}
            </Cell>
          )}
          flexGrow={1}
          width={300}
          />
        <Column
          header={<Cell>{this.state.columns[4]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][4]}
            </Cell>
          )}
          flexGrow={1}
          width={100}
          />

        <Column
          cell={
            <Cell>
              <figure className="star" />
              <figure className="pencil" />
              <figure className="trash" />
            </Cell>}
            flexGrow={1}
            width={60}
            />
        </FittedTable>

        <AddProduct />
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
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable)
