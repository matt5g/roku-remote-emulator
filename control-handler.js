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
    Back: 'escape',
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
let text = '';       // what has been applied on the PC so far
let latest = '';     // newest full text received from the app
let busy = false;
let fieldId;         // id of the field the current text belongs to

const handleTextInput = async function(req) {
    // If the app tags writes with a field id, a new field starts from empty text.
    // 'param-textedit-id' is a guess at the key; if it's absent this does nothing.
    const id = req['param-textedit-id'];
    if (id !== fieldId) {
        fieldId = id;
        text = '';
    }

    latest = req['param-text'] ?? '';
    if (busy) return;      // the running loop will pick up the newer text
    busy = true;
    try {
        while (text !== latest) {
            const prev = text;
            const goal = latest;
            text = goal;

            if (goal.startsWith(prev)) {
                // text grew: type only the new part
                await km.typeText(goal.slice(prev.length));
            } else if (prev.startsWith(goal)) {
                // text shrank: one backspace per removed character
                const removed = Array.from(prev).length - Array.from(goal).length;
                for (let i = 0; i < removed; i++) {
                    await km.pressKey('backspace');
                }
            } else {
                console.log('Mid-text edit ignored:', JSON.stringify(prev), '->', JSON.stringify(goal));
            }
        }
    } catch (err) {
        console.error('Text input failed:\n' + err);
    } finally {
        busy = false;
    }
};
export { handleInput, handleTextInput };
