-- Run this script on the SQL Server as an admin (sa or sysadmin)
-- Creates a read-only user for the stats microservice

-- 1. Create server login
USE [master];
GO

CREATE LOGIN [stats_reader] WITH PASSWORD = 'תבחרו-ססמא';
GO

-- 2. Create database user mapped to the login
USE [ticket_system];
GO

CREATE USER [stats_reader] FOR LOGIN [stats_reader];
GO

-- 3. Grant read-only access
ALTER ROLE [db_datareader] ADD MEMBER [stats_reader];
GO

-- 4. Explicitly deny write permissions (defense in depth)
DENY INSERT, UPDATE, DELETE, ALTER ON SCHEMA :: [dbo] TO [stats_reader];
GO

PRINT 'Read-only user [stats_reader] created successfully.';
GO
