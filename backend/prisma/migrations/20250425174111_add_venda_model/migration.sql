-- CreateTable
CREATE TABLE "venda" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "icms" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "venda"
ADD COLUMN "clienteId" INTEGER;

ALTER TABLE "venda"
ADD CONSTRAINT "venda_clienteId_fkey"
FOREIGN KEY ("clienteId") REFERENCES "cliente"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;