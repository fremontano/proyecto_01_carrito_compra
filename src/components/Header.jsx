import { useMemo } from "react";

export const Header = ({ cart, removeFromCart, incrementarQuantity, decrementarQuantity }) => {
    // Estado derivado que indica si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Función que calcula el precio total de los productos en el carrito
    const cartTotalPrecio = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);



    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        {/* Iterando el carrito */}
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((guitar) => (
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">${guitar.price}</td>
                                                        <td className="d-flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decrementarQuantity(guitar.id)}
                                                            >-</button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => incrementarQuantity(guitar.id)}
                                                            >
                                                                +</button>

                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)}
                                                            >
                                                                X</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Precio total del carrito */}
                                        <p className="text-end">
                                            Total a pagar: <span className="fw-bold">${cartTotalPrecio}</span>
                                        </p>
                                        <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};
