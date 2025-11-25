/*
  Warnings:

  - A unique constraint covering the columns `[actorName]` on the table `actor_to_link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "actor_to_link_actorName_key" ON "actor_to_link"("actorName");
