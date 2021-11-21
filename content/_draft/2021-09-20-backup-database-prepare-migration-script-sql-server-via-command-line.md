---
title: >-
  วิธี Backup Database และเตรียม Migration Script บน SQL Server ด้วย command line
tags:
  - Database
  - Migration
  - SQL Server
  - Windows
uuid: h10x942
unsplashImgCoverId: lRoX0shwjUQ
---

สวัสดีครับ เราคงคุ้นเคยกับโปรแกรม [SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) ที่เป็นโปรแกรมที่ช่วยทำให้เราจัดการข้อมูล SQL Server ได้โดยง่ายโดยที่ไม่จำเป็นต้องใช้ command line ใดๆ เลย

SQL Server Data Tools (SSDT)

setup env vir: C:\Program Files\Microsoft SQL Server\150\DAC\bin

# การ Export Schema และ Data

โดยเราสามารถทำได้เหมือนกับ Export a Data-tier Application ในโปรแกรม SQL Server Management Studio (SSMS) ได้เลย ซึ่ง Extension ไฟล์ที่ได้จะเป็น `.bacpac`

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
