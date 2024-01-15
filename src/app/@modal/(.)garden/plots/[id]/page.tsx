import Modal from '@/app/modal';
import prisma from '@/lib/prisma';

export default async function Plot({ params: { id } }: { params: { id: number; }; }) {
  const plot = await prisma.gardenPlot.findUnique({ where: { id: Number(id) } });
  if (!plot) return;

  return (
    <Modal>
      <div>Plot: {plot?.id}</div>
    </Modal>
  );
}