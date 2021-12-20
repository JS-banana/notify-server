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

// 模板内容配置
// 微信通知 textcard类型的description内容限制512个字节
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
    loveWord,
    verse,
    alarm,
  } = data;

  const today = date.replace('-', '年').replace('-', '月') + '日';
  const dateLength = dayjs(date).diff(options.start_stamp, 'day');

  let description = `<div>${today} | ${city}</div>
<div>这是我们相识的第 ${dateLength} 天</div>
<div>今日天气状况：</div><div>天气：${wea}</div><div>${win}：${win_speed_day}</div><div>温度：${tem2}℃ - ${tem1}℃</div><div>湿度：${humidity}</div><div>空气：${air_level} | ${air} </div>`;

  // 添加预警天气
  if (alarm) {
    description += `
<div>预警信息：</div><div>${alarm.alarm_type} | ${alarm.alarm_level}</div>`;
  }

  // 添加诗句
  if (verse) {
    description += `
<div>今日诗句：</div><div>${verse.source}</div><div>${verse.content}</div>`;
  }

  // 添加情话
  if (loveWord) {
    description += `
<div>今日情话：</div><div class="highlight">${loveWord}</div>`;
  }

  return {
    msgtype: 'textcard',
    textcard: {
      title: '致鱼崽的今日内容',
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: 'https://api.vvhan.com/api/60s',
      btntxt: 'By崽崽',
    },
  };
};

// 文本类型

export const config_text = (data: IConfigTextProps): ItemplateTextProps => {
  const { one, hotComment, rainbowFart, oneWord, inspirationalEnglish } = data;

  let text = '以下内容来自鱼崽小铃铛\n';

  // 添加笑话
  if (rainbowFart) {
    //     text += `
    // 彩虹屁：
    text += `
${rainbowFart}\n`;
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
