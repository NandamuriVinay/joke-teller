const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: '00582ad6871f42dc9fc950e2a771b2c1',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        joke = data.joke;
        // Passing Joke to VoiceRSS API
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('Oh no! There was an error.',error)
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);