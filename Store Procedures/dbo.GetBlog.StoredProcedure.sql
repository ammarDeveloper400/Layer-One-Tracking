USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[GetBlog]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBlog] --1
@Id int

AS  
BEGIN  
update [Blog] set ViewCount = ViewCount + 1 where Id = @Id

insert into [dbo].[BlogActivityLog] values (SYSDATETIME(), @Id, 1, 0, 0)

select 
  cast(blog.Id as nvarchar) as Id, blog.Title as Title, blog.SubTitle as SubTitle, blog.Description as [Description], blog.ImageUrl as ImageUrl, 
  blog.ViewCount as ViewCount, blog.ReadCount as ReadCount, blog.RecommendCount as RecommendCount, blog.CreatedAt as CreatedAt, blog.IsPublish as IsPublish
  from [Blog] as blog 
  where blog.Id = @Id

END
GO
