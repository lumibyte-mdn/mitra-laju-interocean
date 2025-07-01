-- CreateEnum
CREATE TYPE "ShipmentType" AS ENUM ('DOMESTIC', 'EXPORT', 'IMPORT');

-- CreateTable
CREATE TABLE "Shipments" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "shipper" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "customerCode" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "shipmentType" "ShipmentType" NOT NULL,
    "estimatedDate" TIMESTAMP(3) NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,

    CONSTRAINT "Shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costings" (
    "id" SERIAL NOT NULL,
    "shipmentId" INTEGER NOT NULL,
    "vendorName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" INTEGER NOT NULL,
    "localFee" INTEGER NOT NULL,
    "freight" INTEGER NOT NULL,
    "subCosting" INTEGER NOT NULL,
    "reimbursement" INTEGER NOT NULL,
    "vat" BOOLEAN NOT NULL,
    "incomeTax" BOOLEAN NOT NULL,
    "freightPaymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Costings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipments_orderNumber_key" ON "Shipments"("orderNumber");

-- AddForeignKey
ALTER TABLE "Costings" ADD CONSTRAINT "Costings_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
