import EditForm from "@/components/EditForm";
import ParticleBackground from "@/components/ParticleBackground";
async function getScooter(id: string) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/scooters/${id}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export default async function EditPage({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const data = await getScooter(id);

    return (

        <EditForm scooter={data.scooter} />
    );
}