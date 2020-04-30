import moment from "moment";

export const fetchIndiaData = () => (dispatch) => {
  dispatch({
    type: "INDIA_DATA_LOADER",
    payload: true,
  });

  fetch("https://api.covid19india.org/data.json", { method: "GET" })
    .then((res) => res.json())
    .then((res) => {
      let dt = res.statewise[0]["lastupdatedtime"].split(" ");
      dt[0] = dt[0].split("/").join("-").split("-").reverse().join("-");
      dt = dt.join(" ").split(" ").join("T") + "Z";
      dispatch({
        type: "SET_INDIA_DATE",
        payload: dt,
      });
      dispatch({
        type: "SET_INDIA_DATA",
        payload: res.statewise,
      });
      let date = [];
      let confirmed = [];
      let deceased = [];
      let recovered = [];
      let active = [];
      res.cases_time_series.map((data) => {
        date.push(data.date);
        confirmed.push(parseInt(data.dailyconfirmed));
        deceased.push(parseInt(data.dailydeceased));
        recovered.push(parseInt(data.dailyrecovered));
        active.push(
          parseInt(data.totalconfirmed) -
            (parseInt(data.totaldeceased) + parseInt(data.totalrecovered))
        );
        return;
      });
      dispatch({
        type: "SET_INDIA_DATE_WISE_ANALYSIS",
        payload: {
          data: res.cases_time_series,
          date: date,
          confirmed: confirmed,
          deaths: deceased,
          recovered: recovered,
          active: active,
        },
      });
      let testingDates = [];
      let samples = [];
      let samplePositive = [];

      let tested = res.tested
        .filter(
          (data) => data.updatetimestamp != "13/04/2020 21:00:00"
          //   {
          // if (
          //   data.updatetimestamp !== "13/04/2020 21:00:00" ||
          //   data.updatetimestamp !== "04/04/2020 21:00:00"
          // ) {
          //   return data;
          // }
          //   }
        )
        .filter((data) => data.updatetimestamp != "04/04/2020 21:00:00");

      let testingData = tested.map((data) => {
        let dt = data.updatetimestamp.split(" ");
        dt[0] = dt[0].split("/").join("-").split("-").reverse().join("-");
        dt = dt.join(" ").split(" ")[0];

        return {
          ...data,
          updatetimestamp: moment.utc(dt).local().format("Do MMMM YYYY"),
        };
      });

      tested.map((data) => {
        samples.push(
          data.samplereportedtoday.length > 0
            ? parseInt(data.samplereportedtoday)
            : 0
        );
        samplePositive.push(
          data.positivecasesfromsamplesreported.length > 0
            ? parseInt(data.positivecasesfromsamplesreported)
            : 0
        );
      });

      testingData.map((data) => {
        testingDates.push(data.updatetimestamp);
      });

      dispatch({
        type: "SET_INDIA_TESTING_DATA",
        payload: {
          data: testingData,
          dates: testingDates,
          samplesTested: samples,
          samplesPositive: samplePositive,
        },
      });
      dispatch({
        type: "INDIA_DATA_LOADER",
        payload: false,
      });
    });
};

export const searchState = (value) => (dispatch) => {
  dispatch({
    type: "SEARCH_STATE_LOADER",
    payload: true,
  });
  dispatch({
    type: "SET_SEARCHED_STATE",
    payload: value,
  });
  setTimeout(() => {
    dispatch({
      type: "SEARCH_STATE_LOADER",
      payload: false,
    });
  }, 1000);
};

export const fetchDistrictWiseData = () => (dispatch) => {
  //enabke loader
  dispatch({
    type: "INDIA_DATA_LOADER",
    payload: true,
  });
  fetch("https://api.covid19india.org/state_district_wise.json", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: "SET_DATA_DISTRICT_WISE",
        payload: Object.keys(res)
          .sort()
          .map((key) => {
            return { [key]: { ...res[key] } };
          }),
      });
      dispatch({
        type: "INDIA_DATA_LOADER",
        payload: false,
      });
    });
};
