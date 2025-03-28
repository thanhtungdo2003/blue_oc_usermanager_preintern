export const message = (title, content) => {
    return `[${Date.now().toLocaleString("vi-VN")}]- [${title}]: ${content}`
}