-- CreateTable
CREATE TABLE "Quota_Policy" (
    "QuotaPolicyID" SERIAL NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quota_Policy_pkey" PRIMARY KEY ("QuotaPolicyID")
);

-- CreateTable
CREATE TABLE "Fixed" (
    "FQuotaPolicyID" INTEGER NOT NULL,
    "Quota" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fixed_pkey" PRIMARY KEY ("FQuotaPolicyID")
);

-- CreateTable
CREATE TABLE "Percentage" (
    "PQuotaPolicyID" INTEGER NOT NULL,
    "Percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Percentage_pkey" PRIMARY KEY ("PQuotaPolicyID")
);

-- AddForeignKey
ALTER TABLE "Fixed" ADD CONSTRAINT "Fixed_FQuotaPolicyID_fkey" FOREIGN KEY ("FQuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Percentage" ADD CONSTRAINT "Percentage_PQuotaPolicyID_fkey" FOREIGN KEY ("PQuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE CASCADE ON UPDATE CASCADE;
