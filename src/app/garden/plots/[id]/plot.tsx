'use client';
import { Fungus } from "@/db/fungi";
import styles from './plot.module.css';
import FungusCard from "@/app/fungus-card";
import { useState } from "react";
import { Item } from "@/db/items";
import CardSelector from "@/app/card-selector";
import seed from './seed';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

const plotSizeByLevel = [
  3,
  3,
  3,
  3,
  5,
  5,
  5,
  5,
  5,
  10,
  10,
  10,
  10,
  10,
  15,
  15,
  15,
  15,
  15,
  20
];

export default function Plot({ gardenPlotId, plantedFungi, availableFungi, level, growthMediums }: { growthMediums: Item[], gardenPlotId: number, availableFungi: Fungus[], plantedFungi: Fungus[], level: number; }) {
  const router = useRouter();
  const [plantingSpace, setPlantingSpace] = useState(0);
  const [selectedGrowthMedium, setSelectedGrowthMedium] = useState<Item | Fungus | null>(null);
  const [selectedFungus, setSelectedFungus] = useState<Item | Fungus | null>(null);
  const plotSize = plotSizeByLevel[level - 1];
  const emptySpaceCount = plotSize - plantedFungi.length;

  const pickForSpace = (space: number) => {
    if (space === plantingSpace) setPlantingSpace(0);
    else setPlantingSpace(space);
  };

  const emptySpaces = [];
  for (let i = 0; i < emptySpaceCount; i++) {
    emptySpaces.push(
      <div className={`${styles.emptySpace} ${plantingSpace - 1 === i && styles.selectedEmptySpace}`} key={i} onClick={() => pickForSpace(i + 1)}>
        Empty Space
      </div>
    );
  }

  const withToast = async () => {
    const itemUid = selectedGrowthMedium?.uid;
    const fungusUid = selectedFungus?.uid;
    if (!itemUid || !fungusUid) return;

    const success = await seed(itemUid, fungusUid);
    if (!success) return;

    toast(() => (<p>Seeded {selectedGrowthMedium.name} with {selectedFungus.name} spores in space {plantingSpace}</p>), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: true,
      theme: "light",
    });
    router.refresh();
  };

  const fungusPicker = plantingSpace !== 0 ? (
    <>
      {growthMediums.length && availableFungi.length ? (
        <>
          <p>Pick growth medium: {selectedGrowthMedium?.name}</p>
          <CardSelector items={growthMediums} radio={true} onSelect={(item) => setSelectedGrowthMedium(item)} />

          <p>Pick fungus spores to seed: {selectedFungus?.name}</p>
          <CardSelector items={availableFungi} radio={true} onSelect={(item) => setSelectedFungus(item)} />

          <form action={withToast}>
            <button disabled={!selectedFungus || !selectedGrowthMedium} type="submit">
              Grow in selected space
            </button>
          </form>
        </>
      ) : (
        <div>
          No growth mediums and/or fungi available
        </div>
      )}
    </>
  ) : ``;

  return (
    <div className={styles.plotWrapper}>
      <h1>Plot {gardenPlotId}</h1>

      {fungusPicker}

      <div className={styles.plot}>
        {plantedFungi.sort((a, b) => {
          if (a.spaceIndex && b.spaceIndex) return a.spaceIndex - b.spaceIndex;
          return 0;
        }).map((f, i) => <div key={i}><FungusCard fungus={f} /></div>)}
        {emptySpaces}
      </div>
    </div>
  );
}