import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    title: "",
    description: "",
    author: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/book/${id}`
        );

        setProduct(response.data);
      
        const responseImage = await axios.get(
          `http://localhost:8080/api/book/${id}/image`,
          { responseType: "blob" }
        );
       const imageFile = await converUrlToFile(responseImage.data,response.data.imageName)
        setImage(imageFile);     
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);



  const converUrlToFile = async(blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  }
 
 const handleSubmit = async (e) => {
   e.preventDefault();

   const updatedProduct = new FormData();

   // Append image file to form data (ensure the 'imgFile' key matches the controller's expectation)
   if (image) {
     updatedProduct.append("imgFile", image);
   } else {
     alert("Please upload an image.");
     return;
   }

   // Append product details in JSON format
   updatedProduct.append(
     "book",
     new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
   );

   // Submit the form data
   axios
     .put(`http://localhost:8080/api/book/${id}`, updatedProduct, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     })
     .then((response) => {
       alert("Product updated successfully!");
       
     })
     .catch((error) => {
       console.error("Error updating product:", error);
       alert("Failed to update product. Please try again.");
     });
 };

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "3rem" }}>
        <h1>Update Product</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Title</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.title}
              value={updateProduct.title}
              onChange={handleChange}
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
              placeholder={"Enter Author name"}
              value={updateProduct.author}
              onChange={handleChange}
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
              placeholder={product.description}
              name="description"
              onChange={handleChange}
              value={updateProduct.description}
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
              onChange={handleChange}
              value={updateProduct.price}
              placeholder={product.price}
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
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="History">History</option>
              <option value="Politic">Politic</option>
              <option value="Mindset">Mindset</option>
              <option value="Novel">Novel</option>
              <option value="Comic">Comic</option>
              <option value="Fiction">Fiction</option>
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
              onChange={handleChange}
              placeholder={product.stockQuantity}
              value={updateProduct.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : "Image unavailable"}
              alt={product.imageName}
              style={{
                width: "70%",
                height: "130px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              placeholder="Upload image"
              name="imageUrl"
              id="imageUrl"
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={updateProduct.productAvailable}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    productAvailable: e.target.checked,
                  })
                }
              />
              <label className="form-check-label">Book Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;