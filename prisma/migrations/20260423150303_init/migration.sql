-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "logoText" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "heroTitle1" TEXT NOT NULL,
    "heroTitle2" TEXT NOT NULL,
    "heroPhotoPath" TEXT,
    "aboutText" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "baseLocation" TEXT NOT NULL,
    "cvPath" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "thumbnailPath" TEXT,
    "imagePath" TEXT,
    "excelPath" TEXT,
    "excelPreviewJson" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "thumbnailPath" TEXT,
    "htmlFilePath" TEXT,
    "renderedHtml" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "linkedinId" TEXT NOT NULL,
    "linkedinName" TEXT NOT NULL,
    "linkedinEmail" TEXT,
    "linkedinAvatar" TEXT,
    "linkedinTitle" TEXT,
    "linkedinUrl" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
