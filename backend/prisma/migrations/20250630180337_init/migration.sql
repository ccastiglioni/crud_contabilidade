/*
  Warnings:

  - Made the column `clienteId` on table `venda` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "clienteId" SET NOT NULL;
