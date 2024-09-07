import { useState } from "react"
import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { dbGuitars } from "./data/db";

function App() {

  // Aquí se almacenarán los datos de las guitarras en un array
  const [data, setData] = useState(dbGuitars);
  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 10;
  const MIN_ITEMS = 1;

  console.log(cart)




  // agregar item al carrito 
  const addToCart = (items) => {
    const itemExiste = cart.findIndex(guitar => guitar.id === items.id);
    if (itemExiste >= 0) {
      const updateCart = [...cart];
      updateCart[itemExiste].quantity += 1;
      setCart(updateCart);
    } else {
      items.quantity = 1;
      setCart([...cart, items]);
    }
  }


  // eliminar item del carrito 
  const removeFromCart = (id) => {
    setCart(cart.filter(guitar => guitar.id !== id));
  }

  //incrementar item del carrito
  const incrementarQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      //para no perder la referencia de los demas item del carrito
      return item;
    });

    //setearla al carrito
    setCart(updateCart);
  }

  // decrementar item del carrito
  const decrementarQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    //setearla al carrito
    setCart(updateCart);
  }



  return (
    <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarQuantity={incrementarQuantity}
        decrementarQuantity={decrementarQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {/* Cada guitarra se renderiza aquí */}
          {
            data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))
          }
        </div>

      </main >
      <Footer />

    </>
  )
}

export default App
