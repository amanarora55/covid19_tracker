import React, { Component } from "react";

import moment from "moment";
import { connect } from "react-redux";

import Loader from "../Essentials/Loader";
import LineChart from "../Essentials/LineChart";
import Collapsable from "../Essentials/Collapsable";

import {
  fetchIndiaData,
  searchState,
  fetchDistrictWiseData,
} from "../Actions/indiaActions";

import { Select } from "antd";

const { Option } = Select;

class IndiaTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSelected: "",
      searchLoader: false,
    };
  }
  componentDidMount() {
    this.props.fetchIndiaData();
    this.props.fetchDistrictWiseData();
  }

  _displayIndiaData = (india_data) => {
    return (
      <div className="flex-row-sa">
        {india_data && india_data.data && !india_data.show_loader ? (
          <div className="box-red">
            <div className="overlay"></div>
            <div className="box-heading">India Total Confirmed Cases</div>
            <h3 className="box-stats red">{india_data.data[0].confirmed}</h3>
            {india_data.data_date_wise.data[
              india_data.data_date_wise.data.length - 1
            ].dailyconfirmed > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailyconfirmed
                }
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailyconfirmed
                }
              </h3>
            )}
          </div>
        ) : (
          <div className="box-grey">
            <Loader />
          </div>
        )}
        {india_data && !india_data.show_loader ? (
          <div className="box-grey">
            <div className="overlay"></div>
            <h2 className="box-heading">India Total Death Cases</h2>
            <h3 className="box-stats grey">{india_data.data[0].deaths}</h3>
            {india_data.data_date_wise.data[
              india_data.data_date_wise.data.length - 1
            ].dailydeceased > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailydeceased
                }
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailydeceased
                }
              </h3>
            )}
          </div>
        ) : (
          <div className="box-grey">
            <Loader />
          </div>
        )}
        {india_data && !india_data.show_loader ? (
          <div className="box-green">
            <div className="overlay"></div>{" "}
            <h2 className="box-heading">India Total Recovered Cases</h2>
            <h3 className="box-stats green">{india_data.data[0].recovered}</h3>
            {india_data.data_date_wise.data[
              india_data.data_date_wise.data.length - 1
            ].dailyrecovered > 0 ? (
              <h3 className="box-stats-up">
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailyrecovered
                }
              </h3>
            ) : (
              <h3 className="box-stats-down">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].dailyrecovered
                }
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

  _displayIndiaActiveCases = (india_data) => {
    return (
      <div>
        {india_data.data && !india_data.show_loader && (
          <h2 className="page-heading">
            India Total Active Cases : &nbsp;
            <span className="active-cases">{india_data.data[0].active}</span>
          </h2>
        )}
      </div>
    );
  };

  _displayTop10States = (india_data) => {
    const { searchSelected } = this.state;
    if (india_data && !india_data.show_loader && searchSelected.length == 0) {
      return (
        <div style={{ margin: "50px 0" }}>
          <h2 style={{ textAlign: "center", margin: "30px 0" }}>
            Top 10 States affected the most by Pandemic Covid-19 across India
          </h2>
          <div className="flex-row-sa">
            {india_data.data && india_data.data.length > 0 && (
              <React.Fragment>
                {india_data.data.map((data, i) => {
                  if (i > 0 && i <= 10) {
                    return (
                      <div className="box-grey" key={i}>
                        <h2 className="box-heading">
                          {data.state}-{data.statecode}
                        </h2>
                        <h3 className="box-stats fs-14">
                          Confirmed Cases :{" "}
                          <span className="red fs-16">{data.confirmed}</span>{" "}
                          {/* {data.NewConfirmed > 0 ? (
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
                          )} */}
                        </h3>
                        <h3 className="box-stats fs-14">
                          Deaths Reported :{" "}
                          <span className="grey fs-16">{data.deaths}</span>{" "}
                          {/* {data.NewConfirmed > 0 ? (
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
                          )} */}
                        </h3>
                        <h3 className="box-stats fs-14">
                          Recovered Cases :{" "}
                          <span className="green fs-16">{data.recovered}</span>{" "}
                          {/* {data.NewConfirmed > 0 ? (
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
                          )} */}
                        </h3>
                        <h3 className="box-stats fs-14">
                          Active Cases :{" "}
                          <span className="blue fs-16">{data.active}</span>{" "}
                          {/* {data.NewConfirmed -
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
                          )} */}
                        </h3>
                      </div>
                    );
                  }
                })}
              </React.Fragment>
            )}
          </div>
        </div>
      );
    }
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState(
      {
        searchSelected: value,
        searchLoader: false,
      },
      this.props.searchState(value)
    );
  };

  _renderSearchState = (india_data) => {
    if (india_data && !india_data.show_search_loader) {
      return (
        <div className="flex-center" style={{ margin: "50px 0" }}>
          <h2 className="select-label">Search State : </h2>&nbsp;&nbsp;
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a state"
            optionFilterProp="children"
            onChange={this.onChange}
            //   onFocus={this.onFocus}
            //   onBlur={this.onBlur}
            //   onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {india_data &&
              india_data.data &&
              india_data.data.map((state, i) => {
                if (i > 0) {
                  return (
                    <Option value={state.statecode} key={i}>
                      {state.state}
                    </Option>
                  );
                }
              })}
          </Select>
        </div>
      );
    }
  };

  _displaySearchedState = (india_data) => {
    const { searchSelected } = this.state;
    if (
      india_data &&
      !india_data.show_search_loader &&
      searchSelected.length > 0
    ) {
      //   debugger;
      return (
        <div className="flex-row-sa">
          {india_data.searchedState && india_data.searchedState.length > 0 && (
            <React.Fragment>
              {india_data.searchedState.map((data, i) => {
                return (
                  <div className="box-grey" key={i}>
                    <h2 className="box-heading">
                      {data.state}-{data.statecode}
                    </h2>
                    <h3 className="box-stats fs-14">
                      Confirmed Cases :{" "}
                      <span className="red fs-16">{data.confirmed}</span>{" "}
                      {/* {data.NewConfirmed > 0 ? (
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
                      )} */}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Deaths Reported :{" "}
                      <span className="grey fs-16">{data.deaths}</span>{" "}
                      {/* {data.NewConfirmed > 0 ? (
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
                      )} */}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Recovered Cases :{" "}
                      <span className="green fs-16">{data.recovered}</span>{" "}
                      {/* {data.NewConfirmed > 0 ? (
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
                      )} */}
                    </h3>
                    <h3 className="box-stats fs-14">
                      Active Cases :{" "}
                      <span className="blue fs-16">{data.active}</span>{" "}
                      {/* {data.NewConfirmed -
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
                      )} */}
                    </h3>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      );
    } else if (searchSelected.length > 0 && india_data.show_search_loader) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  };

  _displayDataSummary = (india_data) => {
    if (
      india_data &&
      india_data.data_date_wise &&
      india_data.data_date_wise.data &&
      !india_data.show_loader
    ) {
      return (
        <div>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "0",
            }}
          >
            Datewise Report for Pandemic Covid-19 Confirmed, Deceased, Recovered
            and Active Cases in India
          </h2>
          <LineChart
            data={[
              india_data.data_date_wise.confirmed,
              india_data.data_date_wise.deaths,
              india_data.data_date_wise.recovered,
            ]}
            labels={india_data.data_date_wise.date}
            legends={["Confirmed", "Deceased", "Recovered"]}
            colors={["crimson", "grey", "green"]}
            title={"Pandemic Covid-19 Cases Report in India"}
            height="400"
          />
          <div style={{ textAlign: "center", margin: "15px 0" }}>
            <h4>
              Last Updated :{" "}
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].date + "2020"}{" "}
              {"  "}
              &nbsp; Confirmed Cases :{" "}
              <span className="red">
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totalconfirmed
                }
              </span>
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].dailyconfirmed > 0 ? (
                <span className="green">
                  &nbsp;
                  <i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyconfirmed
                  }
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyconfirmed
                  }
                </span>
              )}
              &nbsp; Deceased Cases :{" "}
              <span className="grey">
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totaldeceased
                }
              </span>
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].dailydeceased > 0 ? (
                <span className="green">
                  &nbsp;
                  <i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailydeceased
                  }
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailydeceased
                  }
                </span>
              )}
              &nbsp; Recovered Cases :{" "}
              <span className="green">
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totalrecovered
                }
              </span>
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].dailyrecovered > 0 ? (
                <span className="green">
                  &nbsp;
                  <i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyrecovered
                  }
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyrecovered
                  }
                </span>
              )}
              &nbsp; Active Cases :{" "}
              <span className="blue">
                {parseInt(
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totalconfirmed
                ) -
                  (parseInt(
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].totaldeceased
                  ) +
                    parseInt(
                      india_data.data_date_wise.data[
                        india_data.data_date_wise.data.length - 1
                      ].totalrecovered
                    ))}
              </span>
            </h4>
          </div>
          <LineChart
            data={[india_data.data_date_wise.active]}
            labels={india_data.data_date_wise.date}
            legends={["Active Covid-19 Cases Reported"]}
            colors={["#007bff"]}
            height="400"
          />
        </div>
      );
    }
  };

  _displayTestingDataSummary = (india_data) => {
    if (
      india_data &&
      india_data.testing_data &&
      india_data.testing_data.data &&
      !india_data.show_loader
    ) {
      return (
        <div>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "0",
            }}
          >
            Testing Report for Pandemic Covid-19 Samples Tested and Confirmed
            Positive Daily
          </h2>
          <div className="flex-row-sa">
            <div className="w-50">
              <LineChart
                data={[india_data.testing_data.samplesTested]}
                labels={india_data.testing_data.dates}
                legends={["Samples Tested Daily"]}
                colors={["grey"]}
                // title={"Pandemic Covid-19 Cases Report in India"}
                height="400"
              />
            </div>
            <div className="w-50">
              <LineChart
                data={[india_data.testing_data.samplesPositive]}
                labels={india_data.testing_data.dates}
                legends={["Samples Tested Positive Daily"]}
                colors={["crimson"]}
                // title={"Pandemic Covid-19 Cases Report in India"}
                height="400"
              />
            </div>
          </div>
          <div>
            <h4 style={{ textAlign: "center", margin: "15px 0" }}>
              Last Updated :{" "}
              {
                india_data.testing_data.data[
                  india_data.testing_data.data.length - 1
                ].updatetimestamp
              }{" "}
              {"  "}
              &nbsp; Total Samples Tested :{" "}
              <span className="grey">
                {parseInt(
                  india_data.testing_data.data[
                    india_data.testing_data.data.length - 1
                  ].totalsamplestested
                )}
              </span>
              {parseInt(
                india_data.testing_data.data[
                  india_data.testing_data.data.length - 1
                ].totalsamplestested.replace(",", "")
              ) -
                parseInt(
                  india_data.testing_data.data[
                    india_data.testing_data.data.length - 2
                  ].totalsamplestested.replace(",", "")
                ) >
              0 ? (
                <span className="green">
                  &nbsp;
                  <i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {parseInt(
                    india_data.testing_data.data[
                      india_data.testing_data.data.length - 1
                    ].totalsamplestested
                  ) -
                    parseInt(
                      india_data.testing_data.data[
                        india_data.testing_data.data.length - 2
                      ].totalsamplestested
                    )}
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {parseInt(
                    india_data.testing_data.data[
                      india_data.testing_data.data.length - 1
                    ].totalsamplestested.replace(",", "")
                  ) -
                    parseInt(
                      india_data.testing_data.data[
                        india_data.testing_data.data.length - 2
                      ].totalsamplestested.replace(",", "")
                    )}
                </span>
              )}
              &nbsp;&nbsp; Total Samples Tested Positive :{" "}
              <span className="red">
                {parseInt(
                  india_data.testing_data.data[
                    india_data.testing_data.data.length - 1
                  ].totalpositivecases.replace(",", "")
                )}
              </span>
              {parseInt(
                india_data.testing_data.data[
                  india_data.testing_data.data.length - 1
                ].totalpositivecases.replace(",", "")
              ) -
                parseInt(
                  india_data.testing_data.data[
                    india_data.testing_data.data.length - 2
                  ].totalpositivecases.replace(",", "")
                ) >
              0 ? (
                <span className="green">
                  &nbsp;
                  <i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {parseInt(
                    india_data.testing_data.data[
                      india_data.testing_data.data.length - 1
                    ].totalpositivecases.replace(",", "")
                  ) -
                    parseInt(
                      india_data.testing_data.data[
                        india_data.testing_data.data.length - 2
                      ].totalpositivecases.replace(",", "")
                    )}
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {parseInt(
                    india_data.testing_data.data[
                      india_data.testing_data.data.length - 1
                    ].totalpositivecases.replace(",", "")
                  ) -
                    parseInt(
                      india_data.testing_data.data[
                        india_data.testing_data.data.length - 2
                      ].totalpositivecases.replace(",", "")
                    )}
                </span>
              )}
              {/* &nbsp; Deceased Cases :{" "}
              <span className="grey">
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totaldeceased
                }
              </span>
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].dailydeceased > 0 ? (
                <span className="green">
                  &nbsp;<i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailydeceased
                  }
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailydeceased
                  }
                </span>
              )}
              &nbsp; Recovered Cases :{" "}
              <span className="green">
                {
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totalrecovered
                }
              </span>
              {india_data.data_date_wise.data[
                india_data.data_date_wise.data.length - 1
              ].dailyrecovered > 0 ? (
                <span className="green">
                  &nbsp;<i className="fa fa-arrow-up fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyrecovered
                  }
                </span>
              ) : (
                <span className="red">
                  &nbsp;
                  <i className="fa fa-arrow-down fs-10" aria-hidden="true"></i>
                  {
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].dailyrecovered
                  }
                </span>
              )}
              &nbsp; Active Cases :{" "}
              <span className="blue">
                {parseInt(
                  india_data.data_date_wise.data[
                    india_data.data_date_wise.data.length - 1
                  ].totalconfirmed
                ) -
                  (parseInt(
                    india_data.data_date_wise.data[
                      india_data.data_date_wise.data.length - 1
                    ].totaldeceased
                  ) +
                    parseInt(
                      india_data.data_date_wise.data[
                        india_data.data_date_wise.data.length - 1
                      ].totalrecovered
                    ))}
              </span> */}
            </h4>
          </div>
        </div>
      );
    }
  };

  _displayDistrictWise = (india_data) => {
    if (
      india_data &&
      india_data.district_wise &&
      //   Object.keys[india_data.district_wise].length > 0 &&
      !india_data.show_loader
    ) {
      return (
        <React.Fragment>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "0",
            }}
          >
            Confirmed Covid-19 Cases Count in Ditricts for States in India
          </h2>
          <Collapsable data={india_data.district_wise} />
        </React.Fragment>
      );
    }
  };
  render() {
    const { india_data, date } = this.props;
    return (
      <div>
        <div className="ta-right date">
          {date
            ? "Last Updated : " +
              moment(date).utc().format("dddd, MMMM Do YYYY, h:mm:ss a")
            : //   this._displayDate(date)
              "fetching..."}
        </div>
        {this._displayIndiaData(india_data)}
        {this._displayIndiaActiveCases(india_data)}
        {this._renderSearchState(india_data)}
        {this._displayTop10States(india_data)}
        {this._displaySearchedState(india_data)}
        {this._displayDataSummary(india_data)}
        {this._displayTestingDataSummary(india_data)}
        {this._displayDistrictWise(india_data)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  india_data: state.covid.india,
  date: state.covid.date_india,
});

export default connect(mapStateToProps, {
  fetchIndiaData,
  searchState,
  fetchDistrictWiseData,
})(IndiaTracker);
