//导入fs模块
const fs = require("fs")
//导入path模块
const path = require("path")
function ReFile(dataStr, path) {
    this.dataStr = dataStr
    this.path = path
}
ReFile.prototype = {
    constructor: ReFile,
    reWrite: function () {
        fs.writeFile(path.join(__dirname, this.path), this.dataStr, err => {
            if (err) return console.log('写入错误')
            console.log("写入成功");
        })
    }
}
function getData() {
    //定义正则匹配style和script
    let regStyle = /<style>[\s\S]*<\/style>/
    let regScript = /<script>[\s\S]*<\/script>/
    fs.readFile(path.join(__dirname, "/5.html"), "utf8", (err, dataStr) => {
        if (err) return console.log("读取失败" + err.message)
        let newCss = regStyle.exec(dataStr)[0].replace("<style>", "").replace("</style>", "")
        let newJs = regScript.exec(dataStr)[0].replace("<script>", "").replace("</script>", "")
        let newHtml = dataStr.replace(regStyle.exec(dataStr)[0], "<link rel='stylesheet' href='./5.css'>").replace(regScript.exec(dataStr)[0], "<script src='./5.js'></script>")
        let reCss = new ReFile(newCss, "/7-26/5.css")
        reCss.reWrite()
        let reJs = new ReFile(newJs, "/7-26/5.js")
        reJs.reWrite()
        let reHtml = new ReFile(newHtml, "/7-26/5.html")
        reHtml.reWrite()
    })
}
getData()