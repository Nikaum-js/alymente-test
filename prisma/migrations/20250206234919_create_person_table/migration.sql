-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_cpf_key" ON "persons"("cpf");
