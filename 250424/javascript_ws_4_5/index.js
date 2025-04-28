let count1 = 0
let count2 = 0

const choices = ['scissors', 'rock', 'paper']
const player1Img = document.querySelector('#player1-img')
const player2Img = document.querySelector('#player2-img')
const buttons = document.querySelectorAll('.button-box button')
const modalContent = document.querySelector('.modal-content')
const modal = document.querySelector('.modal')
const countA = document.querySelector('.countA')
const countB = document.querySelector('.countB')

let player2Choice = null
let intervalId = null

function getImage(idx) {
  const fileName = './img/' + choices[idx] + '.png'
  player2Img.src = fileName
  player2Choice = choices[idx]
  return player2Choice
}

function playGame(player1, player2) {
  if (player1 === player2) return 0

  if (player1 === 'scissors') {
    if (player2 === 'rock') {
      count2++
      return 2
    } else if (player2 === 'paper') {
      count1++
      return 1
    }
  }

  if (player1 === 'rock') {
    if (player2 === 'scissors') {
      count1++
      return 1
    } else if (player2 === 'paper') {
      count2++
      return 2
    }
  }

  if (player1 === 'paper') {
    if (player2 === 'rock') {
      count1++
      return 1
    } else if (player2 === 'scissors') {
      count2++
      return 2
    }
  }

  return 0
}

function buttonClickHandler(player1Choice) {
  // 버튼 비활성화
  buttons.forEach(btn => btn.disabled = true)

  // 플레이어1 이미지 고정
  player1Img.src = `./img/${player1Choice}.png`

  // 상대방 이미지 자동 변경
  intervalId = setInterval(() => {
    const idx = Math.floor(Math.random() * 3)
    getImage(idx)
  }, 100)

  setTimeout(() => {
    clearInterval(intervalId)

    const result = playGame(player1Choice, player2Choice)

    if (result === 1) {
      modalContent.textContent = '🎉 Player 1 승리!'
      countA.textContent = count1
    } else if (result === 2) {
      modalContent.textContent = '🔥 Player 2 승리!'
      countB.textContent = count2
    } else {
      modalContent.textContent = '😐 무승부!'
    }

    modal.style.display = 'flex'

    setTimeout(() => {
      modal.style.display = 'none'
      buttons.forEach(btn => btn.disabled = false)
    }, 2000)
  }, 3000)
}

// 버튼 이벤트 등록
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    if (button.id === 'scissors-button') {
      buttonClickHandler('scissors')
    } else if (button.id === 'rock-button') {
      buttonClickHandler('rock')
    } else if (button.id === 'paper-button') {
      buttonClickHandler('paper')
    }
  })
})
  
