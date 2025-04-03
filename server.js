import express from "express";
import userRouter from "./src/routers/users.js";
const app = express();
app.use(express.json());


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server đang chạy trên cổng 3000");
});
//router
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});   