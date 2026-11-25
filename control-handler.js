import { Kimetra } from "kimetra";
const km = Kimetra({
    unit: 'millisecond', // 'microsecond' (default) or 'millisecond'
    delay: 0,            // delay before an action starts
    interval: 700,       // gap between repeated actions
    duration: 700,       // how long a key or mouse button is held
    hotkeyDelay: 1500    // how long a combination is held before release
});
const keyMap = {
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right',
    Select: 'enter',
    Back: 'esc',
    Play: 'space'
};
const specialInputs = {
    Info: doMenu,
    Home: "idkyet"
}
function doMenu() {
    console.log("not yet configured: " + this)
}
function superUp() {
    km.repeatKey('up', 11, 2)
}



const handleInput = async function(req) {
    let pressedKey = keyMap[req['param-key']]
    try {
        await km.pressKey(pressedKey)
    } catch (err) {
        console.error("Key behavior not configured:\n" + err)
    }
}
let text
const handleTextInput = async function(req) {
    if (text && req['param-text'].length < text.length){
        await km.pressKey('backspace')
    }
   text = req['param-text']
   console.log(text)
   console.log(text.at(-1))
   await km.typeText(text.at(-1))
   
}
export { handleInput, handleTextInput };
