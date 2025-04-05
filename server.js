import express from "express";
import userRouter from "./src/routers/users.js";
import genreRouter from "./src/routers/genres.js";
import authorRouter from "./src/routers/authors.js";
import bookRouter from "./src/routers/books.js";
import analyticsRouter from "./src/routers/analytics.js";
const app = express();
app.use(express.json());


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server đang chạy trên cổng 3000");
});
//router
app.use('/api/users', userRouter);
app.use('/api/authors', authorRouter);
app.use('/api/genres', genreRouter);
app.use('/api/books', bookRouter);
app.use('/api/analytics', analyticsRouter);


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});   