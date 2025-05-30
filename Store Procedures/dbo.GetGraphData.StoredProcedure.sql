USE [LayerOne]
GO
/****** Object:  StoredProcedure [dbo].[GetGraphData]    Script Date: 3/20/2023 11:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetGraphData] --1
@initialDaysCount int

AS  
BEGIN  

--select STRING_AGG(concat(MONTH(blog.UpdatedAt),'/', cast(Right(YEAR(blog.UpdatedAt), 2) as nvarchar)), ',') as [Date], 
--  STRING_AGG(blog.ViewCount, ',')  as ViewCount
--  from [Blog] as blog
--  where [CreatedAt] >= DATEADD(day,-15, GETDATE())

select STRING_AGG(concat(DAY(blog.CreatedAt), '/',MONTH(blog.CreatedAt),'/', cast(Right(YEAR(blog.CreatedAt), 2) as nvarchar)), ',') as [Date], 
  STRING_AGG(blog.TotalViewCount, ',')  as TotalViewCount, STRING_AGG(blog.TotalReadCount, ',')  as TotalReadCount,
  STRING_AGG(blog.TotalRecommendCount, ',')  as TotalRecommendCount, sum(blog.TotalViewCount) as SumViewCount, 
  sum(blog.TotalReadCount) as SumReadCount, 
  sum(blog.TotalRecommendCount) as SumRecommendCount
  from (SELECT sum(activityLog.ViewCount) as TotalViewCount, sum(activityLog.ReadCount) as TotalReadCount, 
  sum(activityLog.RecommendCount) as TotalRecommendCount, CONVERT(date, CreatedAt, 101) as CreatedAt
  FROM [dbo].[BlogActivityLog] as activityLog
  GROUP BY CONVERT(date, CreatedAt, 101)) as blog
  where [CreatedAt] >= DATEADD(day,-@initialDaysCount, GETDATE())

--SELECT 
--  STUFF(
--    (
--      SELECT 
--        ',' + CONVERT(
--          varchar, 
--          concat(
--            MONTH(blog.CreatedAt), 
--            '/', 
--            cast(
--              Right(
--                YEAR(blog.CreatedAt), 
--                2
--              ) as nvarchar
--            )
--          )
--        ) 
--      FROM 
--        (
--          SELECT 
--            sum(activityLog.ViewCount) as TotalViewCount, 
--            sum(activityLog.ReadCount) as TotalReadCount, 
--            sum(activityLog.RecommendCount) as TotalRecommendCount, 
--            CONVERT(date, CreatedAt, 101) as CreatedAt 
--          FROM 
--            [dbo].[BlogActivityLog] as activityLog 
--          GROUP BY 
--            CONVERT(date, CreatedAt, 101)
--        ) as blog 
--      where 
--        [CreatedAt] >= DATEADD(
--          day, 
--          -15, 
--          GETDATE()
--        ) FOR XML PATH('')
--    ), 
--    1, 
--    1, 
--    ''
--  ) as [Date], 
--  STUFF(
--    (
--      SELECT 
--        ',' + CONVERT(varchar, blog.TotalViewCount) 
--      FROM 
--        (
--          SELECT 
--            sum(activityLog.ViewCount) as TotalViewCount, 
--            sum(activityLog.ReadCount) as TotalReadCount, 
--            sum(activityLog.RecommendCount) as TotalRecommendCount, 
--            CONVERT(date, CreatedAt, 101) as CreatedAt 
--          FROM 
--            [dbo].[BlogActivityLog] as activityLog 
--          GROUP BY 
--            CONVERT(date, CreatedAt, 101)
--        ) as blog 
--      where 
--        [CreatedAt] >= DATEADD(
--          day, 
--          -15, 
--          GETDATE()
--        ) FOR XML PATH('')
--    ), 
--    1, 
--    1, 
--    ''
--  ) as TotalViewCount, 
--  STUFF(
--    (
--      SELECT 
--        ',' + CONVERT(varchar, blog.TotalReadCount) 
--      FROM 
--        (
--          SELECT 
--            sum(activityLog.ViewCount) as TotalViewCount, 
--            sum(activityLog.ReadCount) as TotalReadCount, 
--            sum(activityLog.RecommendCount) as TotalRecommendCount, 
--            CONVERT(date, CreatedAt, 101) as CreatedAt 
--          FROM 
--            [dbo].[BlogActivityLog] as activityLog 
--          GROUP BY 
--            CONVERT(date, CreatedAt, 101)
--        ) as blog 
--      where 
--        [CreatedAt] >= DATEADD(
--          day, 
--          -15, 
--          GETDATE()
--        ) FOR XML PATH('')
--    ), 
--    1, 
--    1, 
--    ''
--  ) as TotalReadCount, 
--  STUFF(
--    (
--      SELECT 
--        ',' + CONVERT(
--          varchar, blog.TotalRecommendCount
--        ) 
--      FROM 
--        (
--          SELECT 
--            sum(activityLog.ViewCount) as TotalViewCount, 
--            sum(activityLog.ReadCount) as TotalReadCount, 
--            sum(activityLog.RecommendCount) as TotalRecommendCount, 
--            CONVERT(date, CreatedAt, 101) as CreatedAt 
--          FROM 
--            [dbo].[BlogActivityLog] as activityLog 
--          GROUP BY 
--            CONVERT(date, CreatedAt, 101)
--        ) as blog 
--      where 
--        [CreatedAt] >= DATEADD(
--          day, 
--          -15, 
--          GETDATE()
--        ) FOR XML PATH('')
--    ), 
--    1, 
--    1, 
--    ''
--  ) as TotalRecommendCount,
--  sum(blogActivity.ViewCount) as SumViewCount, sum(blogActivity.ReadCount) as SumReadCount, 
--  sum(blogActivity.RecommendCount) as SumRecommendCount
--  from [BlogActivityLog] as blogActivity 


END
GO
