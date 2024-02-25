import Plot from './plot';
import getPageData from './data';
import { DateTime } from 'luxon';

export default async function PlotPage({ params: { id } }: { params: { id: number; }; }) {
  const pageData = await getPageData(id);
  if (!pageData) throw new Error();
  const { user, gardenPlot, plantedFungi, availableFungi, inventory } = pageData;

  return <Plot now={DateTime.now().valueOf()} inventory={inventory} level={user.level} availableFungi={availableFungi} plantedFungi={plantedFungi} gardenPlotId={gardenPlot.id} />;
}