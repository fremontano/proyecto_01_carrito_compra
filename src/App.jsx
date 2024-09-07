import { useEffect, useState } from "react"
import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { dbGuitars } from "./data/db";

function App() {


  // Funcion para obtener el estado inicial del carrito desde el almacenamiento local.
  // Intenta recuperar el valor del carrito guardado en el almacenamiento local bajo la clave 'cart'.
  // Si existe un valor, lo convierte de una cadena JSON a un arreglo de objetos usando `JSON.parse`.
  // Si no hay ningún valor en el almacenamiento local (es decir, si el valor es `null`),
  // la función devuelve un arreglo vacío, indicando que el carrito está vacío.
  // Esta función se utiliza para inicializar el estado del carrito al cargar la aplicación.
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }


  // Aquí se almacenarán los datos de las guitarras en un array
  const [data, setData] = useState(dbGuitars);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 10;
  const MIN_ITEMS = 1;

  console.log(cart)

  // useEffect para sincronizar el carrito con el almacenamiento local.
  // Este efecto se ejecuta cada vez que cambia el estado del carrito (`cart`).
  // Convierte el arreglo `cart` en una cadena JSON usando `JSON.stringify`,
  // y guarda esta cadena en el almacenamiento local del navegador con la clave 'cart'.
  // Esto asegura que el carrito de compras se persiste en el almacenamiento local
  // y puede ser recuperado cuando el usuario vuelve a cargar la página.
  //luego en INITIALCART me aseguro de que esos datos persistan
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);





  // agregar item al carrito 
  const addToCart = (items) => {
    const itemExiste = cart.findIndex(guitar => guitar.id === items.id);

    if (itemExiste >= 0) {
      // si el item ya existe en el carrito, incrementar la cantidad si no sobrepasa el límite
      if (cart[itemExiste].quantity > MAX_ITEMS) return;

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


  // vaciar el carrito
  const clearCart = () => {
    setCart([]);
  }



  return (
    <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarQuantity={incrementarQuantity}
        decrementarQuantity={decrementarQuantity}
        clearCart={clearCart}
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
