import BillForm from "@/components/BillForm";

export default function BillsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Generate Bill
      </h1>

      <BillForm />
    </div>
  );
}