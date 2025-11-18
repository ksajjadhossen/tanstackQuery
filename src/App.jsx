import "./App.css";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="flex m-2">
      <AddProduct></AddProduct>
      <ProductList></ProductList>
      <ProductDetails id={3}></ProductDetails>
    </div>
  );
}

export default App;
