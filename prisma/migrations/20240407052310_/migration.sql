/*
  Warnings:

  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_pw` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_name`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `hashed_pw` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_id` VARCHAR(191) NOT NULL;
