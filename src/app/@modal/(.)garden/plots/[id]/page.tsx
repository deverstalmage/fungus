import Plot from '@/app/garden/plots/[id]/plot';
import Modal from '@/app/modal';

export default async function PlotPage({ params: { id } }: { params: { id: number; }; }) {
  return (
    <Modal>
      <Plot id={Number(id)} />
    </Modal>
  );
}