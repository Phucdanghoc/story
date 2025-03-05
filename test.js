const bcrypt = require('bcrypt');

async function test() {
    const password = '123456';
    const hash = '$2b$10$re8b/EXcE3tDMh0Mg4YmDO97W/yOwtPhxZmXUTPUWR38uPYvyUNNO';
    const match = await bcrypt.compare(password, hash);
    console.log('Test result:', match); // Nên trả về true nếu hash khớp
}
test();