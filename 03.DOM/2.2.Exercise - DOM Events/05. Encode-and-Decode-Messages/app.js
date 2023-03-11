function encodeAndDecodeMessages() {
    let buttonEncode = document.querySelectorAll('div button')[0]
    let butttonDecode = document.querySelectorAll('div button')[1]

    buttonEncode.addEventListener('click', encode)
    butttonDecode.addEventListener('click', decode)

    let parrentEl = document.getElementById('main')

    let message = parrentEl.getElementsByTagName('textarea')[0];
    let receiverTextArea = parrentEl.getElementsByTagName('textarea')[1];

    function encode(event) {

        let charsOfMessage = message.value.split('');
        let resultMessega = '';

        for (const char of charsOfMessage) {

            let newChar = char.charCodeAt() + 1
            resultMessega += String.fromCharCode(newChar)

        }
        receiverTextArea.textContent = resultMessega;

        parrentEl.getElementsByTagName('textarea')[0].value = '';

    }
    function decode(event) {

        let decriptMes = receiverTextArea.value;
        let charsOfMessage = decriptMes.split('');
        let resultMessega = '';

        for (const char of charsOfMessage) {

            let newChar = char.charCodeAt() - 1
            resultMessega += String.fromCharCode(newChar)

        }

        receiverTextArea.textContent = resultMessega;

    }
}