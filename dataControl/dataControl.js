let addId = 1004
let pageSize = document.querySelector("[name=pageSizeValue]").value


window.onload = function () {
    let studentArr = [
        { studentId: 1001, studentName: "duoduo", studentGrade: "一年级" },
        { studentId: 1002, studentName: "goudan", studentGrade: "二年级" },
        { studentId: 1003, studentName: "zhangsan", studentGrade: "三年级" },
        { studentId: 1004, studentName: "lisi", studentGrade: "四年级" }
    ]
    localStorage.setItem("studentInform", JSON.stringify(studentArr))
    var student = JSON.parse(localStorage.getItem("studentInform"))
    render(student)
    renderGrade()
}
//页面渲染
function render(data, page) {
    page = page || 1
    let pageN = Math.ceil(data.length / pageSize)
    document.querySelector("#page").innerHTML = page
    document.querySelector("#pageN").innerHTML = pageN
    let pageData = data.splice((page - 1) * pageSize, pageSize)
    document.querySelector("#studentInform tbody").innerHTML = ""
    for (let i = 0; i < pageData.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML = `
                <td>${pageData[i].studentId}</td>
                <td>${pageData[i].studentName}</td>
                <td>${pageData[i].studentGrade}</td>
                <td class="control">
                    <a href="javascript:void(0)">修改</a>
                    <a href="javascript:void(0)">删除</a>
                </td>
        `
        tr.querySelector(".control").children[1].addEventListener("click", del)
        tr.querySelector(".control").children[0].addEventListener("click", change)
        document.querySelector("#studentInform tbody").appendChild(tr)
    }
}
function renderGrade() {
    let student = JSON.parse(localStorage.getItem("studentInform"))

    //获取年级
    let grade = document.getElementById('grade').children
    let grade1 = document.getElementById('grade1').children
    for (let i = 0; i < student.length; i++) {
        for (let j = 0; j < grade.length; j++) {
            if (student[i].studentGrade == grade[j].innerHTML) {
                break
            }
        }
        let option = document.createElement("option")
        option.innerHTML = student[i].studentGrade
        option.value = student[i].studentId
        document.querySelector("#grade").appendChild(option)
    }
    for (let i = 0; i < student.length; i++) {
        for (let j = 0; j < grade1.length; j++) {
            if (student[i].studentGrade == grade1[j].innerHTML) {
                break
            }
        }
        let option = document.createElement("option")
        option.innerHTML = student[i].studentGrade
        option.value = student[i].studentId
        document.querySelector("#grade1").appendChild(option)
    }
}
//信息查询
//绑定查询点击事件
let searchBtn = document.getElementsByClassName("search")[0]
searchBtn.addEventListener("click", search)
//构造查询函数
function search() {
    //获取学号、姓名、年级
    //获取本地数据
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let uid = document.querySelector("[name=uid]").value
    let uname = document.querySelector("[name=uname]").value
    let ugrade = document.getElementById("grade").children
    let grade = ""
    for (let i = 1; i < ugrade.length; i++) {
        if (ugrade[i].selected) {
            grade = ugrade[i].innerHTML
        }
    }
    let arr = []
    for (let i = 0; i < student.length; i++) {
        //如果三个都有值
        if (uid && uname && grade) {
            if (student[i].studentId.toString().indexOf(uid) > 0 && student[i].studentName.indexOf(uname) >= 0 && grade == student[i].studentGrade) {
                arr.push(student[i])
                continue
            } else {
                continue
            }
        }
        //其中两个有值
        else if (uid && uname || uid && grade || uname && grade) {
            if (student[i].studentId.toString().indexOf(uid) > 0 && student[i].studentName.indexOf(uname) >= 0 || student[i].studentId.toString().indexOf(uid) > 0 && grade == student[i].studentGrade || student[i].studentName.indexOf(uname) >= 0 && grade == student[i].studentGrade) {
                arr.push(student[i])
                continue
            } else {
                continue
            }
        }

        else if (uid) {
            if (student[i].studentId.toString().indexOf(uid) >= 0) {
                arr.push(student[i])
                continue
            } else {
                continue
            }
        }
        else if (uname) {
            if (student[i].studentName.indexOf(uname) >= 0) {
                arr.push(student[i])
                continue
            } else {
                continue
            }
        }
        else if (grade) {
            if (grade == student[i].studentGrade) {
                arr.push(student[i])
                continue
            } else {
                continue
            }
        } else {
            arr = student
        }
    }
    render(arr)
}

