/**
 * 视频数据配置
 *
 * 【重要】关于视频资源地址：
 *
 * 腾讯云 COS 下载模式（当前使用）：
 *   视频存储在腾讯云 COS 存储桶，可使用以下格式：
 *     - cloud:// 文件 ID：'cloud://cloud1-xxx/sss儿歌/xxx.mp4'
 *     - COS 直链：'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/xxx.mp4'
 *   播放时通过 COS SDK (cos-wx-sdk-v5) 签名并下载到本地临时文件再播放。
 *   配置在 utils/cosConfig.js 中
 *
 */

export default {
  // 分类标签
  categories: [
    { id: 'setting', name: '设置' },
    { id: 'l0', name: 'L0英语儿歌', active: true },
    { id: 'l1', name: 'L1开口动画' },
    { id: 'l2', name: 'L2基础动画' },
    { id: 'l3', name: 'L3进阶动画' },
    { id: 'l4', name: 'L4高阶动画' },
    { id: 'science', name: '科学百科' },
  ],

  // 视频系列列表
  series: [
    {
      id: 1,
      title: 'Letter of the Day 原版',
      cover: '/static/covers/LetteroftheDay.jpg', // 封面图路径
      episodeCount: 26,
      categoryId: 'l0',
      // 视频列表 - 每集的视频地址
      episodes: [
        {
          id: 1,
          title: '1、Letter Of The Day A',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/A.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 2,
          title: '2、Letter Of The Day B',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/B.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 3,
          title: '3、Letter Of The Day C',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/C.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 4,
          title: '4、Letter Of The Day D',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/D.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 5,
          title: '5、Letter Of The Day E',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/E.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 6,
          title: '6、Letter Of The Day F',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/F.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 7,
          title: '7、Letter Of The Day G',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/G.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 8,
          title: '8、Letter Of The Day H',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/H.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 9,
          title: '9、Letter Of The Day I',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/I.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 10,
          title: '10、Letter Of The Day J',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/J.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 11,
          title: '11、Letter Of The Day K',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/K.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 12,
          title: '12、Letter Of The Day L',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/L.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 13,
          title: '13、Letter Of The Day M',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/M.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 14,
          title: '14、Letter Of The Day N',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/N.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 15,
          title: '15、Letter Of The Day O',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/O.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 16,
          title: '16、Letter Of The Day P',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/P.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 17,
          title: '17、Letter Of The Day Q',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/Q.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 18,
          title: '18、Letter Of The Day R',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/R.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 19,
          title: '19、Letter Of The Day S',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/S.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 20,
          title: '20、Letter Of The Day T',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/T.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 21,
          title: '21、Letter Of The Day U',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/U.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 22,
          title: '22、Letter Of The Day V',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/V.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 23,
          title: '23、Letter Of The Day W',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/W.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 24,
          title: '24、Letter Of The Day X',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/X.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 25,
          title: '25、Letter Of The Day Y',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/Y.mp4',
          cover: '/static/covers/letter-day.png',
        },
        {
          id: 26,
          title: '26、Letter Of The Day Z',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/Z.mp4',
          cover: '/static/covers/letter-day.png',
        },
      ],
    },
    {
      id: 2,
      title: '天线宝宝',
      cover: '/static/covers/txbb.jpeg',
      episodeCount: 22,
      categoryId: 'l0',
      episodes: [
        {
          id: 1,
          title: '1、天线宝宝第一季-01集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-01%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 2,
          title: '2、天线宝宝第一季-02集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-02%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 3,
          title: '3、天线宝宝第一季-03集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-03%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 4,
          title: '4、天线宝宝第一季-04集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-04%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 5,
          title: '5、天线宝宝第一季-05集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-05%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 6,
          title: '6、天线宝宝第一季-06集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-06%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 7,
          title: '7、天线宝宝第一季-07集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-07%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 8,
          title: '8、天线宝宝第一季-08集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-08%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 9,
          title: '9、天线宝宝第一季-09集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-09%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 10,
          title: '10、天线宝宝第一季-10集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-10%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 11,
          title: '11、天线宝宝第一季-11集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-11%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 12,
          title: '12、天线宝宝第一季-12集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-12%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 13,
          title: '13、天线宝宝第一季-13集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-13%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 14,
          title: '14、天线宝宝第一季-14集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-14%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 15,
          title: '15、天线宝宝第一季-15集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-15%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 16,
          title: '16、天线宝宝第一季-16集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-16%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 17,
          title: '17、天线宝宝第一季-17集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-17%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 18,
          title: '18、天线宝宝第一季-18集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-18%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 19,
          title: '19、天线宝宝第一季-19集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-19%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 20,
          title: '20、天线宝宝第一季-20集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-20%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 21,
          title: '21、天线宝宝第一季-21集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-21%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
        {
          id: 22,
          title: '22、天线宝宝第一季-22集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D/%E5%A4%A9%E7%BA%BF%E5%AE%9D%E5%AE%9D%E7%AC%AC%E4%B8%80%E5%AD%A3-22%E9%9B%86.mp4',
          cover: '/static/covers/txbb.jpeg',
        },
      ],
    },
    {
      id: 3,
      title: 'SSS儿歌',
      cover: '/static/covers/sss.jpeg',
      episodeCount: 100,
      categoryId: 'l0',
      episodes: [
        {
          id: 1,
          title: '1、Line Up',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/1_Line Up Children,s Song Finny the Shark.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 2,
          title: '2、This Is A Happy Face',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/2_This Is A Happy Face ft Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 3,
          title: '3、As Quiet As A Mouse',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/3_As Quiet As A Mouse Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 4,
          title: '4、Who Took The Cookie',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/4_Who Took The Cookie (Under The Sea) Kids Songs Finny The Shark.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 5,
          title: '5、The Months Chant',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/5_The Months Chant ft The Super Simple Puppets Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 6,
          title: '6、Put On Your Boots',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/6_Put On Your Boots Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 7,
          title: '7、The Alphabet Swing',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/7_The Alphabet Swing ABC Song for Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 8,
          title: '8、Goldilocks And The Three Bears',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/8_Goldilocks And The Three Bears A Super Simple Storybook.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 9,
          title: '9、Little Snowflake',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/9_Little Snowflake Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 10,
          title: "10、Let's Go For A Walk Outside",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/10_Let,s Go For A Walk Outside Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 11,
          title: '11、Everything Is Going To Be Alright',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/11_Everything Is Going To Be Alright Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 12,
          title: '12、Me!',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/12_Me! featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 13,
          title: '13、Move!',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/13_Move! Dance Song for Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 14,
          title: '14、Three Little Kittens',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/14_Three Little Kittens Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 15,
          title: '15、Star Light, Star Bright',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/15_Star Light, Star Bright Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 16,
          title: '16、Noodle & Pals ABCs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/16_Noodle_Pals ABCs Alphabet for Kids Super Simple Storybook.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 17,
          title: '17、Butterfly Ladybug Bumblebee',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/17_Butterfly Ladybug Bumblebee Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 18,
          title: "18、Let's Count To 100",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/18_Let,s Count To 100 ft Finny the Shark Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 19,
          title: '19、And The Green Grass Grew',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/19_And The Green Grass Grew Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 20,
          title: '20、My Happy Song',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/20_My Happy Song featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 21,
          title: '21、Here Is The Beehive',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/21_Here Is The Beehive Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 22,
          title: '22、Are You Sleeping, Baby Bear?',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/22_Are You Sleeping, Baby Bear Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 23,
          title: '23、Hello Reindeer, Goodbye Snowman',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/23_Hello Reindeer, Goodbye Snowman ft Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 24,
          title: '24、The Bees Go Buzzing',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/24_The Bees Go Buzzing Kids Songs The Bumble Nums.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 25,
          title: '25、The Wheels On The Bus',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/25_The Wheels On The Bus, Mr Monkey, Monkey Mechanic version.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 26,
          title: '26、Five Little Elves',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/26_Five Little Elves Christmas Song For Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 27,
          title: '27、Peekaboo, Thank You!',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/27_Peekaboo, Thank You! Kids Song Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 28,
          title: "28、Let's Count To 100 (Finny)",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/28_Let,s Count To 100 Finny The Shark Songs for Kids.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 29,
          title: '29、The Alphabet Song',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/29_The Alphabet Song ABCs Song for Kids.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 30,
          title: "30、Let's Go For A Walk Outside II",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/30_Let,s Go For A Walk Outside Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 31,
          title: '31、Beddy-Bye Butterfly',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/31_Beddy Bye Butterfly ft Lulu and Juno from Twinkle Twinkle Little Star A Super Simple Storybook.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 32,
          title: '32、Everything Is Going To Be Alright II',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/32_Everything Is Going To Be Alright Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 33,
          title: '33、Me! (feat. Noodle & Pals)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/33_Me! featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 34,
          title: '34、Move! (feat. Noodle & Pals)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/34_Move! Dance Song for Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 35,
          title: '35、Once I Caught A Fish Alive Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/35_Once I Caught A Fish Alive Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 36,
          title: '36、My Yellow Car Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/36_My Yellow Car Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 37,
          title:
            '37、The Alphabet Chant (Live Action) Learn the Alphabet with ASL',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/37_The Alphabet Chant (Live Action) Learn the Alphabet with ASL.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 38,
          title: '38、Let,s Count To 100 ft Finny the Shark Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/38_Let,s Count To 100 ft Finny the Shark Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 39,
          title: '39、Star Light, Star Bright Kids Songs Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/39_Star Light, Star Bright Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 40,
          title:
            '40、The Alphabet Is So Much Fun! ABCs Songs for Kids Super Simple ABCs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/40_The Alphabet Is So Much Fun! ABCs Songs for Kids Super Simple ABCs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 41,
          title: '41、Peekaboo, Where Are You A Super Simple Storybook',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/41_Peekaboo, Where Are You A Super Simple Storybook.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 42,
          title:
            '42、Red Light, Green Light, Carl,s Car Wash Version Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/42_Red Light, Green Light, Carl,s Car Wash Version Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 43,
          title:
            '43、The Wheels On The Bus ft Carl,s Car Wash Super Simple Songs',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/43_The Wheels On The Bus ft Carl,s Car Wash Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 44,
          title: '44、Pink Purple Orange Brown ft. The Bumble Nums',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/44_Pink Purple Orange Brown ft, The Bumble Nums.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 45,
          title: '45、Twinkle Twinkle Little Star (Bumble Nums Version)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/45_Twinkle Twinkle Little Star (Bumble Nums Version) Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 46,
          title: '46、Finny The Shark Episode 1 Play Date',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/46_Finny The Shark Episode 1 Play Date, Finny The Shark.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 47,
          title: '47、Knock Knock Trick Or Treat 2',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/47_Knock Knock Trick Or Treat _2 featuring Super Simple Puppets Halloween Song for Kids.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 48,
          title: '48、Hello, Trick Or Treat',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/48_Hello, Trick Or Treat Halloween Song for Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 49,
          title: '49、Halloween ABC Song',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/49_Halloween ABC Song Halloween Alphabet Song for Kids Super Simple ABCs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 50,
          title: '50、Five Little Ghosts',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/50_Five Little Ghosts Halloween Song for Kids Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 51,
          title: '51、See You Later, Alligator',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/51_See You Later, Alligator _ Featuring Super Simple Puppets Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 52,
          title: '52、Twinkle Twinkle Little Star (Bumble Nums)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/52_Twinkle Twinkle Little Star Nursery Rhymes The Bumble Nums.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 53,
          title: '53、Pizza Party',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/53_Pizza Party Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 54,
          title: '54、Butterfly Ladybug Bumblebee',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/54_Butterfly Ladybug Bumblebee Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 55,
          title: '55、And The Green Grass Grew',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/55_And The Green Grass Grew Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 56,
          title: '56、Hello Little Baby Sparrows',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/56_Hello Little Baby Sparrows Original Kids Song from Treetop Family.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 57,
          title: '57、Down In The Deep Blue Sea',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/57_Down In The Deep Blue Sea ft Finny The Shark! Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 58,
          title: '58、10 Little Fishies Finny The Shark',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/58_10 Little Fishies Finny The Shark.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 59,
          title: "59、There's A Hole In The Bottom Of The Sea",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/59_There,s A Hole In The Bottom Of The Sea Finny The Shark.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 60,
          title: '60、My Happy Song featuring Noodle & Pals',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/60_My Happy Song featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 61,
          title: '61、Are You Sleeping, Baby Bear',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/61_Are You Sleeping, Baby Bear Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 62,
          title: '62、Twinkle Twinkle Little Star',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/62_Twinkle Twinkle Little Star.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 63,
          title: "63、What's Your Name (Puppets version)",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/63_What,s Your Name (Super Simple Puppets version) Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 64,
          title: '64、I Love The Mountains',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/64_I Love The Mountains Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 65,
          title: '65、Baby Shark featuring Finny The Shark',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/65_Baby Shark featuring Finny The Shark Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 66,
          title: '66、Pop The Bubbles',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/66_Pop The Bubbles Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 67,
          title: '67、Five Little Ducks',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/67_Five Little Ducks Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 68,
          title: '68、Treetop Family Theme Song',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/68_Treetop Family Theme Song Song For Kids.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 69,
          title: '69、Here Comes The Fire Truck',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/69_Here Comes The Fire Truck Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 70,
          title: '70、Hello Hello! (Super Simple Puppets)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/70_Hello Hello! featuring The Super Simple Puppets.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 71,
          title: '71、Line Up! featuring Noodle & Pals',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/71_Line Up! featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 72,
          title: '72、Head Shoulders Knees And Toes',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/72_Head Shoulders Knees And Toes Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 73,
          title: '73、The Bear Went Over The Mountain',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/73_The Bear Went Over The Mountain Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 74,
          title: '74、Hello! (Super Simple Puppets)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/74_Hello! featuring The Super Simple Puppets Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 75,
          title: "75、Here Is The Beehive (Caitie's Classroom)",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/75_Here Is The Beehive featuring Caitie Nursery Rhymes from Caitie,s Classroom.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 76,
          title: '76、Open Shut Them #4',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/76_Open Shut Them _4 Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 77,
          title: '77、Halloween ABC Song',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/77_Halloween ABC Song Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 78,
          title: '78、This Is The Way We Trick Or Treat',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/78_This Is The Way We Trick Or Treat featuring The Super Simple Puppets.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 79,
          title: '79、Knock Knock, Trick Or Treat (Puppets)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/79_Knock Knock, Trick Or Treat featuring The Super Simple Puppets Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 80,
          title: '80、10 Monsters In The Bed',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/80_10 Monsters In The Bed Kids Halloween Song Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 81,
          title: '81、This Is The Way',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/81_This Is The Way Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 82,
          title: '82、The More We Get Together',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/82_The More We Get Together Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 83,
          title: '83、Walking In The Forest',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/83_Walking In The Forest Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 84,
          title: "84、What's Your Favorite Flavor Of Ice Cream",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/84_What\u2019s Your Favorite Flavor Of Ice Cream Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 85,
          title: '85、Open Shut Them #3 (Finny The Shark)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/85_Open Shut Them _3 featuring Finny The Shark Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 86,
          title: "86、Baby Shark (Caitie's Classroom)",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/86_Baby Shark featuring Caitie Nursery Rhymes from Caitie,s Classroom.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 87,
          title: '87、Sitting On The Potty',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/87_Sitting On The Potty Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 88,
          title: '88、Where Is Baby',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/88_Where Is Baby Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 89,
          title: '89、Peekaboo, I Love You',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/89_Peekaboo, I Love You Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 90,
          title: '90、The Jellyfish',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/90_The Jellyfish Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 91,
          title: '91、Driving In My Car',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/91_Driving In My Car Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 92,
          title: '92、With My Heart',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/92_With My Heart Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 93,
          title: '93、Head Shoulders Knees And Toes (2019)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/93_Head Shoulders Knees And Toes (2019) Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 94,
          title: '94、Six In The Bed',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/94_Six In The Bed Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 95,
          title: '95、Do You Like Broccoli Ice Cream (Puppets)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/95_Do You Like Broccoli Ice Cream featuring The Super Simple Puppets Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 96,
          title: '96、The Wheels On The Bus (2019)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/96_The Wheels On The Bus (2019) Nursery Rhymes Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 97,
          title: '97、Skidamarink A Dink A Dink',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/97_Skidamarink A Dink A Dink Nursery Rhyme Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 98,
          title: '98、The Toilet Song (The Wiggles)',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/98_The Toilet Song by The Wiggles Animation by Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 99,
          title: "99、If You're Happy And You Know It",
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/99_If You\u2019re Happy And You Know It Kids Songs Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
        {
          id: 100,
          title: '100、Open Shut Them featuring Noodle & Pals',
          videoUrl:
            'cloud://cloud1-d8gb4wooh8c8ad171.636c-cloud1-d8gb4wooh8c8ad171-1258683316/sss儿歌/100_Open Shut Them featuring Noodle_Pals Super Simple Songs.mp4',
          cover: '/static/covers/sss.png',
        },
      ],
    },
    {
      id: 4,
      title: '趣趣知知鸟',
      cover: '/static/covers/qqzzn.jpeg',
      episodeCount: 100,
      categoryId: 'l0',
      episodes: [
        {
          id: 1,
          title: '1、趣趣知知鸟 第一季-01集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC01%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 2,
          title: '2、趣趣知知鸟 第一季-02集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC02%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 3,
          title: '3、趣趣知知鸟 第一季-03集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC03%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 4,
          title: '4、趣趣知知鸟 第一季-04集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC04%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 5,
          title: '5、趣趣知知鸟 第一季-05集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC05%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 6,
          title: '6、趣趣知知鸟 第一季-06集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC06%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 7,
          title: '7、趣趣知知鸟 第一季-07集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC07%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 8,
          title: '8、趣趣知知鸟 第一季-08集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC08%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 9,
          title: '9、趣趣知知鸟 第一季-09集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC09%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 10,
          title: '10、趣趣知知鸟 第一季-10集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC10%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 11,
          title: '11、趣趣知知鸟 第一季-11集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC11%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 12,
          title: '12、趣趣知知鸟 第一季-12集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC12%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 13,
          title: '13、趣趣知知鸟 第一季-13集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC13%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 14,
          title: '14、趣趣知知鸟 第一季-14集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC14%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 15,
          title: '15、趣趣知知鸟 第一季-15集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC15%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 16,
          title: '16、趣趣知知鸟 第一季-16集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC16%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 17,
          title: '17、趣趣知知鸟 第一季-17集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC17%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 18,
          title: '18、趣趣知知鸟 第一季-18集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC18%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 19,
          title: '19、趣趣知知鸟 第一季-19集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC19%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 20,
          title: '20、趣趣知知鸟 第一季-20集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC20%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 21,
          title: '21、趣趣知知鸟 第一季-21集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC21%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 22,
          title: '22、趣趣知知鸟 第一季-22集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC22%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 23,
          title: '23、趣趣知知鸟 第一季-23集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC23%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 24,
          title: '24、趣趣知知鸟 第一季-24集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC24%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 25,
          title: '25、趣趣知知鸟 第一季-25集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC25%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 26,
          title: '26、趣趣知知鸟 第一季-26集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC26%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 27,
          title: '27、趣趣知知鸟 第一季-27集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC27%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 28,
          title: '28、趣趣知知鸟 第一季-28集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC28%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 29,
          title: '29、趣趣知知鸟 第一季-29集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC29%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 30,
          title: '30、趣趣知知鸟 第一季-30集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC30%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 31,
          title: '31、趣趣知知鸟 第一季-31集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC31%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 32,
          title: '32、趣趣知知鸟 第一季-32集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC32%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 33,
          title: '33、趣趣知知鸟 第一季-33集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC33%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 34,
          title: '34、趣趣知知鸟 第一季-34集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC34%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 35,
          title: '35、趣趣知知鸟 第一季-35集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC35%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 36,
          title: '36、趣趣知知鸟 第一季-36集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC36%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 37,
          title: '37、趣趣知知鸟 第一季-37集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC37%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 38,
          title: '38、趣趣知知鸟 第一季-38集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC38%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 39,
          title: '39、趣趣知知鸟 第一季-39集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC39%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 40,
          title: '40、趣趣知知鸟 第一季-40集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC40%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 41,
          title: '41、趣趣知知鸟 第一季-41集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC41%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 42,
          title: '42、趣趣知知鸟 第一季-42集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC42%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 43,
          title: '43、趣趣知知鸟 第一季-43集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC43%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 44,
          title: '44、趣趣知知鸟 第一季-44集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC44%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 45,
          title: '45、趣趣知知鸟 第一季-45集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC45%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 46,
          title: '46、趣趣知知鸟 第一季-46集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC46%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 47,
          title: '47、趣趣知知鸟 第一季-47集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC47%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 48,
          title: '48、趣趣知知鸟 第一季-48集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC48%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 49,
          title: '49、趣趣知知鸟 第一季-49集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC49%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 50,
          title: '50、趣趣知知鸟 第一季-50集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC1%E5%AD%A3%20%E7%AC%AC50%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 51,
          title: '51、趣趣知知鸟 第二季-01集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC01%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 52,
          title: '52、趣趣知知鸟 第二季-02集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC02%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 53,
          title: '53、趣趣知知鸟 第二季-03集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC03%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 54,
          title: '54、趣趣知知鸟 第二季-04集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC04%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 55,
          title: '55、趣趣知知鸟 第二季-05集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC05%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 56,
          title: '56、趣趣知知鸟 第二季-06集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC06%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 57,
          title: '57、趣趣知知鸟 第二季-07集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC07%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 58,
          title: '58、趣趣知知鸟 第二季-08集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC08%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 59,
          title: '59、趣趣知知鸟 第二季-09集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC09%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 60,
          title: '60、趣趣知知鸟 第二季-10集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC10%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 61,
          title: '61、趣趣知知鸟 第二季-11集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC11%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 62,
          title: '62、趣趣知知鸟 第二季-12集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC12%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 63,
          title: '63、趣趣知知鸟 第二季-13集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC13%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 64,
          title: '64、趣趣知知鸟 第二季-14集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC14%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 65,
          title: '65、趣趣知知鸟 第二季-15集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC15%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 66,
          title: '66、趣趣知知鸟 第二季-16集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC16%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 67,
          title: '67、趣趣知知鸟 第二季-17集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC17%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 68,
          title: '68、趣趣知知鸟 第二季-18集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC18%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 69,
          title: '69、趣趣知知鸟 第二季-19集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC19%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 70,
          title: '70、趣趣知知鸟 第二季-20集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC20%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 71,
          title: '71、趣趣知知鸟 第二季-21集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC21%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 72,
          title: '72、趣趣知知鸟 第二季-22集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC22%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 73,
          title: '73、趣趣知知鸟 第二季-23集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC23%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 74,
          title: '74、趣趣知知鸟 第二季-24集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC24%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 75,
          title: '75、趣趣知知鸟 第二季-25集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC25%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 76,
          title: '76、趣趣知知鸟 第二季-26集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC26%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 77,
          title: '77、趣趣知知鸟 第二季-27集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC27%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 78,
          title: '78、趣趣知知鸟 第二季-28集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC28%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 79,
          title: '79、趣趣知知鸟 第二季-29集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC29%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 80,
          title: '80、趣趣知知鸟 第二季-30集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC30%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 81,
          title: '81、趣趣知知鸟 第二季-31集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC31%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 82,
          title: '82、趣趣知知鸟 第二季-32集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC32%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 83,
          title: '83、趣趣知知鸟 第二季-33集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC33%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 84,
          title: '84、趣趣知知鸟 第二季-34集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC34%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 85,
          title: '85、趣趣知知鸟 第二季-35集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC35%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 86,
          title: '86、趣趣知知鸟 第二季-36集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC36%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 87,
          title: '87、趣趣知知鸟 第二季-37集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC37%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 88,
          title: '88、趣趣知知鸟 第二季-38集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC38%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 89,
          title: '89、趣趣知知鸟 第二季-39集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC39%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 90,
          title: '90、趣趣知知鸟 第二季-40集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC40%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 91,
          title: '91、趣趣知知鸟 第二季-41集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC41%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 92,
          title: '92、趣趣知知鸟 第二季-42集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC42%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 93,
          title: '93、趣趣知知鸟 第二季-43集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC43%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 94,
          title: '94、趣趣知知鸟 第二季-44集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC44%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 95,
          title: '95、趣趣知知鸟 第二季-45集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC45%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 96,
          title: '96、趣趣知知鸟 第二季-46集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC46%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 97,
          title: '97、趣趣知知鸟 第二季-47集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC47%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 98,
          title: '98、趣趣知知鸟 第二季-48集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC48%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 99,
          title: '99、趣趣知知鸟 第二季-49集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC49%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
        {
          id: 100,
          title: '100、趣趣知知鸟 第二季-50集',
          videoUrl:
            'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/01.%20%E7%AC%AC2%E5%AD%A3%20%E7%AC%AC50%E9%9B%86.mp4',
          cover: '/static/covers/twirlywoos.png',
        },
      ],
    },
    {
      id: 5,
      title: 'Pinkfong 律动儿歌',
      cover: '/static/covers/pinkfong-music.png',
      episodeCount: 69,
      categoryId: 'l0',
      episodes: [],
    },
    {
      id: 6,
      title: 'Pinkfong 恐龙',
      cover: '/static/covers/pinkfong-dino.png',
      episodeCount: 26,
      categoryId: 'l0',
      episodes: [],
    },
    {
      id: 7,
      title: 'Pinkfong 汽车',
      cover: '/static/covers/pinkfong-car.png',
      episodeCount: 39,
      categoryId: 'l0',
      episodes: [],
    },
    {
      id: 8,
      title: 'Pinkfong 水果',
      cover: '/static/covers/pinkfong-fruit.png',
      episodeCount: 12,
      categoryId: 'l0',
      episodes: [],
    },
  ],
}
