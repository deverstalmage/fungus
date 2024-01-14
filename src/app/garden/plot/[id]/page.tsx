import Link from "next/link";

export default function Plot({ params }: { params: { id: number; }; }) {
  return (
    <div>
      <div>Plot: {params.id}</div>
      <p><Link href="/garden">Back to garden entrance</Link></p>
    </div>
  );
}