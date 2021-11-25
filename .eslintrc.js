module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'google'
    ],
    'parserOptions': {
        'ecmaVersion': 13
    },
    'rules': {
        'comma-dangle': [2, 'never'],
        'indent': [2, 4],
        'max-len': ['error', 100],
        'new-cap': ['error', {'capIsNewExceptionPattern': '^GM_'}]
    }
};
