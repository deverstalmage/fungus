'use client';
import { Item } from "@/db/items";
import { Fungus, isFungus } from "@/db/fungi";
import styles from './card-selector.module.css';
import ItemCard from "@/app/item-card";
import { useState } from "react";
import FungusCard from "./fungus-card";

export default function ItemSelector({ items, onSelect, radio, canSelect, maxSelect }: { items: Item[] | Fungus[]; onSelect?: (items: Array<Item> | Array<Fungus>) => void; canSelect?: (item: Item | Fungus) => boolean; radio?: boolean; maxSelect?: number; }) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const canSelectMore = selectedItems.length !== maxSelect;

  const toggleSelectItem = (index: number, item: Item | Fungus) => {
    if (canSelect && !canSelect(item)) return;
    if (selectedItems.includes(index)) {
      const newItems = selectedItems.filter(i => i !== index);
      radio ? setSelectedItems([]) : setSelectedItems(newItems);
      onSelect && onSelect((radio ? [] : newItems.map(i => items[i])) as Array<Item> | Array<Fungus>);
    } else {
      if (maxSelect && selectedItems.length + 1 > maxSelect) return;
      radio ? setSelectedItems([index]) : setSelectedItems([...selectedItems, index]);
      onSelect && onSelect([...selectedItems, index].map(i => items[i]) as Array<Item> | Array<Fungus>);
    }
  };

  return (
    <div className={styles.itemList}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.itemSlot}  ${selectedItems.includes(i) ? styles.selected : canSelectMore && styles.itemSlotWithHover}`} onClick={() => toggleSelectItem(i, item)}>
          {isFungus(item) ? <FungusCard linked={false} key={i} fungus={item} /> : <ItemCard linked={false} key={i} item={item} />}
        </div>
      ))}
    </div>
  );
}
