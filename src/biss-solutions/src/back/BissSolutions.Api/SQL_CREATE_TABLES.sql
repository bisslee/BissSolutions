-- Script SQL para criar as novas tabelas
-- Execute este script no banco de dados se não conseguir aplicar a migration via EF Core

-- Tabela Services
CREATE TABLE [Services] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(200) NOT NULL,
    [Description] nvarchar(2000) NULL,
    [ServiceTypes] nvarchar(max) NULL,
    [Image] nvarchar(500) NULL,
    [Slug] nvarchar(200) NOT NULL,
    [IsNew] bit NOT NULL,
    [FeaturedOnHome] bit NOT NULL,
    [IsActive] bit NOT NULL,
    [Order] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Services] PRIMARY KEY ([Id])
);
GO

CREATE UNIQUE INDEX [IX_Services_Slug] ON [Services] ([Slug]);
GO

-- Tabela Partners
CREATE TABLE [Partners] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(200) NOT NULL,
    [Versions] nvarchar(200) NULL,
    [Description] nvarchar(2000) NULL,
    [ServicesProvided] nvarchar(2000) NULL,
    [Logo] nvarchar(500) NULL,
    [ProjectImage] nvarchar(500) NULL,
    [ProjectLink] nvarchar(500) NULL,
    [Website] nvarchar(500) NULL,
    [IsActive] bit NOT NULL,
    [Order] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Partners] PRIMARY KEY ([Id])
);
GO

-- Tabela Products
CREATE TABLE [Products] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(200) NOT NULL,
    [Description] nvarchar(2000) NULL,
    [CurrentVersion] nvarchar(50) NULL,
    [TechnologyItems] nvarchar(2000) NULL,
    [Features] nvarchar(max) NULL,
    [NugetLink] nvarchar(500) NULL,
    [DocumentationLink] nvarchar(500) NULL,
    [GithubLink] nvarchar(500) NULL,
    [ProductLink] nvarchar(500) NULL,
    [Image] nvarchar(500) NULL,
    [Price] decimal(18,2) NULL,
    [Category] nvarchar(100) NULL,
    [IsActive] bit NOT NULL,
    [Order] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([Id])
);
GO

-- Tabela Companies
CREATE TABLE [Companies] (
    [Id] int NOT NULL IDENTITY,
    [Description] nvarchar(2000) NULL,
    [Mission] nvarchar(2000) NULL,
    [Vision] nvarchar(2000) NULL,
    [Values] nvarchar(2000) NULL,
    [History] nvarchar(max) NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Companies] PRIMARY KEY ([Id])
);
GO

-- Registrar a migration no histórico (IMPORTANTE!)
-- Substitua '20251130020249_AddNewEntitiesTables' pelo timestamp correto
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251130020249_AddNewEntitiesTables', N'10.0.0');
GO

