/**
 * @name
 * @description 豆瓣电影本周口碑榜
 * 结合代码优先考虑选取8部电影
 */
// import Parser from 'rss-parser'

// const parser: Parser = new Parser()
import RSSHub from 'rsshub'

enum RSSURL {
  /**
   * movie_weekly_best :一周口碑电影榜
   * tv_weekly_best :一周口碑剧集榜
   * tv_chinese_best_weekly :华语口碑剧集榜
   */
  weekly = '/douban/movie/weekly/movie_weekly_best',
}

export const doubanMovieWeekly = async () => {
  RSSHub.request(RSSURL.weekly)
    .then((res: any) => console.log(res))
    .catch(console.log)
}
