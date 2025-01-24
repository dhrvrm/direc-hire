-- CreateTable
CREATE TABLE "_CollegeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollegeToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CollegeToUser_B_index" ON "_CollegeToUser"("B");

-- AddForeignKey
ALTER TABLE "_CollegeToUser" ADD CONSTRAINT "_CollegeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollegeToUser" ADD CONSTRAINT "_CollegeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
