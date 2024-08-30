import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./middleware/multer.js";
import path from "path";
import fs from "fs";
import { exec } from "child_process"; // Use carefully

const app = express();

// Multer middleware configuration
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Hello, what's going on?" });
});

app.post('/uploads', upload.single('file'), function (req, res) {
    const lessonId = uuidv4();
    const videoPath = req.file.path; // Path to uploaded video
    const outputPath = path.join('./uploads/courses', lessonId);
    const hlsPath = path.join(outputPath, 'index.m3u8');

    console.log("HLS Path - ", hlsPath);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    // FFmpeg command
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${path.join(outputPath, 'segment%03d.ts')}" -start_number 0 "${hlsPath}"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error.message}`);
            return res.status(500).json({ message: "Error processing video" });
        }
        if (stderr) console.error(`Exec stderr: ${stderr}`);

        const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
        res.json({
            message: "Video converted to HLS",
            videoUrl: videoUrl,
            lessonId: lessonId
        });
    });
});

// CORS middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use("/uploads", express.static("uploads"));

app.listen(8000, () => {
    console.log("App is started at port 8000");
});
