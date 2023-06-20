-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');

-- CreateEnum
CREATE TYPE "RegisterType" AS ENUM ('Phone', 'Email');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "passwordHash" TEXT,
    "phone" TEXT,
    "roleId" INTEGER NOT NULL,
    "resetChances" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "WechatInfo" (
    "openId" TEXT NOT NULL,
    "unionId" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WechatInfo_pkey" PRIMARY KEY ("openId")
);

-- CreateTable
CREATE TABLE "WechatTicket" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "ticket" TEXT NOT NULL,
    "openId" TEXT,
    "expiredAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "WechatTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitationCode" (
    "code" TEXT NOT NULL,
    "ownerId" INTEGER,

    CONSTRAINT "InvitationCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "InvitationRecord" (
    "id" TEXT NOT NULL,
    "inviterId" INTEGER NOT NULL,
    "inviteeId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "InvitationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "modelId" SERIAL NOT NULL,
    "modelName" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("modelId")
);

-- CreateTable
CREATE TABLE "Prices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Limits" (
    "id" SERIAL NOT NULL,
    "times" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "modelName" TEXT NOT NULL,

    CONSTRAINT "Limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "planId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Redeem" (
    "redeemCode" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3) NOT NULL,
    "activatedBy" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "Redeem_pkey" PRIMARY KEY ("redeemCode")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(6) NOT NULL,
    "redeemCode" TEXT,
    "orderId" TEXT,
    "planId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId")
);

-- CreateTable
CREATE TABLE "RegisterCode" (
    "id" TEXT NOT NULL,
    "type" "RegisterType" NOT NULL,
    "register" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegisterCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenAIKey" (
    "key" TEXT NOT NULL,

    CONSTRAINT "OpenAIKey_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "key" TEXT NOT NULL,
    "value" INTEGER[],

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "WechatInfo_unionId_key" ON "WechatInfo"("unionId");

-- CreateIndex
CREATE UNIQUE INDEX "WechatInfo_userId_key" ON "WechatInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WechatTicket_ticket_key" ON "WechatTicket"("ticket");

-- CreateIndex
CREATE UNIQUE INDEX "InvitationCode_code_ownerId_key" ON "InvitationCode"("code", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "InvitationRecord_inviteeId_key" ON "InvitationRecord"("inviteeId");

-- CreateIndex
CREATE UNIQUE INDEX "Model_modelName_key" ON "Model"("modelName");

-- CreateIndex
CREATE UNIQUE INDEX "Model_modelId_modelName_key" ON "Model"("modelId", "modelName");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_redeemCode_key" ON "Subscription"("redeemCode");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_orderId_key" ON "Subscription"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "RegisterCode_register_key" ON "RegisterCode"("register");

-- CreateIndex
CREATE UNIQUE INDEX "RegisterCode_code_key" ON "RegisterCode"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WechatInfo" ADD CONSTRAINT "WechatInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationCode" ADD CONSTRAINT "InvitationCode_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationRecord" ADD CONSTRAINT "InvitationRecord_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationRecord" ADD CONSTRAINT "InvitationRecord_code_inviterId_fkey" FOREIGN KEY ("code", "inviterId") REFERENCES "InvitationCode"("code", "ownerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limits" ADD CONSTRAINT "Limits_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limits" ADD CONSTRAINT "Limits_modelId_modelName_fkey" FOREIGN KEY ("modelId", "modelName") REFERENCES "Model"("modelId", "modelName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redeem" ADD CONSTRAINT "Redeem_activatedBy_fkey" FOREIGN KEY ("activatedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redeem" ADD CONSTRAINT "Redeem_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_redeemCode_fkey" FOREIGN KEY ("redeemCode") REFERENCES "Redeem"("redeemCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
