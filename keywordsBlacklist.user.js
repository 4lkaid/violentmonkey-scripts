// ==UserScript==
// @author      4lkaid
// @description 自定义百度搜索要过滤的关键词, 搜索时以'-关键词'的形式自动填充到搜索框中
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @license     MIT
// @match       https://www.baidu.com/
// @match       https://www.baidu.com/s?*
// @name        关键词黑名单
// @namespace   https://github.com/4lkaid/violentmonkey-scripts
// @run-at      document-end
// @version     1.1
// ==/UserScript==
GM_registerMenuCommand('点击设置词库黑名单', () => {
    const blacklist = prompt(
        '请输入要过滤的关键词, 用\'#\'分隔',
        GM_getValue('blacklist', '')
    );
    if (blacklist) {
        GM_setValue('blacklist', blacklist);
    } else {
        GM_deleteValue('blacklist');
    }
    location.reload();
});
const blacklistArr = Array.from(
    new Set(
        Array.from(
            GM_getValue('blacklist', 'csdn').split('#'),
            (item) => item.trim()
        ).filter((item) => Boolean(item))
    )
);
const blacklistStr = blacklistArr.length > 0 ? ' -' + blacklistArr.join(' -') : '';
const regexp = new RegExp('(^| )-(' + blacklistArr.join('|') + ')(?!\\S)', 'g');
document.getElementById('form').onsubmit = () => {
    const kw = document.getElementById('kw');
    kw.value = kw.value.replace(regexp, '').trim();
    if (kw.value) {
        kw.value += blacklistStr;
    }
    return false;
};
