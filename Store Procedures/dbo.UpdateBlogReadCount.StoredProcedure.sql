USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[UpdateBlogReadCount]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateBlogReadCount] --1
@Id int

AS  
BEGIN  
update [Blog] set ReadCount = ReadCount + 1 where Id = @Id
insert into [dbo].[BlogActivityLog] values (SYSDATETIME(), @Id, 0, 1, 0)
END
GO
