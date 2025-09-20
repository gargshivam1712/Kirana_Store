import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {
        _id: null,
        itemName: "",
        itemPrice: "",
        marketPrice: "",
        discountPrice: "",
        itemWeightType: "1 kg",
      },
      editMode: false,
      search: "",
    };
  }

  handleInputChange = (field, value) => {
    this.setState((prevState) => ({
      newItem: { ...prevState.newItem, [field]: value },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { newItem, editMode } = this.state;
    const { items, setItems } = this.props;

    const _id = newItem._id
    const itemName = newItem.itemName
    const itemPrice = newItem.itemPrice
    const marketPrice = newItem.marketPrice
    const discountPrice = newItem.discountPrice
    const itemWeightType = newItem.itemWeightType
    
    if (editMode) {
      try {
        

        await axios.put(`https://dharaubaba-server.netlify.app/.netlify/functions/app/api/items/${_id}`, {
          itemName,
          itemPrice,
          marketPrice,
          discountPrice,
          itemWeightType,
        });
        const updatedItems = items.map((item) =>
        item._id === newItem._id ? newItem : item
        );
        setItems(updatedItems);
      } catch (err) {
        console.error("Error adding item", err);
      }
      
    } else {
      try {
        const res = await axios.post("https://dharaubaba-server.netlify.app/.netlify/functions/app/api/items", {
          itemName,
          itemPrice,
          marketPrice,
          discountPrice,
          itemWeightType,
        });
        setItems([...items, res.data]);
      } catch (err) {
        console.error("Error adding item", err);
      }
    }

    this.setState({
      newItem: {
        _id: null,
        itemName: "",
        itemPrice: "",
        marketPrice: "",
        discountPrice: "",
        itemWeightType: "1 kg",
      },
      editMode: false,
    });
  };

  handleEdit = (item) => {
    this.setState({ newItem: item, editMode: true });
  };

  handleDelete = async (_id) => {
    try {
      await axios.delete(`https://dharaubaba-server.netlify.app/.netlify/functions/app/api/items/${_id}`);
      const { items, setItems } = this.props;
      setItems(items.filter((item) => item._id !== _id));
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { items } = this.props;
    const { newItem, search, editMode } = this.state;

    const filteredItems = items.filter((item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="dashboard">
        <h1>Kirana Store Dashboard</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={this.handleSearchChange}
          className="search-bar"
        />

        {/* Form */}
        <div className="form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={(e) => this.handleInputChange("itemName", e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.itemPrice}
            onChange={(e) => this.handleInputChange("itemPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Market Price"
            value={newItem.marketPrice}
            onChange={(e) =>
              this.handleInputChange("marketPrice", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Discount Price"
            value={newItem.discountPrice}
            onChange={(e) =>
              this.handleInputChange("discountPrice", e.target.value)
            }
          />
          <select
            value={newItem.itemWeightType}
            onChange={(e) =>
              this.handleInputChange("itemWeightType", e.target.value)
            }
          >
            <option value="1 kg">1 kg</option>
            <option value="5 kg">5 kg</option>
            <option value="gram">gram</option>
            <option value="1 litre">1 litre</option>
            <option value="5 litre">5 litre</option>
            <option value="ml">ml</option>
            <option value="piece">piece</option>
          </select>
          <button onClick={this.handleSubmit} className="btn">
            {editMode ? "Update" : "Add"}
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
            <table className="items-table">
            <thead>
                <tr>
                <th>Item Name</th>
                <th>Price (₹)</th>
                <th>Market Price (₹)</th>
                <th>Discount Price (₹)</th>
                <th>Weight Type</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.marketPrice}</td>
                    <td>{item.discountPrice}</td>
                    <td>{item.itemWeightType}</td>
                    <td>
                        <button
                        className="btn edit"
                        onClick={() => this.handleEdit(item)}
                        >
                        Edit
                        </button>
                        <button
                        className="btn delete"
                        onClick={() => this.handleDelete(item._id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="6" className="no-items">
                    No items found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
