USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[GetBlogSetup]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBlogSetup] --1
@Id int

AS  
BEGIN  

select 
  cast(blog.Id as nvarchar) as Id, blog.Title as Title, blog.SubTitle as SubTitle, blog.Description as [Description], blog.ImageUrl as ImageUrl, 
  blog.ViewCount as ViewCount, blog.ReadCount as ReadCount, blog.RecommendCount as RecommendCount, blog.CreatedAt as CreatedAt, blog.IsPublish as IsPublish
  from [Blog] as blog 
  where blog.Id = @Id

END
GO
