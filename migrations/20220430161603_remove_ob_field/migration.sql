-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_billingGrupingId_fkey";

-- AlterTable
ALTER TABLE "Billing" ALTER COLUMN "billingGrupingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_billingGrupingId_fkey" FOREIGN KEY ("billingGrupingId") REFERENCES "BillingGruping"("id") ON DELETE SET NULL ON UPDATE CASCADE;
