-- CreateTable
CREATE TABLE "movies" (
    "role_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("role_id")
);
