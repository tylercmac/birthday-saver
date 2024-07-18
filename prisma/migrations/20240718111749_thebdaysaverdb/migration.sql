-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR NOT NULL,
    "createddate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(6),
    "passwordhash" VARCHAR NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Birthday" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "date" VARCHAR NOT NULL,
    "notes" VARCHAR NOT NULL,
    "stokelevel" INTEGER NOT NULL,
    "createddate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(6),
    "userid" UUID,

    CONSTRAINT "birthday_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_idx" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_un" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "birthday_id_idx" ON "Birthday"("id");

-- CreateIndex
CREATE INDEX "birthday_userid_idx" ON "Birthday"("userid");

-- AddForeignKey
ALTER TABLE "Birthday" ADD CONSTRAINT "birthday_fk" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
