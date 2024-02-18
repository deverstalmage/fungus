'use client';
import { Fungus } from "@/db/fungi";
import styles from './plot.module.css';
import FungusCard from "@/app/fungus-card";
import { useState } from "react";
import { Item } from "@/db/items";
import CardSelector from "@/app/card-selector";

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
  const [plantingSpace, setPlantingSpaceSpace] = useState(0);
  const plotSize = plotSizeByLevel[level - 1];
  const emptySpaceCount = plotSize - plantedFungi.length;

  const pickForSpace = (space: number) => {
    if (space === plantingSpace) setPlantingSpaceSpace(0);
    else setPlantingSpaceSpace(space);
  };

  const emptySpaces = [];
  for (let i = 0; i < emptySpaceCount; i++) {
    emptySpaces.push(
      <div className={styles.emptySpace} key={i} onClick={() => pickForSpace(i + 1)}>
        Empty Space
      </div>
    );
  }

  const fungusPicker = plantingSpace !== 0 ? (
    <>
      {growthMediums.length && availableFungi.length ? (
        <div>
          <p>Pick growth medium:</p>

          <CardSelector items={growthMediums} />

          <p>Pick fungus spores to seed:</p>

          <CardSelector items={availableFungi} radio={true} />
          {/* <div className={styles.picker}>
            {availableFungi.map((f, i) => (
              <FungusCard key={i} fungus={f} />
            ))}
          </div> */}
        </div>
      ) : (
        <div>
          No growth mediums and/or fungi available
        </div>
      )}
    </>
  ) : ``;

  return (
    <div>
      <h1>Plot {gardenPlotId}</h1>

      {fungusPicker}

      <div className={styles.plot}>
        {plantedFungi.map((f, i) => <div key={i}><FungusCard fungus={f} /></div>)}
        {emptySpaces}
      </div>
    </div>
  );
}