-- CreateTable
CREATE TABLE "Stop" (
    "StopID" SERIAL NOT NULL,
    "StopName" TEXT NOT NULL,
    "Location" TEXT NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("StopID")
);

-- CreateTable
CREATE TABLE "Route" (
    "RouteID" SERIAL NOT NULL,
    "StartStopID" INTEGER NOT NULL,
    "EndStopID" INTEGER NOT NULL,
    "RouteName" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("RouteID")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "RouteStopID" SERIAL NOT NULL,
    "RouteID" INTEGER NOT NULL,
    "StopID" INTEGER NOT NULL,
    "StopOrder" INTEGER NOT NULL,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("RouteStopID")
);

-- CreateTable
CREATE TABLE "BusAssignment" (
    "BusAssignmentID" SERIAL NOT NULL,
    "BusID" INTEGER NOT NULL,
    "AssignmentDate" TIMESTAMP(3) NOT NULL,
    "Battery" BOOLEAN NOT NULL,
    "Lights" BOOLEAN NOT NULL,
    "Oil" BOOLEAN NOT NULL,
    "Water" BOOLEAN NOT NULL,
    "Break" BOOLEAN NOT NULL,
    "Air" BOOLEAN NOT NULL,
    "Gas" BOOLEAN NOT NULL,
    "Engine" BOOLEAN NOT NULL,
    "TireCondition" BOOLEAN NOT NULL,
    "Self" BOOLEAN NOT NULL,

    CONSTRAINT "BusAssignment_pkey" PRIMARY KEY ("BusAssignmentID")
);

-- CreateTable
CREATE TABLE "RegularBusAssignment" (
    "RegularBusAssignmentID" INTEGER NOT NULL,
    "DriverID" INTEGER NOT NULL,
    "ConductorID" INTEGER NOT NULL,
    "QuotaPolicyID" INTEGER NOT NULL,
    "Change" DOUBLE PRECISION NOT NULL,
    "TripRevenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RegularBusAssignment_pkey" PRIMARY KEY ("RegularBusAssignmentID")
);

-- CreateTable
CREATE TABLE "BusRouteAssignment" (
    "BusRouteAssignmentID" SERIAL NOT NULL,
    "BusAssignmentID" INTEGER NOT NULL,
    "RouteID" INTEGER NOT NULL,

    CONSTRAINT "BusRouteAssignment_pkey" PRIMARY KEY ("BusRouteAssignmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteStop_RouteID_StopID_key" ON "RouteStop"("RouteID", "StopID");

-- CreateIndex
CREATE INDEX "BusAssignment_BusID_idx" ON "BusAssignment"("BusID");

-- CreateIndex
CREATE INDEX "RegularBusAssignment_DriverID_idx" ON "RegularBusAssignment"("DriverID");

-- CreateIndex
CREATE INDEX "RegularBusAssignment_ConductorID_idx" ON "RegularBusAssignment"("ConductorID");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_StartStopID_fkey" FOREIGN KEY ("StartStopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_EndStopID_fkey" FOREIGN KEY ("EndStopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "Route"("RouteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_StopID_fkey" FOREIGN KEY ("StopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularBusAssignment" ADD CONSTRAINT "RegularBusAssignment_RegularBusAssignmentID_fkey" FOREIGN KEY ("RegularBusAssignmentID") REFERENCES "BusAssignment"("BusAssignmentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularBusAssignment" ADD CONSTRAINT "RegularBusAssignment_QuotaPolicyID_fkey" FOREIGN KEY ("QuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRouteAssignment" ADD CONSTRAINT "BusRouteAssignment_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "Route"("RouteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRouteAssignment" ADD CONSTRAINT "BusRouteAssignment_BusAssignmentID_fkey" FOREIGN KEY ("BusAssignmentID") REFERENCES "RegularBusAssignment"("RegularBusAssignmentID") ON DELETE RESTRICT ON UPDATE CASCADE;
