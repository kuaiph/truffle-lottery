import '../stylesheets/app.css'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import smartLotteryArtifact from '../../build/contracts/SmartLottery.json'

const SmartLottery = contract(smartLotteryArtifact)

const App = {
  start: () => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(err)
      }

      App.account = accounts[0]
    })

    SmartLottery.setProvider(web3.currentProvider)

    SmartLottery
      .deployed()
      .then(instance => Promise.all([instance.getParticipants(), instance.getPotValue()]))
      .then(([participants, potValue]) => {
        App.printParticipants(participants)
        App.printPotValue(potValue)
      })
      .then(() => App.listenOnUserInput())
  },

  printParticipants: participants => {
    const participantsHtml = participants.map((participant, i) => `<li>${i}. slot: ${participant}</li>`).join('')
    document.getElementById('participants').innerHTML = participantsHtml
  },

  printPotValue: potValue => {
    document.getElementById('potValue').innerHTML = potValue
  },

  listenOnUserInput: () => {
    document.getElementById('bet').onclick = () => {
      const slot = document.getElementById('slot').value
      App.placeABet(slot)
    }

    document.getElementById('reload').onclick = () => {
      SmartLottery
        .deployed()
        .then(instance => instance.getParticipants())
        .then(participants => App.printParticipants(participants))
    }
  },

  placeABet: (slot) => {
    SmartLottery
      .deployed()
      .then(instance => {
        instance.bet(slot, { from: App.account, value: 1000000000000000000, gas: 4712388 })
        return instance
      })
  }
}

window.addEventListener('load', () => {
  window.web3 = new Web3(web3.currentProvider)

  App.start()
})

window.App = App
