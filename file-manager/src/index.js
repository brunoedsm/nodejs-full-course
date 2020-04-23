const { userInput } = require('./input');
const { reader, writer } = require('./file-manager');

const userReadFile = async filePath => {
    const content = await reader(filePath);
    console.log(content);
    app();
};

const userWriteFile = async filePath => {
    const content = await userInput('File content: ');
    await writer(filePath, content);

    console.log(`Saved file ${filePath}`);
    app();
};

const app = async () => {
    const mode = await userInput('Read (R) or Write (W)? ');
    const filePath = await userInput('File path: ');

    switch (mode.toUpperCase()) {
        case 'R': userReadFile(filePath); break;
        case 'W': userWriteFile(filePath); break;
        default: app(); break;
    }
};

app();