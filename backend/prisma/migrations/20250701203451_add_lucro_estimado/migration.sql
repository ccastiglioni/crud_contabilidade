/*
  Warnings:

  - You are about to drop the column `custoTotal` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produto" DROP COLUMN "custoTotal",
ADD COLUMN     "lucroEstimado" DOUBLE PRECISION;
