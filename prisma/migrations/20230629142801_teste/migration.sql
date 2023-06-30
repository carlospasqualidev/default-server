-- DropForeignKey
ALTER TABLE "usersPermissions" DROP CONSTRAINT "usersPermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "usersPermissions" DROP CONSTRAINT "usersPermissions_userId_fkey";

-- AddForeignKey
ALTER TABLE "usersPermissions" ADD CONSTRAINT "usersPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersPermissions" ADD CONSTRAINT "usersPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
