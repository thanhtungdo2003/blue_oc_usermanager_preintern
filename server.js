import express from "express";
import userRouter from "./src/routers/users.js";
import genreRouter from "./src/routers/genres.js";
import authorRouter from "./src/routers/authors.js";
const app = express();
app.use(express.json());


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server đang chạy trên cổng 3000");
});
//router
app.use('/api', userRouter);

app.use('/api', authorRouter);

app.use('/api', genreRouter);


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});   