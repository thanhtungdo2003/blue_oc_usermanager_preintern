import readline from "readline";
import User from "./models/users.js";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("============================[ADMIN CONSOLE]===========================");
console.log("");
console.log("\x1b[34m ████  █████ █████");
console.log("\x1b[34m █   █   █     █  ");
console.log("\x1b[34m███  █   █     █  ");
console.log("\x1b[34m █   █   █     █  ");
console.log("\x1b[34m ████    █     █  ");
console.log("\x1b[0m");

console.log("Ctrl + C để thoát");

console.log("Các lệnh điều khiển: ");
const cmds = ["setrole, rolelist, createrole, help, users"]
console.log(cmds);

function askCommand() {
    rl.question(">>> ", (command) => {
        switch (command) {
            case "users":

                User.getAll().then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err.message);
                })
                askCommand();

                break;
            case "setrole":
                rl.question("Nhập userId: ", (username) => {
                    rl.question("Nhập role: ", (perm) => {
                        User.setRole(username, perm).then(message => {
                            console.log(message)
                            console.log(`🔹 Đã cấp perm ${perm} cho tài khoản ${username}`);
                        }).catch(err => {
                            console.log(err.message);
                        })
                        askCommand();
                    });
                });
                break;
            case "rolelist":
                User.roleGetAll().then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err.message);
                })
                askCommand();
                break;
            case "createrole":
                rl.question("Nhập tên role mới: ", (perm) => {
                    User.createRole(perm).then(message => {
                        console.log(message)
                    }).catch(err => {
                        console.log(err.message);
                    })
                    askCommand();
                });
                break;
            case "help":
                console.log(cmds)
                break;
            default:
                console.log("Lệnh không hợp lệ. Vui lòng nhập lại.");
                askCommand();
                break;
        }
    });
}

// Bắt đầu nhận lệnh
askCommand();