import { useState } from "react"
import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { dbGuitars } from "./data/db";

function App() {

  // Aquí se almacenarán los datos de las guitarras en un array
  const [data, setData] = useState(dbGuitars);
  const [cart, setCart] = useState([]);
  console.log(cart)





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



  return (
    <>

      <Header />
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
