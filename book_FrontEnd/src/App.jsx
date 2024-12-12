import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";


function App() {
 
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };


  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Home
                  selectedCategory={selectedCategory}
                />
                <Footer/>
              </>
            }
          />
          <Route path="/add_book" element={<AddProduct />} />
          <Route path="/book" element={<Product />} />
          <Route path="book/:id" element={<Product />} />
          <Route path="/book/update/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
