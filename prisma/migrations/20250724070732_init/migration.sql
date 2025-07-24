-- CreateTable
CREATE TABLE "PortLocations" (
    "id" TEXT NOT NULL,
    "portName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PortLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vessels" (
    "id" TEXT NOT NULL,
    "vesselName" TEXT NOT NULL,
    "voyage" TEXT NOT NULL,
    "etd" TIMESTAMP(3) NOT NULL,
    "cutOffDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Vessels_pkey" PRIMARY KEY ("id")
);
