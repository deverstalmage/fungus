import { CombinedFungus, Fungus, DbFungus, getFungus } from "@/db/fungi";

export default function combineFungusRecord(r: DbFungus): Fungus {
  return { uid: r.id, lastHarvested: r.lastHarvested, spaceIndex: r.spaceIndex, growthMediumItemId: r.growthMediumItemId, fungusId: r.fungusId, ...getFungus(r.fungusId) };
}