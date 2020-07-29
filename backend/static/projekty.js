let posts = document.querySelectorAll(".post")
for (let i = 0; i < posts.length; i++) {
    posts[i].addEventListener("click", function (event) {
        let tar = event.target
        let properHref = tar.getAttribute("infoForClick")
        let div = document.createElement("div")
        div.setAttribute("id", "divForClicked")
        let img = document.createElement("img")
        img.setAttribute("id", "clickedImage")
        img.setAttribute("src", properHref)
        let img2 = document.createElement("img")
        img2.setAttribute("src", "iks.png")
        img2.setAttribute("id", "iks")
        div.appendChild(img)
        div.appendChild(img2)
        document.getElementById("main").appendChild(div)
        setTimeout(function () {
            window.scrollBy(0, currentScroll);
        }, 1)
        document.getElementById("clickedImage").style.width = "600px"
        document.getElementById("clickedImage").style.height = "400px"
        let currentScroll = document.documentElement.scrollTop
        document.getElementById("iks").addEventListener("click", function () {
            document.getElementById("divForClicked").parentNode.removeChild(document.getElementById("divForClicked"))
        })
    })
}