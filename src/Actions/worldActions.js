export const fetchWorldData = () => (dispatch) => {
  //enable loader
  dispatch({
    type: "WORLD_DATA_LOADER",
    payload: true,
  });

  fetch("https://api.covid19api.com/summary", { method: "GET" })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: "SET_DATE",
        payload: res.Date,
      });
      dispatch({
        type: "SET_WORLD_DATA",
        payload: res.Global,
      });
      dispatch({
        type: "SET_WORLD_COUNTRIES",
        payload: res.Countries,
      });
      dispatch({
        type: "WORLD_DATA_LOADER",
        payload: false,
      });
      let a = res.Countries.map((data) => ({ ...data }));
      for (var i = 0; i < a.length; i++) {
        for (var j = i + 1; j < a.length; j++) {
          if (a[i]["TotalConfirmed"] < a[j]["TotalConfirmed"]) {
            var temp = a[i];
            a[i] = a[j];
            a[j] = temp;
          }
        }
      }
      dispatch({
        type: "SET_WORLD_TOP_10",
        payload: a.slice(0, 10),
      });
    });
};

export const searchCountry = (value) => (dispatch) => {
  dispatch({
    type: "SEARCH_COUNTRY_LOADER",
    payload: true,
  });
  dispatch({
    type: "SET_SEARCHED_COUNTRY",
    payload: value,
  });
  setTimeout(() => {
    dispatch({
      type: "SEARCH_COUNTRY_LOADER",
      payload: false,
    });
  }, 1000);
};
