-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Shelf" AS ENUM ('TOP', 'EYE', 'MID', 'BOT');

-- CreateEnum
CREATE TYPE "AisleStatus" AS ENUM ('OPEN', 'LOCKED');

-- CreateEnum
CREATE TYPE "FacingStatus" AS ENUM ('OPEN', 'CLAIMED', 'UNCLAIMED');

-- CreateEnum
CREATE TYPE "PurchaseKind" AS ENUM ('CLAIM', 'TAKEOVER', 'MATCH');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TakeoverStatus" AS ENUM ('PENDING', 'MATCHED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Aisle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,
    "status" "AisleStatus" NOT NULL DEFAULT 'LOCKED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aisle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facing" (
    "id" TEXT NOT NULL,
    "aisleId" TEXT NOT NULL,
    "shelf" "Shelf" NOT NULL,
    "position" INTEGER NOT NULL,
    "basePriceCents" INTEGER NOT NULL,
    "currentPriceCents" INTEGER NOT NULL,
    "status" "FacingStatus" NOT NULL DEFAULT 'OPEN',
    "ownerId" TEXT,
    "name" TEXT,
    "tagline" TEXT,
    "url" TEXT,
    "color" TEXT,
    "isFreeListing" BOOLEAN NOT NULL DEFAULT false,
    "isFounding" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "manageToken" TEXT NOT NULL,
    "creditsCents" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "facingId" TEXT NOT NULL,
    "ownerId" TEXT,
    "kind" "PurchaseKind" NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "amountCents" INTEGER NOT NULL,
    "creditsUsedCents" INTEGER NOT NULL DEFAULT 0,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "email" TEXT,
    "companyName" TEXT,
    "companyUrl" TEXT,
    "tagline" TEXT,
    "takeoverId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Takeover" (
    "id" TEXT NOT NULL,
    "facingId" TEXT NOT NULL,
    "challengerId" TEXT NOT NULL,
    "incumbentId" TEXT NOT NULL,
    "bidCents" INTEGER NOT NULL,
    "previousPriceCents" INTEGER NOT NULL,
    "status" "TakeoverStatus" NOT NULL DEFAULT 'PENDING',
    "deadline" TIMESTAMP(3) NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "matchPurchaseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Takeover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditLedger" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "deltaCents" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "refId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStat" (
    "id" TEXT NOT NULL,
    "facingId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "countries" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "DailyStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "facingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "facingId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aisle_slug_key" ON "Aisle"("slug");

-- CreateIndex
CREATE INDEX "Facing_status_idx" ON "Facing"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Facing_aisleId_shelf_position_key" ON "Facing"("aisleId", "shelf", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_manageToken_key" ON "Owner"("manageToken");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_stripeSessionId_key" ON "Purchase"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Takeover_purchaseId_key" ON "Takeover"("purchaseId");

-- CreateIndex
CREATE INDEX "Takeover_status_deadline_idx" ON "Takeover"("status", "deadline");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStat_facingId_date_key" ON "DailyStat"("facingId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_visitorId_facingId_key" ON "CartItem"("visitorId", "facingId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimToken_token_key" ON "ClaimToken"("token");

-- AddForeignKey
ALTER TABLE "Facing" ADD CONSTRAINT "Facing_aisleId_fkey" FOREIGN KEY ("aisleId") REFERENCES "Aisle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facing" ADD CONSTRAINT "Facing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_facingId_fkey" FOREIGN KEY ("facingId") REFERENCES "Facing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takeover" ADD CONSTRAINT "Takeover_facingId_fkey" FOREIGN KEY ("facingId") REFERENCES "Facing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takeover" ADD CONSTRAINT "Takeover_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takeover" ADD CONSTRAINT "Takeover_incumbentId_fkey" FOREIGN KEY ("incumbentId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takeover" ADD CONSTRAINT "Takeover_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStat" ADD CONSTRAINT "DailyStat_facingId_fkey" FOREIGN KEY ("facingId") REFERENCES "Facing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_facingId_fkey" FOREIGN KEY ("facingId") REFERENCES "Facing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimToken" ADD CONSTRAINT "ClaimToken_facingId_fkey" FOREIGN KEY ("facingId") REFERENCES "Facing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

