import React, { Component } from "react";
import "./Dashboard.css";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { items } = this.props;
    const { search } = this.state;

    const filteredItems = items.filter((item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="dashboard">
        <h1>Search Items</h1>

        <input
          type="text"
          placeholder="Search item by name..."
          value={search}
          onChange={this.handleSearchChange}
          className="search-bar"
        />

        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Market Price (₹)</th>
              <th>Discount Price (₹)</th>
              <th>Item Weight Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>{item.marketPrice}</td>
                  <td>{item.discountPrice}</td>
                  <td>{item.itemWeightType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-items">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchPage;
