'use strict';
const _0x43e7 = [
    'executeJav',
    'returnValu',
    'loadURL',
    'Ipc',
    'ver',
    'versions',
    'insertCSS',
    'tryShowWin',
    '535063vcwXVO',
    'dow',
    'sion',
    'onfig.json',
    '13AhDPMW',
    'name',
    '?port=',
    'Sec',
    'ector',
    'assets:hin',
    'node',
    '610864TMyXZF',
    'aderUrls',
    'join',
    'closed',
    '36691ZthxLI',
    'split',
    'exports',
    '2|1|0|4|3',
    'webRequest',
    'index_low_',
    'd.js',
    'v.switchMo',
    'xqzwO',
    'setMenu',
    '155463vIMmfM',
    'ready-to-s',
    'gddMm',
    'ders',
    'parse',
    'vZRUd',
    './tj',
    'url',
    ':focusNode',
    '1DjBxrv',
    'index.html',
    'requestHea',
    'ector\x20v',
    'focusNode',
    '1xCybRc',
    'disableWeb',
    'onBeforeSe',
    'KqhAP',
    'electron.h',
    'Cocos\x20Insp',
    'aScript',
    'showWindow',
    'electron',
    'how',
    'registerHe',
    'Selection',
    'isteners',
    'XdPoV',
    'RqSdy',
    'version',
    'setReqHead',
    'nspector-c',
    'PigRy',
    'QpXkt',
    'defaultSes',
    'config.jso',
    'EaAXn',
    'readFileSy',
    'omlMl',
    'Vghha',
    'focusAsset',
    ':focusAsse',
    'sendToAll',
    '&mode=',
    '#2e2c29',
    'error',
    'ndHeaders',
    'NEUmv',
    '../cocos-i',
    'previewPor',
    'tml',
    'jXmBg',
    'de(',
    'mainPreloa',
    'auvFg',
    'removeAllL',
    './package.',
    'json',
    'file://',
    'bind',
    'Window',
    'show',
    'YAGHb',
    '92867DqjgKn',
    '11473hFKIWE',
    'process',
    'nativeWin',
    'webContent',
    'asset',
    'utf-8',
    '64257dfRsXr',
    'setHeader',
    'path',
    'existsSync',
    'lkKIq',
    'AsSYp',
    'PreviewSer',
    'select'
];
const _0x43a665 = _0x1acb;
(function (_0x3e7ffc, _0xa3bee3) {
    const _0x2c1a21 = _0x1acb;
    while (!![]) {
        try {
            const _0x36e4c7 = parseInt(_0x2c1a21(0xf3)) * -parseInt(_0x2c1a21(0x129)) + -parseInt(_0x2c1a21(0x14f)) * -parseInt(_0x2c1a21(0x144)) + -parseInt(_0x2c1a21(0x12a)) + -parseInt(_0x2c1a21(0xea)) + parseInt(_0x2c1a21(0x140)) * -parseInt(_0x2c1a21(0xf8)) + parseInt(_0x2c1a21(0x130)) + parseInt(_0x2c1a21(0x14b));
            if (_0x36e4c7 === _0xa3bee3)
                break;
            else
                _0x3e7ffc['push'](_0x3e7ffc['shift']());
        } catch (_0xcd12f7) {
            _0x3e7ffc['push'](_0x3e7ffc['shift']());
        }
    }
}(_0x43e7, -0xd0fd * 0x1 + 0xf * -0x5948 + 0xb7fab));
const {BrowserWindow, app, remote, ipcMain, session} = require(_0x43a665(0x100)), path = require(_0x43a665(0x132)), pcs = require(_0x43a665(0x12b)), folder = '', devTools = ![];
let win, mode = -0x8 * 0x1c1 + 0x1 * 0x139f + -0x597, unloaded = ![];
function _0x1acb(_0x20ecdb, _0x2d4893) {
    _0x20ecdb = _0x20ecdb - (-0x8 * 0xe5 + -0x541 + 0xd53);
    let _0x2d58b1 = _0x43e7[_0x20ecdb];
    return _0x2d58b1;
}
const PKG_NAME = require(_0x43a665(0x122) + _0x43a665(0x123))[_0x43a665(0x145)], PKG_VERSION = require(_0x43a665(0x122) + _0x43a665(0x123))[_0x43a665(0x107)];
let {ebtMain} = require(_0x43a665(0xf0)), fs = require('fs'), _configPath = path[_0x43a665(0x14d)](__dirname, _0x43a665(0x10d) + 'n'), __parentConfig = path[_0x43a665(0x14d)](__dirname, _0x43a665(0x11a) + _0x43a665(0x109) + _0x43a665(0x143));
function readConfig() {
    const _0x348970 = _0x43a665, _0x176178 = { 'xqzwO': _0x348970(0x12f) };
    let _0x47eaf4 = '';
    return fs[_0x348970(0x133)](__parentConfig) ? _0x47eaf4 = fs[_0x348970(0x10f) + 'nc'](__parentConfig, { 'encoding': _0x176178[_0x348970(0x157)] }) : _0x47eaf4 = fs[_0x348970(0x10f) + 'nc'](_configPath, { 'encoding': _0x176178[_0x348970(0x157)] }), JSON[_0x348970(0xee)](_0x47eaf4);
}
let disableWebSec = Boolean(readConfig()[_0x43a665(0xf9) + _0x43a665(0x147)]);
const customHeaders = {};
module[_0x43a665(0x151)] = {
    async 'load'() {
        const _0x59e20c = _0x43a665;
        ipcMain['on'](PKG_NAME + _0x59e20c(0xf2), this[_0x59e20c(0xf7)][_0x59e20c(0x125)](this)), ipcMain['on'](PKG_NAME + (_0x59e20c(0x113) + 't'), this[_0x59e20c(0x112)][_0x59e20c(0x125)](this)), ipcMain['on'](_0x59e20c(0x102) + _0x59e20c(0x14c), this[_0x59e20c(0x102) + _0x59e20c(0x14c)][_0x59e20c(0x125)](this)), ipcMain['on'](_0x59e20c(0x108) + 'er', this[_0x59e20c(0x131)][_0x59e20c(0x125)](this));
    },
    'unload'() {
        const _0x58a0b7 = _0x43a665, _0x2f1fa2 = { 'AsSYp': _0x58a0b7(0x152) }, _0x43c793 = _0x2f1fa2[_0x58a0b7(0x135)][_0x58a0b7(0x150)]('|');
        let _0x2dee60 = 0x10ca + -0x8cd + -0x7fd;
        while (!![]) {
            switch (_0x43c793[_0x2dee60++]) {
            case '0':
                ipcMain[_0x58a0b7(0x121) + _0x58a0b7(0x104)](PKG_NAME + (_0x58a0b7(0x113) + 't'));
                continue;
            case '1':
                ipcMain[_0x58a0b7(0x121) + _0x58a0b7(0x104)](PKG_NAME + _0x58a0b7(0xf2));
                continue;
            case '2':
                unloaded = !![];
                continue;
            case '3':
                ipcMain[_0x58a0b7(0x121) + _0x58a0b7(0x104)](_0x58a0b7(0x108) + 'er');
                continue;
            case '4':
                ipcMain[_0x58a0b7(0x121) + _0x58a0b7(0x104)](_0x58a0b7(0x102) + _0x58a0b7(0x14c));
                continue;
            }
            break;
        }
    },
    'focusNode'(_0x91483c, _0x4f295a) {
        const _0x1a09ac = _0x43a665, _0x4c4945 = { 'jXmBg': _0x1a09ac(0x14a) };
        Editor[_0x1a09ac(0x103)][_0x1a09ac(0x137)](_0x4c4945[_0x1a09ac(0x11d)], _0x4f295a);
    },
    'focusAsset'(_0x2efb69, _0x111288) {
        const _0x5917c3 = _0x43a665, _0x47aabf = {
                'vZRUd': _0x5917c3(0x149) + 't',
                'EaAXn': _0x5917c3(0x12e)
            };
        Editor[_0x5917c3(0x13b)][_0x5917c3(0x114)](_0x47aabf[_0x5917c3(0xef)], _0x111288), Editor[_0x5917c3(0x103)][_0x5917c3(0x137)](_0x47aabf[_0x5917c3(0x10e)], _0x111288);
    },
    'registerHeaderUrls'(_0x4c91d5, _0x3d2ba0) {
        const _0x361a22 = _0x43a665, _0x4b473a = {
                'KqhAP': function (_0x5b800b, _0x195b35) {
                    return _0x5b800b(_0x195b35);
                }
            }, _0x437b64 = { 'urls': _0x3d2ba0 };
        session[_0x361a22(0x10c) + _0x361a22(0x142)][_0x361a22(0x153)][_0x361a22(0xfa) + _0x361a22(0x118)](_0x437b64, (_0x484f78, _0x371576) => {
            const _0x11c048 = _0x361a22;
            try {
                let _0x3341e2 = customHeaders[_0x484f78[_0x11c048(0xf1)]];
                for (let _0x1ea662 in _0x3341e2) {
                    _0x484f78[_0x11c048(0xf5) + _0x11c048(0xed)][_0x1ea662] = _0x3341e2[_0x1ea662];
                }
                _0x4b473a[_0x11c048(0xfb)](_0x371576, { 'requestHeaders': _0x484f78[_0x11c048(0xf5) + _0x11c048(0xed)] });
            } catch (_0x4d6b67) {
                Editor[_0x11c048(0x117)](_0x4d6b67), _0x4d6b67[_0x11c048(0x139) + 'e'] = ![];
            }
        }), _0x4c91d5[_0x361a22(0x139) + 'e'] = !![];
    },
    'setHeader'(_0x3e6267, _0x44266f, _0x2ceefb) {
        const _0x5c8a06 = _0x43a665;
        customHeaders[_0x44266f] = _0x2ceefb, _0x3e6267[_0x5c8a06(0x139) + 'e'] = !![];
    },
    'showWindow'() {
        const _0x5d2c11 = _0x43a665, _0x488f31 = {
                'auvFg': _0x5d2c11(0xfd) + _0x5d2c11(0x148),
                'omlMl': function (_0x489b00, _0x43d358) {
                    return _0x489b00 + _0x43d358;
                },
                'YAGHb': _0x5d2c11(0xfd) + _0x5d2c11(0xf6),
                'XdPoV': _0x5d2c11(0x116),
                'NEUmv': _0x5d2c11(0xeb) + _0x5d2c11(0x101),
                'QpXkt': _0x5d2c11(0x14e),
                'gddMm': function (_0x194214, _0x4128b9) {
                    return _0x194214 >= _0x4128b9;
                },
                'Vghha': function (_0x128369, _0x413290) {
                    return _0x128369 + _0x413290;
                },
                'RqSdy': function (_0x3507f8, _0x2c685a) {
                    return _0x3507f8 + _0x2c685a;
                },
                'lkKIq': _0x5d2c11(0x146),
                'PigRy': _0x5d2c11(0x115)
            };
        if (win) {
            win[_0x5d2c11(0x127)](), win[_0x5d2c11(0x12d) + 's'][_0x5d2c11(0x138) + _0x5d2c11(0xfe)](_0x5d2c11(0x156) + _0x5d2c11(0x11e) + mode + ')');
            return;
        }
        win = new Editor[(_0x5d2c11(0x126))](_0x488f31[_0x5d2c11(0x120)], {
            'minWidth': 0x36e,
            'minHeight': 0x258,
            'width': 0x36e,
            'height': 0x258,
            'title': _0x488f31[_0x5d2c11(0x110)](_0x488f31[_0x5d2c11(0x128)], PKG_VERSION),
            'backgroundColor': _0x488f31[_0x5d2c11(0x105)],
            'useContentSize': ![],
            'webPreferences': {
                'enablePreferredSizeMode': !![],
                'preferredSizeMode': !![],
                'webviewTag': !![],
                'nodeIntegration': !![],
                'enableRemoteModule': !![],
                'sandbox': ![],
                'devTools': devTools,
                'contextIsolation': ![],
                'webSecurity': !disableWebSec,
                'preload': path[_0x5d2c11(0x14d)](__dirname, folder + (_0x5d2c11(0x11f) + _0x5d2c11(0x155)))
            }
        })[_0x5d2c11(0x12c)];
        win[_0x5d2c11(0x12d) + 's'] && (win[_0x5d2c11(0x12d) + 's'][_0x5d2c11(0x13e)] = function (..._0x39699c) {
        });
        win[_0x5d2c11(0x158)](null), win['on'](_0x488f31[_0x5d2c11(0x119)], () => {
            const _0x4f520e = _0x5d2c11;
            win[_0x4f520e(0x127)]();
        }), win['on'](_0x488f31[_0x5d2c11(0x10b)], () => {
            win = null;
        });
        let _0x14ca09 = folder + (_0x5d2c11(0x154) + _0x5d2c11(0xfc) + _0x5d2c11(0x11c));
        _0x488f31[_0x5d2c11(0xec)](process[_0x5d2c11(0x13d)][_0x5d2c11(0x100)][_0x5d2c11(0x150)]('.')[0x3 * -0x4d2 + -0x23d0 + -0x12 * -0x2cb], 0x1 * -0xc20 + 0x1 * -0x171a + 0x233f) && (_0x14ca09 = folder + _0x5d2c11(0xf4));
        let _0x1c927e = path[_0x5d2c11(0x14d)](__dirname, _0x488f31[_0x5d2c11(0x110)](_0x488f31[_0x5d2c11(0x111)](_0x488f31[_0x5d2c11(0x111)](_0x488f31[_0x5d2c11(0x106)](_0x14ca09, _0x488f31[_0x5d2c11(0x134)]), Editor[_0x5d2c11(0x136) + _0x5d2c11(0x13c)][_0x5d2c11(0x11b) + 't']), _0x488f31[_0x5d2c11(0x10a)]), mode));
        win[_0x5d2c11(0x13a)](_0x5d2c11(0x124) + _0x1c927e);
    },
    'tryShowWindow'(_0x10522f) {
        const _0x39a552 = _0x43a665;
        mode = _0x10522f;
        try {
            this[_0x39a552(0xff)]();
        } catch (_0x3bce48) {
            Editor[_0x39a552(0x117)](_0x3bce48);
        }
    },
    'messages': {
        'previewMode'() {
            const _0x39e9c1 = _0x43a665;
            if (unloaded)
                return;
            this[_0x39e9c1(0x13f) + _0x39e9c1(0x141)](-0x82d + -0x3 * -0x167 + -0x4 * -0xfe);
        },
        'buildMode'() {
            const _0x3c7502 = _0x43a665;
            if (unloaded)
                return;
            this[_0x3c7502(0x13f) + _0x3c7502(0x141)](0x1 * 0x19c3 + 0x14b * 0x8 + -0x241a * 0x1);
        },
        'openCustomPage'() {
            const _0x465099 = _0x43a665;
            if (unloaded)
                return;
            this[_0x465099(0x13f) + _0x465099(0x141)](0xbcd + -0xdc8 + 0x1fd);
        }
    }
};