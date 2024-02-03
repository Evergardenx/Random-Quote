const quoteDefault = {
    author: 'George Bernard Shaw',
    tags: ['Famous Quotes', 'Inspirational'],
    content: 'Learn from yesterday, live for today,  hope for tomorrow.'
}

const authorEl = document.querySelector(".author")
const quoteEl = document.querySelector(".quote")
const tagsEl = document.querySelector(".tags")

const btnRandom = document.getElementById("btn-random")
btnRandom.addEventListener("click", generateRandomQuote)

const btnCopyClipboard = document.getElementById("btn-copy-clipboard")
btnCopyClipboard.addEventListener("click",copyInClipboard )

function copyInClipboard() {
    const quotePasted = quoteEl.innerHTML.replace(/['"]+/g, '')
    navigator.clipboard.writeText(quotePasted)
    alert("Quote copied : " + quotePasted)
}

async function generateRandomQuote() {
    const [code, result]  = await getRandomQuote()
    if(code == "200") {
        const resultObject  = JSON.parse(result)
        fillCard (resultObject[0]["author"], resultObject[0]["content"], resultObject[0]["tags"])
    } else {
        fillCard (quoteDefault["author"], quoteDefault["content"], quoteDefault["tags"])
    }
}
async function getRandomQuote() {
    const url = 'https://api.quotable.io/quotes/random'
    try {
        const response = await fetch(url)
        const result = await response.text()
        if(result.includes("statusCode")) {
            return ["400", result]
        }
        return ["200", result]
    } catch (error) {
        return ["400", "error"]
    }
}
function fillCard (author, quote, tags) {
    authorEl.innerHTML = author
    quoteEl.innerHTML ='"' + quote + '"'  
    let tagsToPrint = ""
    for (let tag of tags) {
        tagsToPrint += `<span class="tag-el">` + tag + `</span>`
    }
    tagsEl.innerHTML = tagsToPrint
}

generateRandomQuote()



