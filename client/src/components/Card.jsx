import React from "react";
import "./css/card.css";

export default function Card(props) {
    const { id, data, cart, updateCart } = props;

    function handleAdd() {
        let index = cart.findIndex((item) => item.id === id);
        updateCart((prev) => {
            let new_prev = [...prev];
            if (index === -1) {
                new_prev.push({ id: id, count: 1 });
            } else {
                new_prev[index].count++;
            }
            return new_prev;
        });
        alert("Product added to cart!");
    }

    return (
        <div className="card">
            <h5 className="Heading">{data.name}</h5>
            <p>Price : ₹{data.mrp}</p>
            <p>GST : {data.gst}%</p>
            <button className="add" onClick={() => handleAdd()}>
                Add to cart
            </button>
        </div>
    );
}
