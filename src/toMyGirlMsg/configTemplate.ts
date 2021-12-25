/**
 * @name config_template
 * @description 配置返回内容模板
 */
import {
  IOptionsConfigProps,
  ItemplateProps,
  IConfigTemplateProps,
  IConfigTextProps,
  ItemplateTextProps,
} from './typing';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(duration);
dayjs.extend(LocalizedFormat);

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */
export const config_template = (
  data: IConfigTemplateProps,
  options: IOptionsConfigProps
): ItemplateProps => {
  const {
    city,
    date,
    wea,
    tem1,
    tem2,
    win,
    win_speed_day,
    air,
    air_level,
    humidity,
    alarm,
    lunarInfo,
    weatherVerse,
  } = data;

  // 今日、恋爱天数
  const today = date.replace('-', '年').replace('-', '月') + '日';
  const dateLength = dayjs(date).diff(options.start_stamp, 'day');

  // 公历节日、农历节日和二十四节气
  const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo;
  const festival_info = festival ? `| ${festival}` : '';
  const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : '';
  const jieqi_info = jieqi ? `| ${jieqi}` : '';

  // 拼接内容
  let description = `<div>${city} | ${today} ${festival_info}</div><div>农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}</div>
<div>这是我们相识的第 ${dateLength} 天</div>
<div>今日天气状况：</div><div>天气：${wea}</div><div>${win}：${win_speed_day}</div><div>温度：${tem2}℃ ~ ${tem1}℃</div><div>湿度：${humidity}</div><div>空气：${air_level} | ${air} </div>`;

  // 添加预警天气
  if (alarm) {
    description += `
<div>有预警信息哦：</div><div>${alarm.alarm_type} | ${alarm.alarm_level}预警</div>`;
  }

  // 最高温度
  if (+tem1 <= 0) {
    description += `
<div>哈喽哈喽~这里是来自崽崽的爱心提醒哦：</div>
<div>今日最高温度仅为<b>${tem1}℃</b>❇，可冷可冷了~鱼崽崽可要注意保暖哦~</div>`;
  }

  // 添加天气相关诗句
  if (weatherVerse) {
    const { source, author, content } = weatherVerse;
    description += `
<div>天气诗句：</div><div>${source} | ${author}</div><div>${content}</div>`;
  }

  // 内容末尾，自定义
  description += `
❤️ 🧡 💛 💚 💖`;

  return {
    msgtype: 'textcard',
    textcard: {
      title: '致鱼崽的今日内容',
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: 'https://api.vvhan.com/api/60s', // 60s看世界
      btntxt: 'By崽崽',
    },
  };
};

/**
 * 文本类型模板定义
 */
export const config_text = (data: IConfigTextProps): ItemplateTextProps => {
  const {
    one,
    hotComment,
    verse,
    loveWord,
    rainbowFart,
    oneWord,
    inspirationalEnglish,
  } = data;

  // let text = '以下内容来自鱼崽小铃铛\n';
  let text = '早安呀，可爱的鱼崽崽😘\n';

  text += `
  如果我鱼崽崽已经起床啦！崽崽向你说早安呦~，记得吃早饭呀~😆
  如果我鱼崽崽还没起床呀！崽崽就等着鱼崽起床给我说早安呦~🤣，哼~就让你再睡会懒觉~下次可不能啦~😝\n`;

  // 添加笑话
  if (rainbowFart) {
    //     text += `
    // 彩虹屁：
    text += `
${rainbowFart}\n`;
  }

  if (loveWord) {
    text += `
${loveWord}\n`;
  }

  // 诗句
  if (verse) {
    text += `
${verse.source}
${verse.content}\n`;
  }

  if (one) {
    text += `
ONE一个:
${one}\n`;
  }

  if (hotComment) {
    text += `
网易云音乐热评:
${hotComment}\n`;
  }

  // 添加一句一言
  if (oneWord) {
    text += `
一句一言：
${oneWord}\n`;
  }

  // 添加励志英语
  if (inspirationalEnglish) {
    const { date, content, note, source } = inspirationalEnglish;
    //     text += `
    // 今日英语（${month} ${day} ${dayjs().get('year')}）：
    // ${en}
    // ${zh}\n`;
    text += `
今日英语（${dayjs(date).format('ll')}）:
《${source}》
${content}
${note}`;
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  };
};
