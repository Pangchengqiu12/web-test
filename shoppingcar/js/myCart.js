(function () {
    //获取每件商品的单价
    let price = document.getElementsByClassName('cart_td_5')
    //获取每件商品的数量
    let num = document.getElementsByClassName('num_input')
    //获取商品总和
    let totalPrice = document.getElementById('total')
    //获取删除
    let dele = document.getElementsByClassName('cart_td_8')
    //获取全选和全部的checkBox
    let allCheckBox = document.getElementById('allCheckBox')
    let cks = document.getElementsByName('cartCheckBox')
    //获取删除所选按钮
    let dels = document.querySelector('[alt=delete]')
    //获取新增按钮
    let newAdd = document.querySelector('#addButton')
    // （1）在指定位置显示每件商品的小计信息：
    // 页面打开默认计算显示。
    function subtotal() {
        for (let i = 0; i < price.length; i++) {
            price[i].nextElementSibling.nextElementSibling.innerHTML = (price[i].innerHTML * num[i].value).toFixed(2)
        }
    }

    // （2）在指定位置显示所有商品的总价信息：
    // 页面打开默认计算显示。
    // （3）在指定位置显示可获积分信息：
    // 页面打开默认计算显示。
    function total() {
        let sum = 0
        let integral = 0
        for (let i = 0; i < price.length; i++) {
            if (cks[i].checked) {
                sum += +price[i].nextElementSibling.nextElementSibling.innerHTML
                integral += +price[i].previousElementSibling.innerHTML * num[i].value
            }
        }
        totalPrice.innerHTML = sum.toFixed(2)
        totalPrice.nextElementSibling.nextElementSibling.innerHTML = integral
    }
    // （4）点击加减按钮同步更新数量、小计、总价、积分数据：
    // 点击 + 按钮，对应的数量 + 1，更新小计、总价、积分。
    // 点击 - 按钮，对应的数量 - 1，更新小计、总价、积分
    //给每个加号、减号、删除绑定点击事件
    function click() {
        for (let i = 0; i < num.length; i++) {
            num[i].nextElementSibling.addEventListener('click', add)
            num[i].previousElementSibling.addEventListener('click', sub)
            dele[i].addEventListener('click', del)
            //给每个cks添加点击事件
            cks[i].addEventListener('click', cksClick)
        }
    }

    function add() {
        this.previousElementSibling.value++
        subtotal()
        total()
    }
    function sub() {
        this.nextElementSibling.value--
        if (this.nextElementSibling.value <= 0) {
            if (confirm('是否删除')) {
                this.parentNode.parentNode.previousElementSibling.remove()
                this.parentNode.parentNode.remove()
            } else {
                this.nextElementSibling.value = 1
            }
        }
        subtotal()
        total()
    }
    //删除商品
    function del() {
        this.parentNode.previousElementSibling.remove()
        this.parentNode.remove()
        total()
    }
    // （5）点击全选按钮，可实现下面商
    // 品复选框的全部勾选或全部不勾选。

    //给全选按钮添加绑定事件
    allCheckBox.addEventListener('click', function () {
        for (let i = 0; i < cks.length; i++) {
            cks[i].checked = allCheckBox.checked
            total()
        }
    })
    //cks点击事件
    function cksClick() {
        total()
        for (let i = 0; i < cks.length; i++) {
            // console.log(cks[3].checked);
            if (!cks[i].checked) {
                return
            }
        }
        allCheckBox.click()
    }
    //给删除所选按钮添加绑定事件
    dels.addEventListener('click', delsFn)
    function delsFn() {
        for (let i = 0; i < cks.length; i++) {
            if (cks[i].checked) {
                cks[i].parentNode.parentNode.previousElementSibling.remove()
                cks[i].parentNode.parentNode.remove()
                i--
            }
        }
        total()
    }
    // （6）点击新增按钮，
    // 实现克隆第一个商品信息和前面的店铺信息，显示到最后。
    //给新增按钮添加点击事件
    newAdd.addEventListener('click', clone)
    function clone() {
        price[0].parentNode.parentNode.appendChild(price[0].parentNode.previousElementSibling.cloneNode(true))
        price[0].parentNode.parentNode.appendChild(price[0].parentNode.cloneNode(true))
        click()
    }
    click()
    subtotal()
    total()
})()