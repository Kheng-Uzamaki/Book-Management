import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    // setProduct({...product, image: e.target.files[0]})
  };

const submitHandler = (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("imgFile", image); // Image part
  formData.append(
    "book", // Change the key to "book"
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  axios
    .post("http://localhost:8080/api/book", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Book added successfully:", response.data);
      alert("Book added successfully");
      // Reset product and image to initial values after successful submission
      setProduct({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
      });
      setImage(null);
      // Clear the file input
      document.getElementById("imageInput").value = "";
    })
    .catch((error) => {
      console.error("Error adding Book:", error);
      alert("Error adding book");
    });
    
};


  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Title</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Book Title"
              onChange={handleInputChange}
              value={product.title}
              name="title"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Author</h6>
            </label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Enter Author name"
              value={product.author}
              onChange={handleInputChange}
              id="author"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add book description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              id="description"
            />
          </div>
          {/* <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              id="price"
            />
          </div> */}

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="History">History</option>
              <option value="Politic">Politic</option>
              <option value="Mindset">Mindset</option>
              <option value="Fiction">Fiction</option>
              <option value="Comic">Comic</option>
              <option value="Novel">Novel</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              // value={`${stockAlert}/${stockQuantity}`}
              id="stockQuantity"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              id="releaseDate"
            />
          </div>
          {/* <input className='image-control' type="file" name='file' onChange={(e) => setProduct({...product, image: e.target.files[0]})} />
    <button className="btn btn-primary" >Add Photo</button>  */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              id="imageInput"
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Book Available</label>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
