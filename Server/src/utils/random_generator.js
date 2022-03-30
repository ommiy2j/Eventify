function generate() {
    const alpha =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let val = '';
    for (let i = 1; i <= 8; i++) {
        const random = Math.random() * alpha.length;
        val = val + alpha.charAt(random);
    }
    return val;
}

module.exports = { generate };
