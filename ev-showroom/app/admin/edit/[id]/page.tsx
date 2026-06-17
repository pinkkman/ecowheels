import EditForm from "@/components/EditForm";
import ParticleBackground from "@/components/ParticleBackground";
import { connectDB } from "@/lib/db";
import Scooter from "@/models/Scooter";

async function getScooter(id: string) {
    await connectDB();

    const scooter = await Scooter.findById(id).lean();

    if (!scooter) {
        return null;
    }

    return JSON.parse(JSON.stringify(scooter));
}

export default async function EditPage({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const data = await getScooter(id);

    return (

        <EditForm scooter={data} />
    );
}