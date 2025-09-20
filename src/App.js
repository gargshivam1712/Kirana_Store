import React, { Fragment } from "react";
import {Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SearchPage from "./component/SearchPage";
import NavBar from "./component/NavBar";
import "./component/Dashboard.css";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // shared items state between pages
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    try {
      const res = await axios.get("https://dharaubaba-server.netlify.app/.netlify/functions/app/api/items");
      this.setState({ items: res.data });
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

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
