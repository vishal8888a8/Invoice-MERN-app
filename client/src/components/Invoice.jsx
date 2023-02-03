import React from "react";
var FileSaver = require("file-saver");

export default function Invoice(props) {
    let { cart, updateCart } = props;

    function handleSubmit() {
        const post_data = async () => {
            const res = await fetch("/api/products", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cart),
            });
            if (res.status === 200) {
                res.blob().then((blob) =>
                    FileSaver.saveAs(blob, "invoice.pdf")
                );
                updateCart([]);
            } else alert("some error occured");
        };
        post_data();
    }

    return (
        <div className="invoice">
            <h2>Generate Invoice</h2>
            No. of products Added :
            {cart.length === 0
                ? 0
                : cart.map((i) => i.count).reduce((a, b) => a + b)}
            <button className="buyButton" onClick={() => handleSubmit()}>
                Buy!
            </button>
        </div>
    );
}
