'use client';
import { Item } from "@/db/items";
import { Fungus, isFungus } from "@/db/fungi";
import styles from './card-selector.module.css';
import ItemCard from "@/app/item-card";
import { useState } from "react";
import FungusCard from "./fungus-card";

export default function ItemSelector({ items, onSelect, radio, canSelect }: { items: Item[] | Fungus[]; onSelect?: (item: Item | Fungus) => void; canSelect?: (item: Item | Fungus) => boolean; radio?: boolean; }) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const toggleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      const newItems = selectedItems.filter(i => i !== index);
      radio ? setSelectedItems([]) : setSelectedItems(newItems);
    } else {
      radio ? setSelectedItems([index]) : setSelectedItems([...selectedItems, index]);
    }
  };

  const click = (item: Item | Fungus, i: number) => {
    if (canSelect && !canSelect(item)) return;
    onSelect && onSelect(item);
    toggleSelectItem(i);
  };

  return (
    <div className={styles.itemList}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.itemSlot} ${selectedItems.includes(i) && styles.selected}`} onClick={() => click(item, i)}>
          {isFungus(item) ? <FungusCard key={i} fungus={item} /> : <ItemCard key={i} item={item} />}
        </div>
      ))}
    </div>
  );
}
