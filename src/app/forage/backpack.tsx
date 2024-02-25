'use client';
import { useState } from "react";
import forageAction from './forage';
import styles from './forage-button.module.css';
import { Fungus, getFungus } from '@/db/fungi';
import { Item, getItem } from '@/db/items';
import Modal from '../modal';
import CardSelector from '../card-selector';

export default function Backpack({ items }: { items: Array<Item>; }) {
  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const withoutKits = items.filter(i => i.id !== 4);
  const numKits = items.filter(i => i.id === 4).length;

  const [showResultsModal, setShowResultsModal] = useState(false);
  const [foundFungi, setFoundFungi] = useState<Array<Fungus>>([]);

  const action = async () => {
    const results = await forageAction([]);
    if (!results) return;

    const fungi = JSON.parse(results.fungusIds).map((r: number) => getFungus(r));
    const items = JSON.parse(results.itemIds).map((r: number) => getItem(r));

    setShowResultsModal(true);
    setFoundFungi(fungi);
  };

  const canForage = true; // make sure there is enough energy to go foraging

  return (
    <>
      {showResultsModal && (
        <Modal onDismiss={() => setShowResultsModal(false)}>
          <div>
            <p>Select fungi to take spore samples from (you have {numKits} Spore Collection Kits):</p>

            <CardSelector items={foundFungi} maxSelect={numKits} />
          </div>
        </Modal>
      )}
      {withoutKits.length !== 0 && (<h2>Select items to use on the expedition</h2>)}
      <CardSelector items={withoutKits} onSelect={items => setSelectedItems(items as Array<Item>)} />
      <form action={action}>
        <button className={styles.button} type="submit" disabled={!canForage}>Go foraging</button>
      </form>
    </>
  );
}