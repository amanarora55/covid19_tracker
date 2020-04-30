import React, { Component } from "react";

import { Collapse } from "antd";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Collapsable extends Component {
  _displayText = (data) => {
    let local_data = data[0];

    return Object.keys(local_data).map((dt) => (
      // console.log(dt, local_data[dt])
      <div className="collapsable-text-section">
        <h2 style={{ fontSize: "14px" }}>{dt !== "Unknown" ? dt : "Other"}</h2>
        <p style={{ fontSize: "12px" }}>
          Confirmed : <span className="green">{local_data[dt].confirmed}</span>
        </p>
      </div>
    ));
  };
  render() {
    // console.log(this.props.data.map((dt) => console.log(Object.keys(dt)[0])));

    const { data } = this.props;
    return (
      <div className="collapsable-section">
        <Collapse
          defaultActiveKey={["0"]}
          accordion
          expandIconPosition="right"
          style={{ borderRadius: "10px", marginTop: "30px" }}
        >
          {data &&
            data.map((dt, i) => (
              <Panel
                key={i}
                header={Object.keys(dt)[0]}
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    minHeight: "100px",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {this._displayText(Object.values(Object.values(dt)[0]))}
                </div>
              </Panel>
            ))}
          {/* <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel> */}
        </Collapse>
      </div>
    );
  }
}

export default Collapsable;
