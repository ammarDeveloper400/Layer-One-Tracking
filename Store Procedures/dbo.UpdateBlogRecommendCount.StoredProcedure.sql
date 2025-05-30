USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[UpdateBlogRecommendCount]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateBlogRecommendCount] --1
@Id int

AS  
BEGIN  
update [Blog] set RecommendCount = RecommendCount + 1 where Id = @Id
insert into [dbo].[BlogActivityLog] values (SYSDATETIME(), @Id, 0, 0, 1)
END
GO
