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
      cover: '/static/covers/letter-day.png', // 封面图路径
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
      title: 'Letter of the Day 抖音版',
      cover: '/static/covers/letter-day-douyin.png',
      episodeCount: 26,
      categoryId: 'l0',
      episodes: [],
    },
    {
      id: 3,
      title: 'SSS儿歌',
      cover: '/static/covers/sss.png',
      episodeCount: 50,
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
      ],
    },
    {
      id: 4,
      title: 'ABC 字母拼读',
      cover: '/static/covers/abc.png',
      episodeCount: 24,
      categoryId: 'l0',
      episodes: [],
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
