import { renderToStaticMarkup } from "react-dom/server";
import InvoiceTemplate from "./invoiceTemplate";

export default function renderInvoice(data: any) {
    return `
<!DOCTYPE html>

${renderToStaticMarkup(
    <InvoiceTemplate {...data} />
)}
`;
}