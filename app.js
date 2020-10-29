const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.querySelector('main');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

let voices = [];

const message = new SpeechSynthesisUtterance();

const setTextMessage = text =>{
   message.text = text;
};

const speakText = _=> {
    speechSynthesis.speak(message)
};

const createBox = item => {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', _=> {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(_=>{box.classList.remove('active')}, 800)
  });

  main.appendChild(box);
};

const getVoices = _ => {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option)
  })
};

const setVoice = e => {
  message.voice = voices.find(voice => voice.name === e.target.value)

};

speechSynthesis.addEventListener('voiceschanged', getVoices);

data.forEach(createBox);

toggleBtn.addEventListener('click', _=>textBox.classList.toggle('show'));
closeBtn.addEventListener('click', _=>textBox.classList.toggle('show'));

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', _=> {
  setTextMessage(textArea.value);
  speakText()
});
