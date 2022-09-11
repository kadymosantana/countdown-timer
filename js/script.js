class Countdown {
  constructor(futureDate) {
    this.futureDate = futureDate;
  }

  get actualDate() {
    return new Date();
  }

  get _futureDate() {
    return new Date(this.futureDate);
  }

  get _timeStampDiff() {
    return this._futureDate.getTime() - this.actualDate.getTime();
  }

  get days() {
    return Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000));
  }

  get hours() {
    return Math.floor(this._timeStampDiff / (60 * 60 * 1000));
  }

  get minutes() {
    return Math.floor(this._timeStampDiff / (60 * 1000));
  }

  get seconds() {
    return Math.floor(this._timeStampDiff / 1000);
  }

  get total() {
    const days = this.days;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}

const form = document.querySelector("form");
const inputDate = document.querySelector('#date')
const botaoIniciar = document.querySelector("button");
const tempos = document.querySelectorAll('[data-tempo="numero"]');

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault()

  const dataArray = inputDate.value.split('-').reverse()
  const dataFormatada = ([dataArray[1], dataArray[0], dataArray[2]])

  const tempoRestante = new Countdown(dataFormatada)
  
  const attElements = setInterval(() => {
    tempos.forEach(tempo => 
      tempo.innerText = tempoRestante.total[tempo.getAttribute('class')]
    )
  }, 1000)
  
}
