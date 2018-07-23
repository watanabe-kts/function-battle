let funcs = [
  { id: 1, f: x => x + 1, text: 'x + 1' },
  { id: 2, f: x => 2 * x, text: '2x' },
  { id: 3, f: x => 3 * x, text: '3x' },
  { id: 4, f: x => x * x, text: 'x^2' },
  { id: 5, f: x => x - 1, text: 'x - 1'},
  { id: 6, f: x => x + 2, text: 'x + 2' },
  { id: 7, f: x => x +10, text: 'x + 10' },
  { id: 8, f: x => 5 * x, text: '5x'},
]

let f
let fChoices
let g
let gChoices

function shuffled(array) {
  let a = array.concat()
  for(var i = a.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[r];
    a[r] = tmp;
  }
  return a
}

const randomInt = max => Math.floor(Math.random() * 4)

const answerButtons = {}
for (let s of ['f', 'g']) {
  const disp = document.querySelector(`#answer-display-${s}`)
  for (let i = 0; i < 4; ++i) {
    const btn = document.querySelector(`#answer-${s}${i}`)
    answerButtons[`${s}${i}`] = btn
    btn.addEventListener('click', e => {
      console.log(e)
      disp.textContent = e.target.textContent
    })
  }
}

function nextQuestion() {
  const funcsTmp = shuffled(funcs)
  fChoices = funcsTmp.slice(0, 4)
  f = fChoices[randomInt(4)]
  gChoices = funcsTmp.slice(4, 8)
  g = gChoices[randomInt(4)]

  for (let i = 0; i < 4; ++i) {
    answerButtons[`f${i}`].textContent = fChoices[i].text
    answerButtons[`g${i}`].textContent = gChoices[i].text
  }
}

document.querySelector('#button-next').addEventListener('click', (e) => {
  console.log(e)
  nextQuestion()
})

const inputX = document.querySelector('#input-x')
const outputY = document.querySelector('#output-y')
document.querySelector('#input-submit').addEventListener('click', (e) => {
  const x = Number.parseInt(inputX.value)
  const y = g.f(f.f(x))
  outputY.textContent = y
})

const result = document.querySelector('#result')
document.querySelector('#answer-submit').addEventListener('click', (e) => {
  result.textContent = `f(x) = ${f.text}, g(x) = ${g.text}`
})

nextQuestion()
