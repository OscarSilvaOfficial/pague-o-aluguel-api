-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('PENDING', 'PAID');

-- CreateTable
CREATE TABLE "Billing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "BillingStatus" NOT NULL,
    "totalOfInstallmentsPaid" DOUBLE PRECISION,
    "totalNumberOfInstallments" INTEGER,
    "billingGrupingId" INTEGER NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingGruping" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BillingGruping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_billingGrupingId_fkey" FOREIGN KEY ("billingGrupingId") REFERENCES "BillingGruping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
