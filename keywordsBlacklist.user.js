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
// @version     1.4
// ==/UserScript==
const tmp = GM_getValue('blacklist', '');
if (tmp && tmp.replaceAll(' ', '')) {
    const tmpFMT = Array.from(
        new Set(tmp.replaceAll(' ', '').split('#'))
    ).filter((item) => !!item);
    if (tmpFMT.length > 0) {
        GM_setValue('blacklist', tmpFMT.join('#'));
    }
} else {
    GM_deleteValue('blacklist');
}
GM_registerMenuCommand('点击设置关键词黑名单', () => {
    const blacklist = prompt(
        '请输入要过滤的关键词, 用\'#\'分隔',
        GM_getValue('blacklist', '')
    );
    GM_setValue('blacklist', blacklist);
    location.reload();
});
const blacklistArr = GM_getValue('blacklist', 'csdn').split('#');
const blacklistStr = ' -' + blacklistArr.join(' -');
const regexp = new RegExp('(^| )-(' + blacklistArr.join('|') + ')(?!\\S)', 'g');
document.getElementById('form').onsubmit = () => {
    const kw = document.getElementById('kw');
    kw.value = kw.value.replace(regexp, '').trim();
    if (kw.value) {
        kw.value += blacklistStr;
    }
    return false;
};
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    let wd = params.get('wd');
    if (wd && wd.indexOf(blacklistStr) === -1) {
        wd = wd.replace(regexp, '').trim();
        if (wd) {
            params.set('wd', wd + blacklistStr);
            location.href = 'https://www.baidu.com/s?' + params.toString();
        }
    }
};
