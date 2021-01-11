import React, {useState, useEffect }from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart'
// import { Products, Navbar, Cart } from './components' 
import { commerce } from './lib/commerce';

//import { Products, Navbar } from './components'

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {

    const { data } = await commerce.products.list()
    
    setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart)
  }

  const handleAddtoCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  },  [])

  console.log(cart)
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddtoCart} />   */}
      <Cart cart={cart} />
    </div>
  )
}

export default App
