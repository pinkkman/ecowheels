"use client";

import { useState } from "react";

type Product = {
  title: string;
  details: string;
  qty: number;
  amount: number;
};
export default function BillForm() {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [billNo, setBillNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [products, setProducts] = useState<Product[]>([
  {
    title: "",
    details: "",
    qty: 1,
    amount: 0,
  },
]);

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const copy = [...products];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setProducts(copy);
  };

  const addProduct = () => {
    setProducts([
      ...products,
     {
  title: "",
  details: "",
  qty: 1,
  amount: 0,
},
    ]);
  };

  const removeProduct = (index: number) => {
    const copy = [...products];
    copy.splice(index, 1);
    setProducts(copy);
  };

  const total = products.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
const generateBill = async () => {
  const body = {
    customerName,
    address,
    phone,
    billNo,
    invoiceDate,
    products,
    total,
  };

  const res = await fetch("/api/bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    alert("Failed to generate bill");
    return;
  }

  const blob = await res.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${billNo || "Invoice"}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};
  return (
    <div className="space-y-6">

      {/* Customer */}

      <div className="grid md:grid-cols-2 gap-5">

        <input
          className="border rounded-lg p-3"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Bill Number"
          value={billNo}
          onChange={(e) => setBillNo(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />

      </div>

      {/* Products */}

      <div className="border rounded-xl p-5">

        <div className="grid grid-cols-12 gap-3 font-semibold mb-4">

          <div className="col-span-6">
            Product
          </div>

          <div className="col-span-2">
            Qty
          </div>

          <div className="col-span-3">
            Amount
          </div>

          <div className="col-span-1"></div>

        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 mb-3"
          >
            <input
              className="col-span-6 border rounded-lg p-2"
              placeholder="Product"
              value={product.title}
              onChange={(e) =>
                updateProduct(index, "title", e.target.value)
              }
            />

            <input
              className="col-span-2 border rounded-lg p-2"
              type="number"
              value={product.qty}
              onChange={(e) =>
                updateProduct(
                  index,
                  "qty",
                  Number(e.target.value)
                )
              }
            />

            <input
              className="col-span-3 border rounded-lg p-2"
              type="number"
              value={product.amount}
              onChange={(e) =>
                updateProduct(
                  index,
                  "amount",
                  Number(e.target.value)
                )
              }
            />

            <button
              className="bg-red-500 text-white rounded-lg"
              onClick={() => removeProduct(index)}
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={addProduct}
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>

      </div>

      {/* Total */}

      <div className="flex justify-end text-2xl font-bold">
        Total : ₹ {total.toLocaleString()}
      </div>

      {/* Button */}

      <div className="flex justify-end">

        <button
          onClick={generateBill}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
        >
          Generate PDF
        </button>

      </div>

    </div>
  );
}