//给本地添加数据
let add = document.getElementsByClassName("add")[0]
//添加增加绑定事件
add.addEventListener('click', addData)
//构造添加函数
function addData() {
    addId++
    document.querySelector("[name=stuName]").value = ''
    document.getElementById("grade1").value = -1
    document.querySelector("#title").innerHTML = "新增信息"
    document.querySelector("#cengjiContent").style.display = "block"
    document.querySelector("#zhezhao").style.display = "block"
    document.querySelector("[name=stuId]").value = addId
}
//取消保存
document.getElementById("cancel").addEventListener("click", cancelData)
function cancelData() {
    addId--
    document.querySelector("#cengjiContent").style.display = "none"
    document.querySelector("#zhezhao").style.display = "none"
    document.querySelector("[name=stuId]").value = addId
}
//保存数据
document.getElementById("save").addEventListener("click", saveData)
function saveData() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    if (document.getElementById("title").innerText == "新增信息") {
        let num = document.querySelector("[name=stuId]").value
        let name = document.querySelector("[name=stuName]").value
        let newGrade = document.getElementById("grade1").children
        let grade = ""
        for (let i = 1; i < newGrade.length; i++) {
            if (newGrade[i].selected) {
                grade = newGrade[i].innerHTML
            }
        }
        let newArr = [{
            studentId: num,
            studentName: name,
            studentGrade: grade
        }]
        if (isTrue(name, grade)) {
            addId++
            document.querySelector("[name=stuId]").value = addId
            student = student.concat(newArr)
            localStorage.setItem("studentInform", JSON.stringify(student))
            render(student)
        } else {
            alert("姓名和年级不能为空或者不合法")
        }
    } else {
        let newName = document.querySelector("[name=stuName]").value
        let newGr = ""
        for (let i = 0; i < document.getElementById("grade1").children.length; i++) {
            if (document.getElementById("grade1").children[i].selected) {
                newGr = document.getElementById("grade1").children[i].innerHTML
            }
        }
        for (let i = 0; i < student.length; i++) {
            if (document.querySelector("[name=stuId]").value == student[i].studentId) {
                student[i].studentName = newName
                student[i].studentGrade = newGr
            }
        }
        if (isTrue(newName, newGr)) {
            render(student)
            localStorage.setItem("studentInform", JSON.stringify(student))
        }
    }
}
//非空校验
function isTrue(name, data) {
    if (!name) {
        return false
    } else if (!data) {
        return false
    } else {
        return true
    }

}
//删除数据
function del() {
    console.log(this.parentNode.parentNode.children[0].innerHTML);
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let num
    console.log(student);
    for (let i = 0; i < document.querySelector("#studentInform tbody").children.length; i++) {
        if (document.querySelector("#studentInform tbody").children[i].children[0].innerHTML == this.parentNode.parentNode.children[0].innerHTML) {
            student.splice(i, 1)
        }
    }
    render(student)
    localStorage.setItem("studentInform", JSON.stringify(student))
}
//修改数据
function change() {
    document.getElementById("title").innerHTML = "修改信息"
    document.querySelector("#cengjiContent").style.display = "block"
    document.querySelector("#zhezhao").style.display = "block"
    let student = JSON.parse(localStorage.getItem("studentInform"))
    for (let i = 0; i < document.querySelector("#studentInform tbody").children.length; i++) {
        if (document.querySelector("#studentInform tbody").children[i].children[0].innerHTML == this.parentNode.parentNode.children[0].innerHTML) {
            document.querySelector("[name=stuId]").value = student[i].studentId
            document.querySelector("[name=stuName]").value = student[i].studentName
            document.getElementById("grade1").value = student[i].studentId
        }
    }
}
//下一页
document.querySelector("#nextPage").addEventListener("click", nextP)
function nextP() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let newPage = document.querySelector("#page").innerHTML
    newPage >= Math.ceil(student.length / pageSize) ? newPage = Math.ceil(student.length / pageSize) : newPage++
    render(student, newPage)
}
//上一页
document.querySelector("#previousPage").addEventListener("click", previousP)
function previousP() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let newPage = document.querySelector("#page").innerHTML
    newPage <= 1 ? newPage = 1 : newPage--
    render(student, newPage)
}
//跳转首页
document.querySelector("#firstPage").addEventListener("click", firstP)
function firstP() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    render(student,)
}
//跳转至尾页
document.querySelector("#lastPage").addEventListener("click", lastP)
function lastP() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let newPage = Math.ceil(student.length / pageSize)
    render(student, newPage)
}
//跳转页面
document.querySelector("#skipPage").addEventListener("click", skipP)
function skipP() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    let newPage = document.querySelector("[name=skipValue]").value
    if (isInt(newPage)) {
        render(student, newPage)
    } else {
        hint()
    }

}
//设置页面数据个数
document.querySelector("[name=pageSizeValue]").addEventListener("change", changePageSize)
function changePageSize() {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    if (parseInt(document.querySelector("[name=pageSizeValue]").value) == document.querySelector("[name=pageSizeValue]").value) {
        pageSize = document.querySelector("[name=pageSizeValue]").value
        render(student)
    } else {
        hint()
    }
}
//判断是否是整数
function isInt(number) {
    let student = JSON.parse(localStorage.getItem("studentInform"))
    if (parseInt(number) == number && number >= 1 && number <= Math.ceil(student.length / pageSize)) {
        return true
    } else {
        return false
    }
}
//错误提示
function hint() {
    let div = document.createElement("div")
    div.style.width = "200px"
    div.style.position = "absolute"
    div.style.top = "40%"
    div.style.left = "50%"
    div.style.transform = "translateX(-50%)"
    div.style.textAlign = "center"
    div.style.border = "1px solid red"
    div.style.backgroundColor = "#ddd"
    div.innerHTML = "输入错误，重新输入"
    document.body.appendChild(div)
    setTimeout(function () {
        div.remove()
    }.bind(this, div), 1000)
}