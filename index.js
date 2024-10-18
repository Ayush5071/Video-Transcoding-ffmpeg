import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './middleware/multer.js';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

const app = express();
const upload = multer({ storage: storage });

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ['GET', 'POST'],
    credentials: true 
}));

app.get('/', (req, res) => {
    res.json({ message: "Hello, the server is running!" });
});

app.post('/uploads', upload.single('file'), function (req, res) {
    const lessonId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = path.join('./uploads/courses', lessonId);
    const hlsPath = path.join(outputPath, 'index.m3u8');

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${path.join(outputPath, 'segment%03d.ts')}" -start_number 0 "${hlsPath}"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ message: "Error processing video" });
        }

        const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
        res.json({
            message: "Video converted to HLS",
            videoUrl: videoUrl,
            lessonId: lessonId
        });
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.listen(8000, () => {
    console.log("App is started at port 8000");
});
