---
title: >-
  วิธี Backup Database และเตรียม Migration Script บน SQL Server ด้วย command
  line
tags:
  - Database
  - Migration
  - SQL Server
  - Windows
uuid: h10x942
unsplashImgCoverId: lRoX0shwjUQ
---

SQL Server Management Studio (SSMS)

SQL Server Data Tools (SSDT)

setup env vir: C:\Program Files\Microsoft SQL Server\150\DAC\bin

# Export

schema + Data

Ext: `.bacpac`

```powershell
sqlpackage /Action:Export /SourceConnectionString:"Data Source=.\SQLEXPRESS; Initial Catalog=TestDB; Integrated Security=True" /TargetFile:"D:\auto-deployment\database_backup.bacpac"
```

# Import

```powershell
sqlpackage /Action:Import /TargetConnectionString:"Data Source=.\SQLEXPRESS; Initial Catalog=Imported_TestDB; Integrated Security=True" /SourceFile:"D:\auto-deployment\database_backup.bacpac"
```

# Extract

Extract action creates a schema, not including data

Ext: Data-Tier Application File `.dacpac`

```powershell
sqlpackage /Action:Extract /SourceConnectionString:"Data Source=.\SQLEXPRESS; Initial Catalog=TestDB; Integrated Security=True" /TargetFile:"D:\auto-deployment\database_schema.dacpac"
```

# DeployReport

Generate Diff Report

SourceFile must be `dacpac`

```powershell
sqlpackage /Action:DeployReport /OutputPath:"D:\auto-deployment\report.xml" /OverwriteFiles:True /SourceFile:"D:\auto-deployment\TestDatabase\Snapshots\TestDatabase_20210916_17-58-02.dacpac" /TargetConnectionString:"Data Source=.\SQLEXPRESS; Initial Catalog=TestDB; Integrated Security=True"
```

# Script

```powershell
sqlpackage /Action:Script /OutputPath:"D:\auto-deployment\migration.sql" /OverwriteFiles:True /SourceFile:"D:\auto-deployment\TestDatabase\Snapshots\TestDatabase_20210916_17-58-02.dacpac" /TargetConnectionString:"Data Source=.\SQLEXPRESS; Initial Catalog=TestDB; Integrated Security=True"
```

# Ref

[https://www.mssqltips.com/sqlservertip/4759/sql-server-database-schema-synchronization-via-sqlpackageexe-and-powershell/](https://www.mssqltips.com/sqlservertip/4759/sql-server-database-schema-synchronization-via-sqlpackageexe-and-powershell/)

[https://stackoverflow.com/questions/20673516/command-line-api-for-schema-compare-in-ssdt-sql-server-database-project](https://stackoverflow.com/questions/20673516/command-line-api-for-schema-compare-in-ssdt-sql-server-database-project)

How to: Create a New Database Project: [https://docs.microsoft.com/en-us/sql/ssdt/how-to-create-a-new-database-project?view=sql-server-ver15](https://docs.microsoft.com/en-us/sql/ssdt/how-to-create-a-new-database-project?view=sql-server-ver15)
