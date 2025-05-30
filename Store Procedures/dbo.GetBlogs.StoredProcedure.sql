USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[GetBlogs]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetBlogs] --10,0,'', ''
@DisplayLength int,  
@DisplayStart int,
@Search nvarchar(100),
@IsPublish nvarchar(3)

AS  
BEGIN  
;With Result as   
 (  
  select ROW_NUMBER() over(order by blog.Id desc
  ) as RowNo, Count(*) over() Total,
  blog.Id as Id, blog.Title as Title, blog.SubTitle as SubTitle, blog.Description as [Description], blog.ImageUrl as ImageUrl, 
  blog.ViewCount as ViewCount, blog.ReadCount as ReadCount, blog.RecommendCount as RecommendCount, blog.CreatedAt as CreatedAt, blog.IsPublish as IsPublish
  from [Blog] as blog 
  where
  (NULLIF(@Search, '') is NULL or (blog.Title like '%'+@Search+'%')) 
  and (NULLIF(@IsPublish, '') is NULL or (blog.IsPublish = @IsPublish)) and blog.IsDelete = 0
 )  
select TOP (case @DisplayLength when -1 then (Select Count(*) from Result) else @DisplayLength end) *, DisableButton = (CASE WHEN result.Total <= @DisplayLength THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END) from Result as result where RowNo > @DisplayStart  
END


GO
