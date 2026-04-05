USE [master];
GO

CREATE LOGIN [stats_reader] WITH PASSWORD = 'תבחרו-ססמא';
GO

USE [ticket_system];
GO

CREATE USER [stats_reader] FOR LOGIN [stats_reader];
GO

ALTER ROLE [db_datareader] ADD MEMBER [stats_reader];
GO

DENY INSERT, UPDATE, DELETE, ALTER ON SCHEMA :: [dbo] TO [stats_reader];
GO

PRINT 'Read-only user [stats_reader] created successfully.';
GO
