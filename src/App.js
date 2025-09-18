import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SearchPage from "./component/SearchPage";
import NavBar from "./component/NavBar";
import "./component/Dashboard.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // shared items state between pages
    };
  }

  setItems = (newItems) => {
    this.setState({ items: newItems });
  };

  render() {
    return (
      <Fragment>
        <NavBar/>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard items={this.state.items} setItems={this.setItems} />
            }
          />
          <Route
            path="/search"
            element={<SearchPage items={this.state.items} />}
          />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
