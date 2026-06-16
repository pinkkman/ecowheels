"use client";

export default function WhatsAppEnquiryButton({
                                                  scooterName,
                                              }: {
    scooterName: string;
}) {
    const handleEnquiry = () => {
        const name = prompt("Please enter your name");

        if (!name?.trim()) return;

        const message = `Hello EcoWheels,

My name is ${name}.

I am interested in ${scooterName}.

Please share:
• On-road Price
• EMI Options
• Availability

Thank You.`;

        const link = `https://wa.me/918280531114?text=${encodeURIComponent(
            message
        )}`;

        window.open(link, "_blank");
    };

    return (
        <button
            onClick={handleEnquiry}
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-semibold transition text-white"
        >
            💬 Enquire on WhatsApp
        </button>
    );
}