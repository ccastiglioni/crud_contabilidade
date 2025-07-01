/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Compra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fornecedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_fornecedorId_fkey";

-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_produtoId_fkey";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Compra";

-- DropTable
DROP TABLE "Fornecedor";

-- DropTable
DROP TABLE "Produto";

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "precoCompra" DOUBLE PRECISION NOT NULL,
    "precoVenda" DOUBLE PRECISION NOT NULL,
    "icmsCredito" DOUBLE PRECISION NOT NULL,
    "icmsDebito" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedor" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compra" (
    "id" SERIAL NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "icms" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
