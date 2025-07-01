-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "precoCompra" DOUBLE PRECISION NOT NULL,
    "precoVenda" DOUBLE PRECISION NOT NULL,
    "icmsCredito" DOUBLE PRECISION NOT NULL,
    "icmsDebito" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
