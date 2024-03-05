'use client';
import { useState } from "react";
import forageAction from './forage';
import collectAction from './collect';
import { Fungus, getFungus } from '@/db/fungi';
import { Item, getItem } from '@/db/items';
import Modal from '../modal';
import CardSelector from '../card-selector';
import ItemCard from "../item-card";
import styles from './backpack.module.css';
import purchaseKits from "./purchase-kits";
import { useRouter } from "next/navigation";
import { fruitForRarity } from "@/lib/rarity";
import notify from "@/lib/notify";
import GetItem from "../get-item";
import FungusCard from "../fungus-card";

export default function Backpack({ items, canForage }: { items: Array<Item>; canForage: boolean; }) {
  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [selectedFoundFungi, setSelectedFoundFungi] = useState<Array<Fungus>>([]);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [foundFungi, setFoundFungi] = useState<Array<Fungus>>([]);
  const [foundItems, setFoundItems] = useState<Array<Item>>([]);
  const [forageResultsId, setForageResultsId] = useState<number>();
  const router = useRouter();

  const withoutKits = items.filter(i => i.id !== 4);
  const numKits = items.filter(i => i.id === 4).length;
  const unselectedFungi = foundFungi.filter(f => !selectedFoundFungi.includes(f));
  const unselectedFungiValue = unselectedFungi.reduce((prev, current) => prev + fruitForRarity(current.rarity), 0);

  const action = async () => {
    const results = await forageAction([]);
    if (!results) return;
    setForageResultsId(results.id);

    const fungi = JSON.parse(results.fungusIds).map((r: number) => getFungus(r));
    const items = JSON.parse(results.itemIds).map((r: number) => getItem(r));


    setShowResultsModal(true);
    setFoundFungi(fungi);
    setFoundItems(items);
  };

  const collect = async () => {
    if (!forageResultsId) return;
    const results = await collectAction(selectedFoundFungi, forageResultsId);
    if (!results) return;

    const { sporesObtained, itemsObtained } = results;

    for (const item of itemsObtained) {
      notify(GetItem({ item }));
    }

    for (const spore of sporesObtained) {
      notify(
        <>
          <FungusCard fungus={spore} />
          <p>Gathered spores</p>
        </>
      );
    }

    router.refresh();
    setShowResultsModal(false);
  };

  const buyKits = async () => {
    purchaseKits(1);
    router.refresh();
  };

  const collectMessage = unselectedFungiValue > 0 && selectedFoundFungi.length
    ? `Collect ${unselectedFungiValue} fruits and ${selectedFoundFungi.length} spores`
    : unselectedFungiValue === 0 && selectedFoundFungi.length
      ? `Collect ${selectedFoundFungi.length} spores`
      : `Collect ${unselectedFungiValue} fruits`;

  return (
    <>
      {showResultsModal && (
        <Modal noDismiss={true} onDismiss={() => setShowResultsModal(false)}>
          <div>
            <p>Select fungi to take spore samples from</p>
            <p>Using {selectedFoundFungi.length} / {numKits} Kits</p>
            <form action={buyKits}>
              <button type="submit">Buy a kit for 1000</button>
            </form>
            <p>Fruit collected from the rest of the fungi: {unselectedFungiValue}</p>

            <CardSelector items={foundFungi} maxSelect={numKits} onSelect={fungi => setSelectedFoundFungi(fungi as Array<Fungus>)} />

            <p>You also got the following items:</p>
            <div className={styles.items}>
              {foundItems.map((item, i) => {
                return (
                  <ItemCard linked={false} item={item} key={i} />
                );
              })}
            </div>

            <form action={collect}>
              <button>{collectMessage}</button>
            </form>
          </div>
        </Modal>
      )}
      {withoutKits.length !== 0 && (<h2>Select items to use on the expedition</h2>)}
      <CardSelector items={withoutKits} onSelect={items => setSelectedItems(items as Array<Item>)} />
      <form action={action}>
        <button type="submit" disabled={!canForage}>Go foraging</button>
      </form>
    </>
  );
}