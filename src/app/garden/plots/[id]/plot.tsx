'use client';
import { CombinedFungus, Fungus, getFungus } from "@/db/fungi";
import styles from './plot.module.css';
import FungusCard from "@/app/fungus-card";
import { SyntheticEvent, useState } from "react";
import { FertilizerItem, Item, SubstrateItem, getItem } from "@/db/items";
import CardSelector from "@/app/card-selector";
import seed from './seed';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import Countdown from "@/app/countdown";
import harvest from "./harvest";
import remove from "./remove";
import notify from "@/lib/notify";
import Modal from "@/app/modal";
import fertilizeAction from "./fertilize";

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

type SubstrateState = SubstrateItem | undefined;
type FungusState = CombinedFungus | undefined;

export default function Plot({ gardenPlotId, plantedFungi, availableFungi, level, inventory, now }: { inventory: Item[], gardenPlotId: number, availableFungi: CombinedFungus[], plantedFungi: CombinedFungus[], level: number; now: number; }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFertilize, setShowFertilize] = useState(false);
  const [plantingSpace, setPlantingSpace] = useState(0);
  const [selectedGrowthMedium, setSelectedGrowthMedium] = useState<SubstrateState>();
  const [selectedFungus, setSelectedFungus] = useState<FungusState>();
  const [selectedPlantedFungus, setSelectedPlantedFungus] = useState<FungusState>();
  const [selectedFertilizer, setSelectedFertilizer] = useState<FertilizerItem>();

  const plotSize = plotSizeByLevel[level - 1];
  const substrates = inventory.filter(i => i.type === 'Substrate');
  const fertilizers = inventory.filter(i => i.type === 'Fertilizer');
  const sportCollectionKits = inventory.filter(i => i.id === 4);

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

      const tick = (n: number) => {
        // if (n <= 0) setPlantingSpace(plantingSpace);
      };

      const harvestAction = async () => {
        console.log('harvesting....');
        const result = await harvest(f.uid);
        if (result) {
          notify(<p>Successfully harvested {result} fruit!</p>);
        } else {
          notify(<p>Error harvesting</p>);
        }
        router.refresh();
      };

      const hasKit = sportCollectionKits.length;
      const selected = selectedPlantedFungus === f;

      const removeWithKit = async (useKit: boolean) => {
        const result = await remove(f.uid, useKit);
        if (result) {
          setShowConfirm(false);
          notify(
            <>
              <FungusCard fungus={f} />
              <p>Gathered spores</p>
            </>
          );
        } else {
          notify(<p>Error removing</p>);
        }

        router.refresh();
      };

      const fertilize = async () => {
        if (!selectedFungus || !selectedFertilizer) return;
        const results = await fertilizeAction(selectedFungus.uid, selectedFertilizer.uid as number);
      };

      spaces.push(
        <div key={i} className={`${styles.space} ${selected && styles.selected}`}>
          <div onClick={() => selected ? setSelectedPlantedFungus(undefined) : setSelectedPlantedFungus(f)}><FungusCard linked={false} fungus={f} /></div>
          <p>Harvest <Countdown date={nextHarvest || DateTime.now().toISO()} tick={tick} /></p>
          {selected && (
            <div className={styles.actions}>
              <form action={harvestAction}>
                <button type="submit" disabled={!canHarvest}>Harvest</button>
              </form>
              <button onClick={() => setShowFertilize(true)}>Fertilize</button>
              <button onClick={() => setShowConfirm(true)}>Remove</button>
            </div>
          )}
          {showConfirm && (
            <Modal onDismiss={() => setShowConfirm(false)} onClose={() => setShowConfirm(false)}>
              <p>Would you like to gather spors from the fungus before removing it?</p>
              <div>
                <form action={() => removeWithKit(true)}><button type="submit" disabled={!hasKit}>Gather spores and remove (1x Spore Collection Kit)</button></form>
                <form action={() => removeWithKit(false)}><button type="submit">Remove without gathering</button></form>
              </div>
            </Modal>
          )}
          {showFertilize && (
            <Modal onDismiss={() => setShowFertilize(false)} onClose={() => setShowFertilize(false)}>
              <p>Select a fertilizer:</p>
              <CardSelector items={fertilizers} radio={true} onSelect={(items) => setSelectedFertilizer(items[0] as FertilizerItem)} />
              <form action={() => fertilize()}>
                <button type="submit">Fertilize</button>
              </form>
            </Modal>
          )}
        </div>
      );
    } else {
      spaces.push(
        <div className={`${styles.space} ${styles.emptySpace} ${plantingSpace === i && styles.selected}`} key={i} onClick={() => pickForSpace(i)}>
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
    <Modal onDismiss={() => setPlantingSpace(0)} onClose={() => setPlantingSpace(0)}>
      {substrates.length && availableFungi.length ? (
        <>
          <p>Pick substrate: {selectedGrowthMedium?.name}</p>
          <CardSelector items={substrates} radio={true} onSelect={(items) => setSelectedGrowthMedium(items[0] as SubstrateState)} />

          <p>Pick fungus spores to seed: {selectedFungus?.name}</p>
          <CardSelector items={availableFungi} radio={true} onSelect={(items) => setSelectedFungus(items[0] as FungusState)} />

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
    </Modal>
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