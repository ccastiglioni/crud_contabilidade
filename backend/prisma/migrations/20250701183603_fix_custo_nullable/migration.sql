/*
  Warnings:

  - Made the column `custoTotal` on table `produto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "produto" ALTER COLUMN "custoTotal" SET NOT NULL,
ALTER COLUMN "custoTotal" SET DEFAULT 0;
