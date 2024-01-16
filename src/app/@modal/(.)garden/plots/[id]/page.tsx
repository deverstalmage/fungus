import getPageData from '@/app/garden/plots/[id]/data';
import Plot from '@/app/garden/plots/[id]/plot';
import Modal from '@/app/modal';

export default async function PlotPage({ params: { id } }: { params: { id: number; }; }) {
  const pageData = await getPageData(id);
  if (!pageData) return;
  const { user, plantedFungi, availableFungi, gardenPlot, growthMediums } = pageData;

  return (
    <Modal>
      <Plot growthMediums={growthMediums} level={user.level} availableFungi={availableFungi} plantedFungi={plantedFungi} gardenPlotId={gardenPlot.id} />
    </Modal>
  );
}