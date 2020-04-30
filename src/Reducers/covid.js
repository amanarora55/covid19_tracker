const intialState = {
  world: {
    show_loader: true,
    searchedCountry: "",
    show_search_loader: false,
  },
  date_world: "",
  india: {
    show_loader: true,
    searchedState: "",
    show_search_loader: false,
  },
  date_india: "",
};

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "WORLD_DATA_LOADER":
      return {
        ...state,
        world: {
          ...state.world,
          show_loader: payload,
        },
      };

    case "SET_WORLD_DATA":
      return {
        ...state,
        world: {
          ...state.world,
          data: payload,
        },
      };

    case "SET_WORLD_COUNTRIES":
      return {
        ...state,
        world: {
          ...state.world,
          countries: payload,
        },
      };

    case "SET_WORLD_TOP_10":
      return {
        ...state,
        world: {
          ...state.world,
          top10: payload,
        },
      };

    case "SET_SEARCHED_COUNTRY":
      return {
        ...state,
        world: {
          ...state.world,
          searchedCountry: state.world.countries.filter(
            (data) => data.CountryCode == payload
          ),
        },
      };

    case "SEARCH_COUNTRY_LOADER":
      return {
        ...state,
        world: {
          ...state.world,
          show_search_loader: payload,
        },
      };

    case "SET_DATE":
      return {
        ...state,
        date_world: payload,
      };

    case "SET_INDIA_DATE":
      return {
        ...state,
        date_india: payload,
      };

    case "SET_INDIA_DATA":
      return {
        ...state,
        india: {
          ...state.india,
          data: payload,
        },
      };

    case "SET_INDIA_TESTING_DATA":
      return {
        ...state,
        india: {
          ...state.india,
          testing_data: payload,
        },
      };

    case "SET_INDIA_DATE_WISE_ANALYSIS":
      return {
        ...state,
        india: {
          ...state.india,
          data_date_wise: payload,
        },
      };

    case "INDIA_DATA_LOADER":
      return {
        ...state,
        india: {
          ...state.india,
          show_loader: payload,
        },
      };

    case "SET_SEARCHED_STATE":
      return {
        ...state,
        india: {
          ...state.india,
          searchedState: state.india.data.filter(
            (state) => state.statecode === payload
          ),
        },
      };

    case "SEARCH_STATE_LOADER":
      return {
        ...state,
        india: {
          ...state.india,
          show_search_loader: payload,
        },
      };

    case "SET_DATA_DISTRICT_WISE":
      return {
        ...state,
        india: {
          ...state.india,
          district_wise: payload,
        },
      };

    default:
      return state;
  }
}
