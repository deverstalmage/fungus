-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fungus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fungusId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "gardenPlotId" INTEGER,
    "spaceIndex" INTEGER,
    "lastHarvested" BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT "Fungus_gardenPlotId_fkey" FOREIGN KEY ("gardenPlotId") REFERENCES "GardenPlot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Fungus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fungus" ("fungusId", "gardenPlotId", "id", "spaceIndex", "userId") SELECT "fungusId", "gardenPlotId", "id", "spaceIndex", "userId" FROM "Fungus";
DROP TABLE "Fungus";
ALTER TABLE "new_Fungus" RENAME TO "Fungus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
