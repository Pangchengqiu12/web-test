//导入fs模块
let fs = require("fs")

//读取
fs.readFile(__dirname + "/file/1.text", "utf-8", function (err, dataStr) {
    if (err) {
        return console.log("读取失败" + err.message);
    }
    console.log("读取成功" + dataStr);
    let oldArr = dataStr.split(" ")
    let arrNew = []
    oldArr.forEach(item => {
        arrNew.push(item.replace("=", "："))
    })
    //转换成字符串
    arrNew = arrNew.join("\r\n")
    //写入
    fs.writeFile("./file/2.text", arrNew, "utf-8", function (err) { })
})