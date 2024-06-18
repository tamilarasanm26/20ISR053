import React, { useEffect, useState } from 'react';
import './App.css';
const sampleProducts =[
  {
      "productName": "Phone 10",
      "price": 561,
      "rating": 4.96,
      "discount": 32,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 13",
      "price": 4794,
      "rating": 4.46,
      "discount": 34,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 1",
      "price": 9013,
      "rating": 4.31,
      "discount": 72,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 4",
      "price": 5906,
      "rating": 4.28,
      "discount": 79,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 14",
      "price": 8598,
      "rating": 4.04,
      "discount": 40,
      "availability": "yes"
  },
  {
      "productName": "Phone 7",
      "price": 1951,
      "rating": 3.92,
      "discount": 14,
      "availability": "yes"
  },
  {
      "productName": "Phone 4",
      "price": 2139,
      "rating": 3.7,
      "discount": 64,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 11",
      "price": 6562,
      "rating": 3.26,
      "discount": 26,
      "availability": "yes"
  },
  {
      "productName": "Phone 7",
      "price": 4065,
      "rating": 3.17,
      "discount": 3,
      "availability": "yes"
  },
  {
      "productName": "Phone 12",
      "price": 3812,
      "rating": 2.65,
      "discount": 9,
      "availability": "yes"
  },
  {
      "productName": "Phone 4",
      "price": 7009,
      "rating": 2.63,
      "discount": 98,
      "availability": "yes"
  },
  {
      "productName": "Phone 12",
      "price": 5495,
      "rating": 2.29,
      "discount": 38,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 7",
      "price": 1184,
      "rating": 2.22,
      "discount": 62,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 11",
      "price": 9217,
      "rating": 1.01,
      "discount": 54,
      "availability": "yes"
  },
  {
      "productName": "Phone 1",
      "price": 4931,
      "rating": 0.27,
      "discount": 67,
      "availability": "yes"
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // 'rating', 'price', 'company', 'discount'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to simulate fetching top products
  const fetchProducts = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulating 1 second delay
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle sorting change
  const handleSortChange = (event) => {
    const value = event.target.value;
    const [sortByField, sortOrderField] = value.split('_');
    setSortBy(sortByField);
    setSortOrder(sortOrderField);
  };

  // Function to sort products based on sortBy and sortOrder
  const sortProducts = (products) => {
    if (sortBy && sortOrder) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
      return sortedProducts;
    }
    return products;
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Implement pagination logic here if needed
  };

  return (
    <div className="App">
      <h1>Top 10 Laptops</h1>
      <div className="controls">
        <label>
          Sort By:
          <select value={sortBy ? `${sortBy}_${sortOrder}` : ''} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="rating_asc">Rating (Low to High)</option>
            <option value="rating_desc">Rating (High to Low)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="discount_asc">Discount (Low to High)</option>
            <option value="discount_desc">Discount (High to Low)</option>
          </select>
        </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {sortProducts(products).map((product, index) => (
            <div key={index} className="product-item">
              <h2>{product.productName}</h2>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
