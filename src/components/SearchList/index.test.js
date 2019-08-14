import React from "react";
// import { SearchList } from "./";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { search as searchReducer } from "../../state/search/reducer";


const renderWithRedux = (
  ui,
  { initialState: initialStates, store = createStore(searchReducer, initialStates) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
};

// FIXME: Figure out how react-testing-library works
test("SearchList", () => {
//   const { getByTestId, getByText, unmount, container } = renderWithRedux(
//     <SearchList />
//   );
});
