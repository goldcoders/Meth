import React from "react";

export class BidReceived extends React.PureComponent {
  render() {
    const { title, thumb, wei } = this.props;
    let ether = (wei / (10e17)).toFixed(2)
    return (
      <div className="row align-stretch" >
        <div className="row columns align-stretch">
          <div className="callout">
            <div className="row ">
              <div className="columns"><img class="thumbnail" src={thumb} alt={title} /></div>
              <div className="columns">{title}</div>
              <div className="columns">{ether} ETH</div>
              <div className="columns">
                <div className="button-group">
                  <button className="button primary">Accept Bid</button>
                  <button className="button hollow">Declin</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
