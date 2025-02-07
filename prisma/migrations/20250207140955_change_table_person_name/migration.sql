/*
  Warnings:

  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "persons";

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- CreateIndex
CREATE UNIQUE INDEX "people_cpf_key" ON "people"("cpf");
