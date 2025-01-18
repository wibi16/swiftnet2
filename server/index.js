const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const spawn = require("child_process").spawn;
const http = require("http");
const { Server } = require("socket.io");

/**
 * APP
 */
const app = express();

app.use(cors());
app.use(express.json());
/**
 * server (sockets)
 */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://www.swiftnet.ai",
    // origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let processes = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // Clean up the process when client disconnects
    if (processes.has(socket.id)) {
      processes.delete(socket.id);
    }
  });

  socket.on("process_task", (data) => {
    console.log(`Task received: ${data.task}, mode:${data.humanInteraction}`);

    const pythonData = {
      task: data.task,
      key: process.env.API_KEY,
      humanInteraction: data.humanInteraction != "single",
      socketId: socket.id,
    };

    const childProcess = spawn("python", [
      "./python/swiftnet_handler.py",
      JSON.stringify(pythonData),
    ]);
    // Store the entire child process
    processes.set(socket.id, childProcess);

    childProcess.stdout.on("data", (data) => {
      const output = data.toString();
      socket.emit("stream_response", {
        type: "message",
        data: output,
      });
    });

    childProcess.stderr.on("data", (data) => {
      const output = data.toString();
      console.log(output);
      socket.emit("stream_response", {
        type: "message",
        data: output,
      });
    });

    childProcess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      socket.emit("stream_response", {
        type: "complete",
      });
      // Clean up the process when it's done
      processes.delete(socket.id);
    });

    childProcess.on("error", (error) => {
      console.error("Process error:", error);
      socket.emit("stream_response", {
        type: "error",
        data: "Failed to execute task process",
      });
      // Clean up the process on error
      processes.delete(socket.id);
    });
  });

  socket.on("user_response", (data) => {
    const process = processes.get(socket.id);
    if (process && process.stdin) {
      process.stdin.write(data.response + "\n");
    } else {
      socket.emit("stream_response", {
        type: "error",
        data: "No active process found or process doesn't support input",
      });
    }
  });
});

/**
 * ROUTES
 */

/**
 * @route magentic-task
 * @description endpoint to handle requests to autogen magentic ai agents
 * @access public
 * @arguments tasks
 * @returns output from magentic agent handled by orchester
 * @deprecated use socket api instead
 */
app.post("/magentic-task", (req, res) => {
  // Global container
  const data = {
    task: req.body.task,
    key: process.env.API_KEY,
    humanInteraction: req.body.humanInteraction,
  };

  // Spawn process:)
  let outputBuffer = "";

  const childProcess = spawn("python", [
    "./python/swiftnet_handler.py",
    JSON.stringify(data),
  ]);

  childProcess.stdout.on("data", (data) => {
    outputBuffer += data.toString();
  });

  childProcess.stderr.on("data", (data) => {
    console.error("Python stderr:", data.toString());
  });

  childProcess.on("close", (code) => {
    console.info(`Child process exited with code ${code}`);
    try {
      // Parse the complete output buffer
      const result = JSON.parse(outputBuffer);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to parse Python output",
        raw: outputBuffer,
        formatted: segregateChat(outputBuffer),
      });
    }
  });

  childProcess.on("error", (error) => {
    console.error("Failed to start child process:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to start Python process",
      error: error.message,
    });
  });
});

/**
 * LISTEN
 */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.info(`server started running at port ===> ${PORT}`);
});
