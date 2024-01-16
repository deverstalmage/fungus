import Plot from './plot';
import getPageData from './data';

export default async function PlotPage({ params: { id } }: { params: { id: number; }; }) {
  const pageData = await getPageData(id);
  if (!pageData) throw new Error();
  const { user, gardenPlot, growthMediums, plantedFungi, availableFungi } = pageData;

  return <Plot growthMediums={growthMediums} level={user.level} availableFungi={availableFungi} plantedFungi={plantedFungi} gardenPlotId={gardenPlot.id} />;
}