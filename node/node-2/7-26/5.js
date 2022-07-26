
        let pic1 = document.querySelector(".pic1")
        let shade = document.querySelector(".shade")
        let top1 = 0
        let left1 = 0
        let X = shade.offsetLeft
        let Y = shade.offsetTop
        pic1.addEventListener("mousemove", function (event) {
            event.stopPropagation()
            shade.style.display = "block"
            this.nextElementSibling.style.display = "block"
            console.log(top1, left1);
            if (event.clientY < 100) {
                top1 = 50
            } else if (event.clientY > 231) {
                top1 = 201
            } else {
                top1 = event.clientY - 37
            }
            if (event.clientX < 100) {
                left1 = 50
            } else if (event.clientX > 300) {
                left1 = 250
            } else {
                left1 = event.clientX - 50
            }
            shade.style.top = top1 + "px"
            shade.style.left = left1 + "px"
            this.nextElementSibling.style
            this.nextElementSibling.style.backgroundPosition = `${-(left1 - 50) * 3}px ${-(top1 - 50) * 3}px`
        })
        shade.addEventListener("mouseleave", function () {
            this.style.display = "none"
            this.parentNode.nextElementSibling.style.display = "none"
        })
    