-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GardenPlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "GardenPlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GardenPlot" ("id", "userId") SELECT "id", "userId" FROM "GardenPlot";
DROP TABLE "GardenPlot";
ALTER TABLE "new_GardenPlot" RENAME TO "GardenPlot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
