'use client';
import { CombinedFungus, Fungus } from "@/db/fungi";
import styles from './plot.module.css';
import FungusCard from "@/app/fungus-card";
import { useState } from "react";
import { Item, SubstrateItem, getItem } from "@/db/items";
import CardSelector from "@/app/card-selector";
import seed from './seed';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import Countdown from "@/app/countdown";
import harvest from "./harvest";
import notify from "@/lib/notify";

export const intervalMilli = 1000 * 60 * 5; // 5 minutes
export const invervalDur = { milliseconds: intervalMilli };

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

type SubstrateState = SubstrateItem | null;
type FungusState = CombinedFungus | null;

export default function Plot({ gardenPlotId, plantedFungi, availableFungi, level, growthMediums, now }: { growthMediums: Item[], gardenPlotId: number, availableFungi: CombinedFungus[], plantedFungi: CombinedFungus[], level: number; now: number; }) {
  const router = useRouter();
  const [plantingSpace, setPlantingSpace] = useState(0);
  const [selectedGrowthMedium, setSelectedGrowthMedium] = useState<SubstrateState>(null);
  const [selectedFungus, setSelectedFungus] = useState<FungusState>(null);
  const plotSize = plotSizeByLevel[level - 1];

  const pickForSpace = (space: number) => {
    if (space === plantingSpace) setPlantingSpace(0);
    else setPlantingSpace(space);
  };

  const spaces = [];
  const occupiedSpaces = plantedFungi.map(f => f.spaceIndex);
  for (let i = 1; i <= plotSize; i++) {
    if (occupiedSpaces.includes(i)) {
      const f = plantedFungi.filter(fn => fn.spaceIndex === i)[0];

      const lastHarvested = Number(f.lastHarvested);
      const lastHarvestedDateTime = DateTime.fromMillis(lastHarvested);
      const substrate = getItem(f.growthMediumItemId as number) as SubstrateItem;
      const timeToHarvest = f.msToHarvest * substrate.harvestTimeMultiplier;
      const canHarvest = lastHarvestedDateTime.plus({ milliseconds: timeToHarvest }) <= DateTime.fromMillis(now);
      const nextHarvest = lastHarvestedDateTime.plus({ milliseconds: timeToHarvest }).toISO();

      const harvestAction = async () => {
        const result = await harvest(f.uid);
        if (result) {
          notify(<p>Successfully harvested {result} fruit!</p>);
        } else {
          notify(<p>Error harvesting</p>);
        }
        router.refresh();
      };

      spaces.push(
        <div key={i}>
          <FungusCard fungus={f} />
          <p>Harvest <Countdown date={nextHarvest || DateTime.now().toISO()} /></p>
          <form action={harvestAction}>
            <button type="submit" disabled={!canHarvest}>Harvest</button>
          </form>
        </div>
      );
    } else {
      spaces.push(
        <div className={`${styles.emptySpace} ${plantingSpace === i && styles.selectedEmptySpace}`} key={i} onClick={() => pickForSpace(i)}>
          Empty Space
        </div>
      );
    }
  }

  const withToast = async () => {
    const itemUid = selectedGrowthMedium?.uid;
    const fungusUid = selectedFungus?.uid;
    if (!itemUid || !fungusUid) return;

    const success = await seed(itemUid, fungusUid, gardenPlotId, plantingSpace);
    if (!success) return;

    setPlantingSpace(0);

    notify(<p>Seeded {selectedGrowthMedium.name} with {selectedFungus.name} spores in space {plantingSpace}</p>);

    router.refresh();
  };

  const fungusPicker = plantingSpace !== 0 ? (
    <>
      {growthMediums.length && availableFungi.length ? (
        <>
          <p>Pick substrate: {selectedGrowthMedium?.name}</p>
          <CardSelector items={growthMediums} radio={true} onSelect={(item) => setSelectedGrowthMedium(item as SubstrateState)} />

          <p>Pick fungus spores to seed: {selectedFungus?.name}</p>
          <CardSelector items={availableFungi} radio={true} onSelect={(item) => setSelectedFungus(item as FungusState)} />

          <form action={withToast}>
            <button disabled={!selectedFungus || !selectedGrowthMedium} type="submit">
              Grow in selected space
            </button>
          </form>
        </>
      ) : (
        <div>
          No growth media and/or fungi available
        </div>
      )}
    </>
  ) : ``;

  return (
    <div className={styles.plotWrapper}>
      <h1>Plot {gardenPlotId}</h1>

      {fungusPicker}

      <div className={styles.plot}>
        {spaces}
      </div>
    </div>
  );
}