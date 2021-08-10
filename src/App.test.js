import React from "react"
import ReactDOM from "react-dom"
import LastFrontApp from "./App";

test('renders learn react link', () => {
  const div = document.createElement("div")
  ReactDOM.render(<LastFrontApp />, div);
  ReactDOM.unmountComponentAtNode(div)
});
