import React from "react";
import store from "../lib/store.json";
import products from "../lib/products.json";
// import { Hodl } from "../components/account/Hodl.js";
import { BidReceived } from "../components/pure/BidReceived";
import { BidSent } from "../components/pure/BidSent";

const VIEWS = {
  HODL: "HODL",
  SENT: "SENT",
  RECEIVED: "RECEIVED"
};
export class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    let { userId } = store.account;
    let user = store.users[userId];
    let sent = store.bids.filter(x => x.sender === userId);
    let received = store.bids.filter(x => x.receiver === userId);
    this.state = {
      userId,
      user,
      sent,
      received,
      currentView: VIEWS.HODL
    };
  }

  render() {
    const { userId, user, sent, received, currentView } = this.state;

    let SentList = sent.map(bid => {
      let product =
        products.find(p => `${p.id}` === `${bid.productId}`) || null;
      if (product === null) return null;
      return (
        <BidSent
          id={bid.id}
          title={product.title}
          key={bid.id}
          thumb={product.thumb}
          wei={bid.wei}
        />
      );
    });

    let ReceivedList = received.map(bid => {
      let product =
        products.find(p => `${p.id}` === `${bid.productId}`) || null;
      if (product === null) return null;
      return (
        <BidReceived
          id={bid.id}
          title={product.title}
          key={bid.id}
          thumb={product.thumb}
          wei={bid.wei}
          onAccept={() => {
            alert("Accepted");
          }}
          onDecline={() => {
            alert("Declined");
          }}
        />
      );
    });

    return (
      <div id="AccountPage">
        <div className="row row--section">
          <div class="columns large-6">
            <h2>My Dashboard</h2>
          </div>
          <div class="columns large-6 text-right">
            <h3>Balance <b>0.234 ETH</b></h3>
          </div>
        </div>

        <div className="row">
          <div class="columns large-12">
            <div className="small button-group">
              <button
                onClick={() => {
                  this.setState({ currentView: VIEWS.HODL });
                }}
                className={
                  currentView === VIEWS.HODL
                    ? "button"
                    : "button secondary hollow"
                }
              >
                Images you HODL
              </button>
              <button
                onClick={() => {
                  this.setState({ currentView: VIEWS.SENT });
                }}
                className={
                  currentView === VIEWS.SENT
                    ? "button"
                    : "button secondary hollow"
                }
              >
                Bids Sent
              </button>
              <button
                onClick={() => {
                  this.setState({ currentView: VIEWS.RECEIVED });
                }}
                className={
                  currentView === VIEWS.RECEIVED
                    ? "button"
                    : "button secondary hollow"
                }
              >
                Bids Received
              </button>
            </div>
          </div>
        </div>

        {currentView === VIEWS.HODL && (
          <div>
            <div className="row align-stretch">
              <div class="columns large-12">
                <p>You hodl.</p>
              </div>
            </div>
          </div>
        )}

        {currentView === VIEWS.SENT && (
          <div>
            <div className="row align-stretch">
              <div class="columns large-12">
                <p>You have sent {sent.length} bids.</p>
              </div>
              <div class="columns large-12">
                {SentList}
              </div>
            </div>
          </div>
        )}

        {currentView === VIEWS.RECEIVED && (
          <div>
            <div className="row align-stretch">
              <div class="columns large-12">
                <p>You have received {received.length} bids.</p>
              </div>
              <div class="columns large-12">
                {ReceivedList}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
