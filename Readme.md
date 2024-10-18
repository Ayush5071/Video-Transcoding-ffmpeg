# Video Upload & HLS Transcoding Application

This project is a full-stack web application that allows users to upload videos, transcode them into HLS format using FFmpeg, and play them in a retro-themed video player built with React. The application features a simple and intuitive interface designed with Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Server Setup](#server-setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
  - [Requirements](#requirements-1)
  - [Installation](#installation-1)
  - [Running the Frontend](#running-the-frontend)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Additional Notes](#additional-notes)

## Features

- **Video Upload**: Users can upload video files to the server.
- **HLS Transcoding**: Uploaded videos are transcoded into HLS format for adaptive streaming.
- **Video Playback**: Transcoded videos can be played in a responsive video player.
- **Retro-Themed UI**: The user interface is styled to give a nostalgic cinema experience, using Tailwind CSS for modern and responsive design.

## Technologies Used

- **Backend**: 
  - Node.js
  - Express
  - Multer (for file uploads)
  - FFmpeg (for video transcoding)
  - CORS (for cross-origin resource sharing)
  
- **Frontend**: 
  - React
  - Video.js (for video playback)
  - Tailwind CSS (for styling)

## Project Structure


## Server Setup

### Requirements

- **Node.js**: Ensure you have Node.js installed (v14 or higher).
- **FFmpeg**: Install FFmpeg on your system and make sure it's added to your PATH.

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd video-upload-hls-app/server

## Backend Setup

### Requirements
- Node.js: Ensure you have Node.js installed (v14 or higher).

### Installation

1. Navigate to the Server Directory
   ```bash
   cd server
2. npm install

### Running the Server
```markdown
### Running the Server

1. Start the Server
   ```bash
   npm start

   The server will run on http://localhost:8000.


### API Endpoints
```markdown
### API Endpoints
- **GET /**: Returns a simple welcome message.
- **POST /uploads**: Accepts video file uploads and triggers the transcoding process. The response includes the video URL for playback.

## 
Here’s the complete README.md file structured with each section provided one by one in code format. You can copy each section into your README.md file as needed.

Project Structure
markdown
Copy code
# Video Upload HLS App

## Project Structure

/video-upload-hls-app ├── /frontend # React frontend application │ ├── /src # Source files │ ├── /public # Public files │ └── package.json # Frontend dependencies └── /server # Express backend application ├── /middleware # Middleware for file storage ├── uploads # Folder for uploaded videos ├── package.json # Backend dependencies └── server.js # Main server file

Copy code
Backend Setup
markdown
Copy code
## Backend Setup

### Requirements
- Node.js: Ensure you have Node.js installed (v14 or higher).

### Installation

1. Navigate to the Server Directory
   ```bash
   cd server
Install Backend Dependencies

bash
Copy code
npm install
Configure Multer Storage Modify the multer.js file in the /middleware directory to set the appropriate storage configuration for file uploads.

perl
Copy code

### Running the Server
```markdown
### Running the Server

1. Start the Server
   ```bash
   npm start
The server will run on http://localhost:8000.

csharp
Copy code

### API Endpoints
```markdown
### API Endpoints
- **GET /**: Returns a simple welcome message.
- **POST /uploads**: Accepts video file uploads and triggers the transcoding process. The response includes the video URL for playback.

### Example Response

### Example Response
```json
{
  "message": "Video converted to HLS",
  "videoUrl": "http://localhost:8000/uploads/courses/{lessonId}/index.m3u8",
  "lessonId": "{lessonId}"
}


### Frontend Setup
```markdown
## Frontend Setup

### Requirements
- Node.js: Ensure you have Node.js installed (v14 or higher).

### Installation

1. Navigate to Frontend Directory
   ```bash
   cd ../frontend
\
### Running the Frontend
```markdown
### Running the Frontend

1. Start the Frontend
   ```bash
   npm start
   folowed by npm i


### Usage
```markdown
## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the video upload form to select and upload a video file.
3. Once the video is uploaded, the server will transcode it, and a playable link will be provided.
4. Click the "Play Movie" button to start watching the video.

## Additional Notes
- Make sure to handle the video URL correctly in the frontend after the upload.
- The UI is designed to be responsive and works on various screen sizes.


