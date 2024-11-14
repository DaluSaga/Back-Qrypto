-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `authProvider` VARCHAR(191) NULL,
    `update_date` DATETIME(3) NULL,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `rolId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('ADMIN', 'CLIENT') NOT NULL,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembershipUser` (
    `id` VARCHAR(191) NOT NULL,
    `quantity_current_use` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,
    `limit_date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `membershipId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MembershipUser_userId_key`(`userId`),
    UNIQUE INDEX `id_membership_user`(`membershipId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membership` (
    `id` VARCHAR(191) NOT NULL,
    `type_membership` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `membership_duration` DATETIME(3) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `active_qrs` INTEGER NOT NULL,
    `scan_qrs` INTEGER NOT NULL,
    `premium_support` BOOLEAN NOT NULL,
    `unlimited_static_qrs` BOOLEAN NOT NULL,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginLogs` (
    `id` VARCHAR(191) NOT NULL,
    `failed_login` INTEGER NULL DEFAULT 0,
    `failed_login_time` DATETIME(3) NULL,
    `created_ip` VARCHAR(191) NOT NULL,
    `update_ip` VARCHAR(191) NULL,
    `login_date` DATETIME(3) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LoginLogs_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreRegister` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `last_pin_generated_at` DATETIME(3) NULL,
    `pin` INTEGER NOT NULL,

    UNIQUE INDEX `PreRegister_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `useAt` DATETIME(3) NOT NULL,
    `rolId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    UNIQUE INDEX `id_rol_permission`(`rolId`, `permissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscountMembership` (
    `id` VARCHAR(191) NOT NULL,
    `membershipId` VARCHAR(191) NOT NULL,
    `discountId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DiscountMembership_membershipId_key`(`membershipId`),
    UNIQUE INDEX `id_discount_membership`(`membershipId`, `discountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` VARCHAR(191) NOT NULL,
    `discount` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `limit_date` DATETIME(3) NULL,
    `use_quantity` INTEGER NULL,
    `quantity_current_use` INTEGER NULL DEFAULT 0,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Qr` (
    `id` VARCHAR(191) NOT NULL,
    `name_qr` VARCHAR(30) NOT NULL,
    `qr` VARCHAR(191) NULL,
    `url` TEXT NULL,
    `state` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,
    `qr_image_base64` MEDIUMBLOB NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `qrDesignId` VARCHAR(191) NOT NULL,
    `qrTypeId` VARCHAR(191) NOT NULL,
    `scan_count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Qr_qrDesignId_key`(`qrDesignId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrType` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrPreview` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `colorTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(300) NULL,
    `descriptionColor` VARCHAR(191) NOT NULL,
    `boxColor` VARCHAR(191) NOT NULL,
    `borderImg` VARCHAR(191) NOT NULL,
    `imgBoxBackgroud` MEDIUMBLOB NULL,
    `backgroudColor` VARCHAR(191) NOT NULL,
    `SelectOptions` JSON NOT NULL,
    `idFontPreview` VARCHAR(191) NULL,
    `qrId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QrPreview_qrId_key`(`qrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FontsPreview` (
    `id` VARCHAR(191) NOT NULL,
    `fontName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImgTemplates` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTemplates` (
    `id` VARCHAR(191) NOT NULL,
    `templateLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuPreview` (
    `id` VARCHAR(191) NOT NULL,
    `restaurantName` VARCHAR(191) NOT NULL,
    `restaurantLogo` VARCHAR(191) NULL,
    `backgroundCard` VARCHAR(191) NOT NULL,
    `colorMenu` VARCHAR(191) NOT NULL,
    `idFontPreview` VARCHAR(191) NULL,
    `idImgTemplate` VARCHAR(191) NULL,
    `idUserTemplate` VARCHAR(191) NULL,
    `category` JSON NOT NULL,
    `qrId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MenuPreview_qrId_key`(`qrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrText` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `position` JSON NOT NULL,
    `colorText` VARCHAR(191) NOT NULL,
    `qrId` VARCHAR(191) NOT NULL,
    `qrTextFontId` VARCHAR(191) NOT NULL,
    `qrTextBubbleId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QrText_qrId_key`(`qrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrTextFont` (
    `id` VARCHAR(191) NOT NULL,
    `fontFamily` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrTextBubble` (
    `id` VARCHAR(191) NOT NULL,
    `bubble` JSON NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrDesign` (
    `id` VARCHAR(191) NOT NULL,
    `frame` VARCHAR(191) NOT NULL,
    `frameColor` VARCHAR(191) NOT NULL,
    `dots` VARCHAR(191) NOT NULL,
    `dotsColor` VARCHAR(191) NOT NULL,
    `cornerSquare` VARCHAR(191) NOT NULL,
    `cornerSquareColor` VARCHAR(191) NOT NULL,
    `cornerDot` VARCHAR(191) NOT NULL,
    `cornerDotColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QrLogo` (
    `id` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `qrId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QrLogo_qrId_key`(`qrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembershipUser` ADD CONSTRAINT `MembershipUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembershipUser` ADD CONSTRAINT `MembershipUser_membershipId_fkey` FOREIGN KEY (`membershipId`) REFERENCES `Membership`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoginLogs` ADD CONSTRAINT `LoginLogs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermission` ADD CONSTRAINT `RolPermission_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermission` ADD CONSTRAINT `RolPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscountMembership` ADD CONSTRAINT `DiscountMembership_membershipId_fkey` FOREIGN KEY (`membershipId`) REFERENCES `Membership`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscountMembership` ADD CONSTRAINT `DiscountMembership_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Qr` ADD CONSTRAINT `Qr_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Qr` ADD CONSTRAINT `Qr_qrDesignId_fkey` FOREIGN KEY (`qrDesignId`) REFERENCES `QrDesign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Qr` ADD CONSTRAINT `Qr_qrTypeId_fkey` FOREIGN KEY (`qrTypeId`) REFERENCES `QrType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrPreview` ADD CONSTRAINT `QrPreview_idFontPreview_fkey` FOREIGN KEY (`idFontPreview`) REFERENCES `FontsPreview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrPreview` ADD CONSTRAINT `QrPreview_qrId_fkey` FOREIGN KEY (`qrId`) REFERENCES `Qr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuPreview` ADD CONSTRAINT `MenuPreview_idFontPreview_fkey` FOREIGN KEY (`idFontPreview`) REFERENCES `FontsPreview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuPreview` ADD CONSTRAINT `MenuPreview_idImgTemplate_fkey` FOREIGN KEY (`idImgTemplate`) REFERENCES `ImgTemplates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuPreview` ADD CONSTRAINT `MenuPreview_idUserTemplate_fkey` FOREIGN KEY (`idUserTemplate`) REFERENCES `UserTemplates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuPreview` ADD CONSTRAINT `MenuPreview_qrId_fkey` FOREIGN KEY (`qrId`) REFERENCES `Qr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrText` ADD CONSTRAINT `QrText_qrId_fkey` FOREIGN KEY (`qrId`) REFERENCES `Qr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrText` ADD CONSTRAINT `QrText_qrTextFontId_fkey` FOREIGN KEY (`qrTextFontId`) REFERENCES `QrTextFont`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrText` ADD CONSTRAINT `QrText_qrTextBubbleId_fkey` FOREIGN KEY (`qrTextBubbleId`) REFERENCES `QrTextBubble`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QrLogo` ADD CONSTRAINT `QrLogo_qrId_fkey` FOREIGN KEY (`qrId`) REFERENCES `Qr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
