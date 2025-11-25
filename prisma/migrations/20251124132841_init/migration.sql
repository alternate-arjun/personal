-- CreateTable
CREATE TABLE "code_to_link" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "code_to_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actor_to_link" (
    "id" TEXT NOT NULL,
    "actorName" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actor_to_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ph" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "others" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "others_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "code_to_link_code_key" ON "code_to_link"("code");

-- CreateIndex
CREATE UNIQUE INDEX "code_to_link_actorId_key" ON "code_to_link"("actorId");

-- AddForeignKey
ALTER TABLE "code_to_link" ADD CONSTRAINT "code_to_link_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actor_to_link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
