goog.provide('pow.main');

goog.require('pow.a');
goog.require('pow.b');

pow.main = function(one, two) {
    return pow.a(one) + pow.b(two);
};

window['ppp'] = {
    'main': pow.main
};
