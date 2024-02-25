-- CreateTable
CREATE TABLE "ForageResults" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "itemIds" TEXT NOT NULL,
    "fungusIds" TEXT NOT NULL,
    CONSTRAINT "ForageResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
