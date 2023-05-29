const _0xb1ef = [
    '43493VvyGPn',
    'existsSync',
    '355846MoaHfz',
    'readFileSy',
    'saveConfig',
    '1MIPJpr',
    'NLJqK',
    '59406gVxBRh',
    'config.jso',
    'LhyQZ',
    'utf-8',
    '../cocos-i',
    '2153850xqNxBe',
    '6992XazspR',
    '526868ZIMLfr',
    '7AEwUeJ',
    'path',
    '2CSJDwb',
    '5jtMell',
    'readConfig',
    'join',
    'writeFileS',
    'ync',
    'stringify',
    'onfig.json',
    '259921zcDXKt',
    'nspector-c',
    'parse'
];
const _0x47b975 = _0x357c;
function _0x357c(_0x4a219e, _0x3fbc1f) {
    _0x4a219e = _0x4a219e - (0x4e6 + 0x3f1 * -0x6 + 0xa22 * 0x2);
    let _0x1e9362 = _0xb1ef[_0x4a219e];
    return _0x1e9362;
}
(function (_0x132921, _0xf5e67e) {
    const _0x5aa941 = _0x357c;
    while (!![]) {
        try {
            const _0x941534 = parseInt(_0x5aa941(0x190)) * -parseInt(_0x5aa941(0x19f)) + parseInt(_0x5aa941(0x19d)) * -parseInt(_0x5aa941(0x195)) + -parseInt(_0x5aa941(0x19c)) + parseInt(_0x5aa941(0x193)) * parseInt(_0x5aa941(0x18b)) + -parseInt(_0x5aa941(0x19b)) + -parseInt(_0x5aa941(0x184)) * parseInt(_0x5aa941(0x18e)) + parseInt(_0x5aa941(0x19a));
            if (_0x941534 === _0xf5e67e)
                break;
            else
                _0x132921['push'](_0x132921['shift']());
        } catch (_0x6b8a08) {
            _0x132921['push'](_0x132921['shift']());
        }
    }
}(_0xb1ef, -0x6ed03 + 0x3 * 0x3da9d + 0x386ac));
let fs = require('fs'), path = require(_0x47b975(0x19e)), _configPath = path[_0x47b975(0x186)](__dirname, _0x47b975(0x196) + 'n'), __parentConfig = path[_0x47b975(0x186)](__dirname, _0x47b975(0x199) + _0x47b975(0x18c) + _0x47b975(0x18a));
global[_0x47b975(0x185)] = () => {
    const _0x3d0d4d = _0x47b975, _0x1e1e66 = { 'LhyQZ': _0x3d0d4d(0x198) };
    let _0x5caf66 = '';
    return fs[_0x3d0d4d(0x18f)](__parentConfig) ? _0x5caf66 = fs[_0x3d0d4d(0x191) + 'nc'](__parentConfig, { 'encoding': _0x1e1e66[_0x3d0d4d(0x197)] }) : _0x5caf66 = fs[_0x3d0d4d(0x191) + 'nc'](_configPath, { 'encoding': _0x1e1e66[_0x3d0d4d(0x197)] }), JSON[_0x3d0d4d(0x18d)](_0x5caf66);
}, global[_0x47b975(0x192)] = _0x51261f => {
    const _0x438007 = _0x47b975, _0x5dac2b = { 'NLJqK': _0x438007(0x198) };
    let _0x9c5e52 = JSON[_0x438007(0x189)](_0x51261f);
    fs[_0x438007(0x187) + _0x438007(0x188)](__parentConfig, _0x9c5e52, { 'encoding': _0x5dac2b[_0x438007(0x194)] });
};