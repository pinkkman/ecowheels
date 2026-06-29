import BillForm from "@/components/BillForm";

export const metadata = {
  title: "Generate Invoice | HR SALES",
  description: "Admin invoice generator for HR SALES.",
};

export default function BillsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Invoice Generator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to generate and download a PDF invoice.
          </p>
        </div>

        {/* Form */}
        <BillForm />

      </div>
    </main>
  );
}