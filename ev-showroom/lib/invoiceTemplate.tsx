type Product = {
  title: string;
  details: string;
  qty: number;
  amount: number;
};

type InvoiceProps = {
  customerName: string;
  address: string;
  phone: string;
  billNo: string;
  invoiceDate: string;
  products: Product[];
  total: number;
};

export default function InvoiceTemplate({
  customerName,
  address,
  phone,
  billNo,
  invoiceDate,
  products,
  total,
}: InvoiceProps) {
  return (
    <html>
      <head>
        <style>{`
          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
          }
@page{
    size:A4;
    margin:10mm;
}

html,body{
    width:210mm;
    min-height:297mm;
    background:white;
}
          body{
            font-family:Arial, Helvetica, sans-serif;
            padding:20px;
            color:#000;
            background:white;
          }
.invoice{
    border:2px solid black;
    min-height:275mm;
    display:flex;
    flex-direction:column;
}
    .products{
    width:100%;
    border-collapse:collapse;
    table-layout:fixed;
    flex:1;
}
          .title{
            text-align:center;
            font-size:28px;
            font-weight:bold;
            letter-spacing:2px;
            padding:10px 0;
            border-bottom:2px solid black;
          }

          .header{
            display:flex;
            border-bottom:2px solid black;
          }

          .logo{
            width:20%;
            display:flex;
            justify-content:center;
            align-items:center;
            border-right:2px solid black;
            padding:10px;
          }

          .logo img{
            width:90px;
          }

          .store{
            width:60%;
            text-align:center;
            padding:12px;
            border-right:2px solid black;
          }

          .store h1{
            font-size:30px;
            margin-bottom:6px;
          }

          .store p{
            font-size:14px;
            line-height:1.6;
          }

          .contact{
            width:20%;
            padding:10px;
            font-size:13px;
            line-height:1.8;
          }

          .bill-section{
            display:flex;
            border-bottom:2px solid black;
          }

          .bill-to{
            width:60%;
            border-right:2px solid black;
            padding:12px;
            min-height:120px;
          }

          .bill-details{
            width:40%;
            padding:12px;
          }

          .heading{
            font-weight:bold;
            margin-bottom:10px;
            border-bottom:1px solid black;
            padding-bottom:4px;
          }

          .field{
            margin-bottom:8px;
            font-size:14px;
          }

          .label{
            font-weight:bold;
          }

        `}</style>
      </head>

      <body>

        <div className="invoice">

          {/* Invoice Title */}

          <div className="title">
            INVOICE
          </div>

          {/* Header */}

          <div className="header">

            <div className="logo">

              {/* Replace later with your logo */}

              <img src="/logo.png" />

            </div>

            <div className="store">

              <h1>HR SALES</h1>

              <p>
                GAFOOR COLONY, UDITNAGAR,
                <br />
                ROURKELA, ODISHA - 769012
              </p>

              <p>
                Email :
                hr.sales.rkl@gmail.com
              </p>

            </div>

            <div className="contact">

              📞 +91 8917485620
              <br />

              📞 +91 8280531114

            </div>

          </div>

          {/* Bill Details */}

          <div className="bill-section">

            <div className="bill-to">

              <div className="heading">
                BILL TO
              </div>

              <div className="field">
                <span className="label">
                  Name :
                </span>{" "}
                {customerName}
              </div>

              <div className="field">
                <span className="label">
                  Address :
                </span>{" "}
                {address}
              </div>

              <div className="field">
                <span className="label">
                  Phone :
                </span>{" "}
                {phone}
              </div>

            </div>

            <div className="bill-details">

              <div className="heading">
                INVOICE DETAILS
              </div>

              <div className="field">
                <span className="label">
                  Bill No :
                </span>{" "}
                {billNo}
              </div>

              <div className="field">
                <span className="label">
                  Date :
                </span>{" "}
                {invoiceDate}
              </div>

            </div>

          </div>
{/* Product Table */}

<table className="products">
  <thead>
    <tr>
      <th style={{ width: "8%" }}>SL.</th>
      <th style={{ width: "62%" }}>DESCRIPTION</th>
      <th style={{ width: "10%" }}>UN.</th>
      <th style={{ width: "20%" }}>AMOUNT</th>
    </tr>
  </thead>

  <tbody>
    {products.map((item, index) => (
      <tr key={index}>
        <td className="center">
          {index + 1}
        </td>

        <td className="description">
          <div className="product-title">
            {item.title}
          </div>

          <div
            className="product-details"
            dangerouslySetInnerHTML={{
              __html: item.details.replace(/\n/g, "<br/>"),
            }}
          />
        </td>

        <td className="center">
          {item.qty}
        </td>

        <td className="amount">
          ₹ {item.amount.toLocaleString("en-IN")}
        </td>
      </tr>
    ))}

    {/* Empty rows so Total always stays at bottom */}

    {Array.from({
      length: Math.max(0, 8 - products.length),
    }).map((_, index) => (
      <tr key={`empty-${index}`}>
        <td style={{ height: "60px" }}></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ))}
  </tbody>

  <tfoot>
    <tr>
      <td
        colSpan={3}
        className="total-text"
      >
        TOTAL
      </td>

      <td className="total-value">
        ₹ {total.toLocaleString("en-IN")}
      </td>
    </tr>
  </tfoot>
</table>

{/* Signature */}

<div className="signature">

  <div>

    Customer Signature

  </div>

  <div>

    Authorized Signature

  </div>

</div>

{/* Footer */}

<div className="footer">

  <div>
    Thanks for doing business with us.
  </div>

  <div>
    <strong>HR SALES</strong>
  </div>

</div>

        </div>

      </body>
    </html>
  );
}