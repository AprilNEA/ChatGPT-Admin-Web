/*
  Warnings:

  - You are about to drop the column `deleted` on the `ChatMessage` table. All the data in the column will be lost.
  - The primary key for the `OpenAIKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Setting` table. All the data in the column will be lost.
  - The `value` column on the `Setting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `RateLimit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key]` on the table `OpenAIKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OpenAIKeyStatus" AS ENUM ('Active', 'Disabled', 'Expired');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OAuthProvider" ADD VALUE 'Apple';
ALTER TYPE "OAuthProvider" ADD VALUE 'Google';
ALTER TYPE "OAuthProvider" ADD VALUE 'Microsofe';

-- DropIndex
DROP INDEX "Setting_key_key";

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sortOrder" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sortOrder" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "deleted",
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "sortOrder" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OpenAIKey" DROP CONSTRAINT "OpenAIKey_pkey",
ADD COLUMN     "expiredAt" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "priceRatio" DOUBLE PRECISION,
ADD COLUMN     "rateLimit" INTEGER,
ADD COLUMN     "status" "OpenAIKeyStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN     "tokenUsage" DOUBLE PRECISION,
ADD COLUMN     "total" DOUBLE PRECISION,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "usage" DOUBLE PRECISION,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "weight" DROP DEFAULT,
ADD CONSTRAINT "OpenAIKey_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sortOrder" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
DROP COLUMN "value",
ADD COLUMN     "value" JSONB,
ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("key");

-- DropTable
DROP TABLE "RateLimit";

-- CreateTable
CREATE TABLE "Cache" (
    "key" TEXT NOT NULL,
    "value" JSONB,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenAIKey_key_key" ON "OpenAIKey"("key");
