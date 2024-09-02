import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"


function App() {

  return (
    <>

      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <Guitar />

      </main >
      <Footer />

    </>
  )
}

export default App
