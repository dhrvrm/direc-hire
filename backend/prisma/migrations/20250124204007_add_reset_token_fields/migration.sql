/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "College_email_key" ON "College"("email");
