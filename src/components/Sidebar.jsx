import React, { useContext } from "react";
import { FaPercent } from "react-icons/fa6";
import { counterContext } from "/src/context/Context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function Sidebar(props) {
  const handleDownload = () => {
    const doc = new jsPDF();
    console.log(props);

    const title = "xyz";
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text(title, 15, 20);
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text(`Invoice #: ${props.invoice}`, 15, 28);
    doc.setTextColor("#507687");
    doc.setFontSize(16);
    doc.text(`Amount Due:`, 160, 20);
    doc.setFontSize(20);
    doc.setTextColor("#4CAF50");
    doc.text(`$ ${props.subTotal}`, 160, 30);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.setFont("Helvetica", "bold");
    doc.text("Billed to:", 15, 45);
    doc.text("Billed From:", 120, 45);
    doc.text("Date Of Issue:", 120, 75);

    doc.setFont("Helvetica", "normal");
    doc.text(props.Tinvoice, 15, 50);
    doc.text(props.Tadress, 15, 55);
    doc.text(props.Temail, 15, 60);

    doc.text(props.Finvoice, 120, 50);
    doc.text(props.Fadress, 120, 55);
    doc.text(props.Femail, 120, 60);

    doc.text(props.dateOfIssue, 120, 80);

    const itemsData = props.items.map((item) => [
      item.quantity,
      item.description,
      `$ ${item.price}`,
      `$ ${item.price * item.quantity}`,
    ]);

    autoTable(doc, {
      head: [["QTY", "DESCRIPTION", "PRICE", "AMOUNT"]],
      body: itemsData,
      startY: 90,
      margin: { left: 15, right: 15 },
      theme: "grid",
    });

    const finalY = doc.autoTable.previous.finalY + 10;

    doc.text("SUBTOTAL", 140, finalY);
    doc.text(`$ ${props.subTotal}`, 170, finalY);
    doc.text("TAX", 140, finalY + 10);
    doc.text(`$ ${props.tAmout}`, 170, finalY + 10);
    doc.text("DISCOUNT", 140, finalY + 20);
    doc.text(`$ ${props.DAmout}`, 170, finalY + 20);
    doc.setFont("Helvetica", "bold");
    doc.text("TOTAL", 140, finalY + 30);
    doc.text(
      `$ ${props.subTotal + props.tAmout - props.DAmout}`,
      170,
      finalY + 30
    );

    doc.save("invoice.pdf");
  };
  const value = useContext(counterContext);
  const handleChangeTax = (e) => {
    value.setTax(e.target.value);
  };
  const handleChangeDiscount = (e) => {
    value.setDiscount(e.target.value);
  };
  return (
    <>
      <div>
        <div>
          <button
            className="bg-blue-400 w-full h-12 rounded-lg text-white font-bold text-sm hover:bg-blue-500 "
            onClick={handleDownload}
          >
            Download
          </button>
          <hr className="border-t-2 border-hrColor  my-2" />
        </div>
        <div className="mb-8">
          <label htmlFor="" className="text-base font-semibold">
            Tax rate:
          </label>
          <div className="flex items-center border-borderBlack border-2 rounded-md ">
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="bg-white h-8 p-2 border border-semiBlack rounded-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="0.0"
              min="1"
              step="1"
              onChange={handleChangeTax}
            />
            <div className="pl-5">
              <FaPercent className="text-blackPercent text- " />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-base font-semibold">
            Discount rate:
          </label>
          <div className="flex items-center border-borderBlack border-2 rounded-md ">
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="bg-white h-8 p-2 border border-semiBlack rounded-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="0.0"
              min="1"
              step="1"
              onChange={handleChangeDiscount}
            />
            <div className="pl-5">
              <FaPercent className="text-blackPercent text- " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
