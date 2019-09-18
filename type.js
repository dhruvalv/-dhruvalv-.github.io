class Typing {
    constructor(element, descriptions) {
        this.descriptions = descriptions
        this.element = element

        this.clearing = false
        this.loop = 0
    }

    animate() {
        const
            index = this.loop % this.descriptions.length,
            phrase = this.descriptions[index],
            letters = phrase.split('')

        if (!this.clearing)
            this.type(letters, '')
        else
            this.backspace(letters)
    }

    type(letters, current) {
        const
            self = this,
            text = current + letters.shift(),
            interval = (letters.length) ? 250 : 900

        this.element.innerHTML = `<span class="wrap">&nbsp; ${text}</span>`

        setTimeout(() => {
            if (letters.length) {
                self.type(letters, text)
            } else {
                self.clearing = true
                self.animate()
            }
        }, interval)
    }

    article(letters) {
        if (['a', 'e', 'i', 'o', 'u'].includes(letters[0]))
            letters.unshift('n', ' ')
        else
            letters.unshift(' ')

        return letters
    }

    backspace(letters) {
        letters.pop()

        const
            self = this,
            text = letters.join(''),
            interval = (letters.length) ? 125 : 500

        this.element.innerHTML = `<span class="wrap">&nbsp; ${text}</span>`

        setTimeout(() => {
            if (letters.length) {
                self.backspace(letters)
            }  else {
                self.clearing = false
                self.loop++
                self.animate()
            }
        }, interval)
    }
}

window.onload = () => {
    const
        element = document.querySelector('.intro'),
        article = document.getElementById('typing'),
        descriptions = article.dataset.descriptions.split(','),
        typing = new Typing(element, descriptions)

    console.log(descriptions)
    typing.animate()
}