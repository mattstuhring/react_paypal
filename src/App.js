import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import paypal from 'paypal-checkout';
let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        env: 'sandbox',
        client: {
            sandbox: '<insert sandbox api key>',
            production: '<insert production client id>'
        },
        commit: true
    };
  }

  payment(data, actions) {
    return actions.payment.create({
      transactions: [
        {
          amount: { total: '0.01', currency: 'USD' }
        }
      ]
    });
  }

  onAuthorize(data, actions) {
    return actions.payment.execute().then(function(paymentData) {
        // Show a success page to the buyer
    });
  }

  // ***************************  RENDER  ********************************
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Votive</td>
                  <td>Fish</td>
                  <td>$30.00</td>
                </tr>
                <tr>
                  <td>Jewelry</td>
                  <td>Earrings</td>
                  <td>$15.50</td>
                </tr>
                <tr>
                  <td>Houseware</td>
                  <td>Wine Glass</td>
                  <td>$22.50</td>
                </tr>
                <tr>
                  <td>Garden</td>
                  <td>Sun plant stake</td>
                  <td>$35.00</td>
                </tr>
              </tbody>
            </Table>

            <div className="row">
              <div className="col-sm-12 text-center">
                Total: $103.00
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 text-center">
                  <PayPalButton
                    commit={this.state.commit}
                    env={this.state.env}
                    client={this.state.client}
                    payment={(data, actions) => this.payment(data, actions)}
                    onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
