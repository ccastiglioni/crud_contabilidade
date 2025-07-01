/*
  Warnings:

  - Added the required column `quantidade` to the `compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compra" ADD COLUMN     "quantidade" INTEGER NOT NULL,
ADD COLUMN     "valor" INTEGER NOT NULL;
