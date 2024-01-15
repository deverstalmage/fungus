import Plot from './plot';

export default async function PlotPage({ params: { id } }: { params: { id: number; }; }) {
  return <Plot id={Number(id)} />;
}