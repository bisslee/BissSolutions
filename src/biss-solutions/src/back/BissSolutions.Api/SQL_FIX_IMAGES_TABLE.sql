-- Script para corrigir a tabela Images no banco de dados
-- Execute este script no banco 236_biss antes de rodar a API novamente

USE [236_biss];
GO

-- 1. Remover constraint FK se existir
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Images_Pages_PageId')
BEGIN
    ALTER TABLE [Images] DROP CONSTRAINT [FK_Images_Pages_PageId];
    PRINT 'Constraint FK_Images_Pages_PageId removida';
END

IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Images_Components_ComponentId')
BEGIN
    ALTER TABLE [Images] DROP CONSTRAINT [FK_Images_Components_ComponentId];
    PRINT 'Constraint FK_Images_Components_ComponentId removida temporariamente';
END

-- 2. Deletar a tabela Images completamente para recriar do zero
IF EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Images')
BEGIN
    DROP TABLE [Images];
    PRINT 'Tabela Images deletada. A API criará a tabela corretamente na próxima execução.';
END
ELSE
BEGIN
    PRINT 'Tabela Images não existe. Tudo pronto para a API criar.';
END

GO

