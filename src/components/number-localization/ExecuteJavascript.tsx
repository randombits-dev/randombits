import {createSignal} from "solid-js";

const calc = (code) => {
    try {
        return eval(code);
    } catch (e) {
        return e.message;
    }
};

const ExecuteJavascript = ({code: initalCode}) => {
    const [code, setCode] = createSignal(initalCode);
    const [changed, setChanged] = createSignal(false);
    const updateCode = (e) => {
        setChanged(true);
        setCode(e.target.value);
    };
    const reset = () => {
        setChanged(false);
        setCode(initalCode);
    };

    return (
        <div class="exec">
            <div class="exec-input">
                <div class="exec-symbol">
                    <div class="arrow-right"></div>
                </div>
                <input spellcheck="false" type="text" value={code()} oninput={updateCode}/>
                <div class={'exec-reset' + (changed() ? ' visible' : '')} onClick={reset}>Reset</div>
            </div>

            <div class="exec-out">
                <div>{JSON.stringify(calc(code()))}</div>
            </div>
        </div>
    );
}

export default ExecuteJavascript