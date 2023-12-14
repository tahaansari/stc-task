import bg from "./assets/images/react-task.png";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery/dist/jquery.min.js";
import Popper from "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/global.scss";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Filter from "./components/filter";
import ProductList from "./components/productList";
import Info from "./components/info";
import Footer from "./components/footer";

export default function App() {
  const url = "https://mocki.io/v1/ae832675-0711-48a0-8665-a186cd0e8489";
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const fetchData = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.devices);
        setFilterData(res.devices);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryChange = (category) => {
    if (category != "Show All") {
      setFilterData(data.filter((item) => item.category === category));
    } else {
      setFilterData(data);
    }
  };

  const sortChange = (sortBy) => {
    if (sortBy == "A-Z") {
      const sorted = [...filterData].sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
      );
      setFilterData(sorted);
    } else {
      const sorted = [...filterData]
        .sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
        )
        .reverse();
      setFilterData(sorted);
    }
  };

  return (
    <div className="App">
      {/* <img className="bg img-fluid" src={bg} alt="" /> */}
      <Header></Header>
      <Filter categoryChange={categoryChange} sortChange={sortChange}></Filter>
      <ProductList filterData={filterData}></ProductList>
      <Info></Info>
      <Footer></Footer>
    </div>
  );
}
