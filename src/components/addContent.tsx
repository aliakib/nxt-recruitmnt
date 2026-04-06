import Link from "next/link";

interface AddConentProps {
    text: string;
    routeTo: string;
}
export default function AddContent({ text, routeTo }: AddConentProps) {
    return (
        <>
            {/* Header */}
            < div className="px-6 py-4 border-b border-border flex justify-between items-center" >
                <h2 className="text-lg font-semibold">Candidates</h2>
                <Link className="px-4 py-2 bg-primary text-primary-foreground rounded-lg" href={routeTo}>
                    + Add {text}
                </Link>
            </div >
        </>
    )
}