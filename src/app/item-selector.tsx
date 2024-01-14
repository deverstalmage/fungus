'use client';
import { Item } from "@/db/items";
import styles from './item-selector.module.css';
import ItemCard from "@/app/item-card";
import { useState } from "react";

export default function ItemSelector({ items }: { items: Item[]; }) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const toggleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      const newItems = selectedItems.filter(i => i !== index);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  return (
    <div className={styles.itemList}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.itemSlot} ${selectedItems.includes(i) && styles.selected}`} onClick={() => toggleSelectItem(i)}>
          <ItemCard key={i} item={item} />
        </div>
      ))}
    </div>
  );
}
