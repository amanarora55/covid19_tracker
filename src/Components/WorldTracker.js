import React, { Component } from "react";

import { connect } from "react-redux";

import moment from "moment";

import { fetchWorldData, searchCountry } from "../Actions/worldActions";
import Loader from "../Essentials/Loader";

import { Select } from "antd";

const { Option } = Select;

class WorldTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSelected: "",
      searchLoader: false,
    };
  }

  componentDidMount() {
    this.props.fetchWorldData();
  }

  _displayWorldData = (world_data) => {
    return (
      <div className="flex-row-sa">
        {world_data && !world_data.show_loader ? (
          <div className="box-red">
            <div className="overlay"></div>
            <h2 className="box-heading">World Total Confirmed Cases</h2>
            <h3 className="box-stats red">{world_data.data.TotalConfirmed}</h3>
            {world_data.data.NewConfirmed > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewConfirmed}
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewConfirmed}
              </h3>
            )}
          </div>
        ) : (
          <div className="box-grey">
            <Loader />
          </div>
        )}
        {world_data && !world_data.show_loader ? (
          <div className="box-grey">
            <div className="overlay"></div>
            <h2 className="box-heading">World Total Death Cases</h2>
            <h3 className="box-stats grey">{world_data.data.TotalDeaths}</h3>
            {world_data.data.NewDeaths > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewDeaths}
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewDeaths}
              </h3>
            )}
          </div>
        ) : (
          <div className="box-grey">
            <Loader />
          </div>
        )}

        {world_data && !world_data.show_loader ? (
          <div className="box-green">
            <div className="overlay"></div>{" "}
            <h2 className="box-heading">World Total Recovered Cases</h2>
            <h3 className="box-stats green">
              {world_data.data.TotalRecovered}
            </h3>
            {world_data.data.NewRecovered > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewRecovered}
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {world_data.data.NewRecovered}
              </h3>
            )}
          </div>
        ) : (
          <div className="box-grey">
            <Loader />
          </div>
        )}
      </div>
    );
  };

  _displayActiveCases = (world_data) => {
    return (
      <div>
        {world_data.data && !world_data.show_loader && (
          <h2 className="page-heading">
            World Total Active Cases : &nbsp;
            <span className="active-cases">
              {world_data.data.TotalConfirmed -
                (world_data.data.TotalDeaths - world_data.data.TotalRecovered)}
            </span>
          </h2>
        )}
      </div>
    );
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState(
      {
        searchSelected: value,
        searchLoader: false,
      },
      this.props.searchCountry(value)
    );
  };

  _displayTop10 = (world_data) => {
    const { searchSelected } = this.state;
    if (world_data && !world_data.show_loader && searchSelected.length == 0) {
      return (
        <div style={{ margin: "50px 0" }}>
          <h2 style={{ textAlign: "center", margin: "30px 0" }}>
            Top 10 Countries affected by Pandemic Covid-19
          </h2>
          <div className="flex-row-sa">
            {world_data.top10 && world_data.top10.length > 0 && (
              <React.Fragment>
                {world_data.top10.map((data, i) => {
                  return (
                    <div className="box-grey" key={i}>
                      <h2 className="box-heading">
                        {data.Country}-{data.CountryCode}
                      </h2>
                      <h3 className="box-stats fs-14">
                        Confirmed Cases :{" "}
                        <span className="red fs-16">{data.TotalConfirmed}</span>{" "}
                        {data.NewConfirmed > 0 ? (
                          <span className="green fs-10">
                            <i
                              className="fa fa-arrow-up"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewConfirmed}
                          </span>
                        ) : (
                          <span className="red fs-10">
                            <i
                              className="fa fa-arrow-down"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewConfirmed}
                          </span>
                        )}
                      </h3>
                      <h3 className="box-stats fs-14">
                        Deaths Reported :{" "}
                        <span className="grey fs-16">{data.TotalDeaths}</span>{" "}
                        {data.NewConfirmed > 0 ? (
                          <span className="green fs-10">
                            <i
                              className="fa fa-arrow-up"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewDeaths}
                          </span>
                        ) : (
                          <span className="red fs-10">
                            <i
                              className="fa fa-arrow-down"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewDeaths}
                          </span>
                        )}
                      </h3>
                      <h3 className="box-stats fs-14">
                        Recovered Cases :{" "}
                        <span className="green fs-16">
                          {data.TotalRecovered}
                        </span>{" "}
                        {data.NewConfirmed > 0 ? (
                          <span className="green fs-10">
                            <i
                              className="fa fa-arrow-up"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewRecovered}
                          </span>
                        ) : (
                          <span className="red fs-10">
                            <i
                              className="fa fa-arrow-down"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewRecovered}
                          </span>
                        )}
                      </h3>
                      <h3 className="box-stats fs-14">
                        Active Cases :{" "}
                        <span className="blue fs-16">
                          {data.TotalConfirmed -
                            (data.TotalDeaths + data.TotalRecovered)}
                        </span>{" "}
                        {data.NewConfirmed -
                          (data.NewDeaths + data.NewRecovered) >
                        0 ? (
                          <span className="green fs-10">
                            <i
                              className="fa fa-arrow-up"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {data.NewConfirmed -
                              (data.NewDeaths + data.NewRecovered)}
                          </span>
                        ) : (
                          <span className="red fs-10">
                            <i
                              className="fa fa-arrow-down"
                              aria-hidden="true"
                            ></i>
                            &nbsp;
                            {(data.NewConfirmed -
                              (data.NewDeaths + data.NewRecovered)) *
                              -1}
                          </span>
                        )}
                      </h3>
                    </div>
                  );
                })}
              </React.Fragment>
            )}
          </div>
        </div>
      );
    } else if (searchSelected.length == 0 && world_data.show_loader) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  };

  //   onBlur = () => {
  //     console.log("blur");
  //   };

  //   onFocus = () => {
  //     console.log("focus");
  //   };

  //   onSearch = (val) => {
  //     // console.log("search:", val);
  //     this.setState({
  //       searchSelected: val,
  //     });
  //   };

  _renderSearchCountry = (world_data) => {
    if (world_data && !world_data.show_search_loader && world_data.countries) {
      return (
        <React.Fragment>
          <h2 className="select-label">Search Country : </h2>&nbsp;&nbsp;
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a country"
            optionFilterProp="children"
            onChange={this.onChange}
            //   onFocus={this.onFocus}
            //   onBlur={this.onBlur}
            //   onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* {" "}
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option> */}
            {world_data &&
              world_data.countries &&
              world_data.countries.map((country, i) => (
                <Option value={country.CountryCode} key={i}>
                  {country.Country}
                </Option>
              ))}
          </Select>
        </React.Fragment>
      );
    }
  };

  _displaySearchedCountry = (world_data) => {
    const { searchSelected } = this.state;
    if (
      world_data &&
      !world_data.show_search_loader &&
      searchSelected.length > 0
    ) {
      return (
        <div className="flex-row-sa">
          {world_data.searchedCountry && world_data.searchedCountry.length > 0 && (
            <React.Fragment>
              {world_data.searchedCountry.map((data, i) => {
                return (
                  <div className="box-grey" key={i}>
                    <h2 className="box-heading">
                      {data.Country}-{data.CountryCode}
                    </h2>
                    <h3 className="box-stats fs-14">
                      Confirmed Cases :{" "}
                      <span className="red fs-16">{data.TotalConfirmed}</span>{" "}
                      {data.NewConfirmed > 0 ? (
                        <span className="green fs-10">
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                          &nbsp;
                          {data.NewConfirmed}
                        </span>
                      ) : (
                        <span className="red fs-10">
                          <i
                            className="fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          {data.NewConfirmed}
                        </span>
                      )}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Deaths Reported :{" "}
                      <span className="grey fs-16">{data.TotalDeaths}</span>{" "}
                      {data.NewConfirmed > 0 ? (
                        <span className="green fs-10">
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                          &nbsp;
                          {data.NewDeaths}
                        </span>
                      ) : (
                        <span className="red fs-10">
                          <i
                            className="fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          {data.NewDeaths}
                        </span>
                      )}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Recovered Cases :{" "}
                      <span className="green fs-16">{data.TotalRecovered}</span>{" "}
                      {data.NewConfirmed > 0 ? (
                        <span className="green fs-10">
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                          &nbsp;
                          {data.NewRecovered}
                        </span>
                      ) : (
                        <span className="red fs-10">
                          <i
                            className="fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          {data.NewRecovered}
                        </span>
                      )}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Active Cases :{" "}
                      <span className="blue fs-16">
                        {data.TotalConfirmed -
                          (data.TotalDeaths + data.TotalRecovered)}
                      </span>{" "}
                      {data.NewConfirmed -
                        (data.NewDeaths + data.NewRecovered) >
                      0 ? (
                        <span className="green fs-10">
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                          &nbsp;
                          {data.NewConfirmed -
                            (data.NewDeaths + data.NewRecovered)}
                        </span>
                      ) : (
                        <span className="red fs-10">
                          <i
                            className="fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          {(data.NewConfirmed -
                            (data.NewDeaths + data.NewRecovered)) *
                            -1}
                        </span>
                      )}
                    </h3>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      );
    } else if (searchSelected.length > 0 && world_data.show_search_loader) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  };
  render() {
    const { world_data, date } = this.props;
    return (
      <div>
        <div className="ta-right date">
          {date
            ? "Last Updated : " +
              moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
            : "fetching..."}
        </div>
        {this._displayWorldData(world_data)}
        {this._displayActiveCases(world_data)}
        <div className="flex-center" style={{ margin: "50px 0" }}>
          {this._renderSearchCountry(world_data)}
        </div>
        <div>{this._displayTop10(world_data)}</div>
        <div>{this._displaySearchedCountry(world_data)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  world_data: state.covid.world,
  date: state.covid.date_world,
});

export default connect(mapStateToProps, { fetchWorldData, searchCountry })(
  WorldTracker
);
