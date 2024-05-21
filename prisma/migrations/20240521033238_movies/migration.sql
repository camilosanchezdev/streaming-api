/*
  Warnings:

  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
DROP COLUMN "role_id",
ADD COLUMN     "movie_id" SERIAL NOT NULL,
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id");
