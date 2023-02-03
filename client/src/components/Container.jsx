import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Container(props) {
    const [data, updateData] = useState([]);

    useEffect(() => {
        const api_call = async () => {
            let res = await fetch("/api/products");
            let res_json = await res.json();
            updateData(res_json);
        };
        api_call();
    }, []);

    return (
        <div className="container">
            {data.map((item, index) => (
                <Card
                    key={index}
                    id={item._id}
                    data={item}
                    cart={props.cart}
                    updateCart={props.updateCart}
                />
            ))}
        </div>
    );
}
