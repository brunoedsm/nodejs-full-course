const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3001;

app.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                message: 'No files'
            });
        }

        // const { image } = req.files;
        // image.mv(`./uploads/${image.name}`);

        const { images } = req.files;
        images.forEach(image => image.mv(`./uploads/${image.name}`));

        return res.json({
            message: 'File is uploaded',
            name: image.name,
            mimeType: image.mimetype,
            size: image.size
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
})

app.listen(port, () => console.log('server started on 3001'));