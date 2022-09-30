const base64ToBuffer = (base64Data) => {
    const data = Buffer.from(base64Data, 'base64');
    return data;
}

const bufferToBase64 = (base64Data) => {
    const data = Buffer.from(base64Data).toString('base64');
    return data;
}

module.exports = {base64ToBuffer, bufferToBase64}