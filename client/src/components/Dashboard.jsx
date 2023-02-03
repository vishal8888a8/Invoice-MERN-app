import React, { useState } from "react";
import Invoice from "./Invoice";
import Container from "./Container";

export default function Dashboard() {
    
    let [cart, updateCart] = useState([]);

    return (
        <div>
            <h1 className="buy">Buy Our Products</h1>
            <Container cart={cart} updateCart={updateCart} />
            <Invoice cart={cart} updateCart={updateCart} />
        </div>
    );
}
