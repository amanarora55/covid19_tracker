import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

import WorldTracker from "./WorldTracker";
import IndiaTracker from "./IndiaTracker";

import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      current_location: "",
    };
  }

  //   componentDidMount() {
  //     this.setState({
  //       current_location: this.props.router.location.pathname.replace("/", ""),
  //     });
  //   }

  //   static getDerivedStateFromProps(props, state) {
  //     if (props.router.location.pathname.replace("/", "") !== state.currentRow) {
  //       return {
  //         current_location: props.router.location.pathname.replace("/", ""),
  //       };
  //     }
  //     // Return null to indicate no change to state.
  //     return null;
  //   }
  _displayPageHeading() {
    if (window.location.pathname == "/world-tracker") {
      return "Pandemic Covid-19 World Tracker";
    } else {
      return "Pandemic Covid-19 India Tracker";
    }
  }
  _displayHeaderRight() {
    console.log(this.myRef);
    if (this.myRef.current && this.myRef.current.clientWidth > 300) {
      if (window.location.pathname == "/world-tracker") {
        return (
          <NavLink to="/india-tracker" className="header-item tracker-heading">
            India Covid-19 Tracker
          </NavLink>
        );
      } else {
        return (
          <NavLink to="/world-tracker" className="header-item tracker-heading">
            World Covid-19 Tracker
          </NavLink>
        );
      }
    }
  }
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo">{this._displayPageHeading()}</div>
            <div className="header-right" ref={this.myRef}>
              <div className="aman">{this._displayHeaderRight()}</div>
            </div>
          </Header>
          <Content
            className="site-layout"
            style={{ padding: "0 25px", marginTop: 64 }}
          >
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 380,
                background: "#fff",
                marginTop: "30px",
              }}
            >
              <Switch>
                <Route exact path="/">
                  <Redirect to="/world-tracker" />
                </Route>
                <Route exact path="/world-tracker" component={WorldTracker} />
                <Route exact path="/india-tracker" component={IndiaTracker} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            A Covid-19 Tracker Project, created with the help of apis providing
            data from resources like: <a>api.covid19api.com</a> and &nbsp;
            <a>api.covid19india.org</a>.
            <br />
            Created by Aman Arora | Built using react and redux.
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  router: state.router,
});

export default connect(mapStateToProps, {})(Home);
