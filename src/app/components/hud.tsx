'use client'
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function HUD() {
  const [energy] = useLocalStorage('energy', 100);

  return (
    <div>
      <p>Energy [ {energy} / 100 ]</p>
    </div>
  );
}