import { ChromeMessage, Sender, getCurrentTabUrl } from "../types";
import copyCode from "./copyCode";
import addStatusTable from "./status-table.js"

type MessageResponse = (response?: any) => void
const currentUrl = window.location.href
const validateSender = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
) => {
    return sender.id === chrome.runtime.id && message.from === Sender.React;
}

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {


    const isValidated = validateSender(message, sender);
    

    if (isValidated && message.message === "copy"){
        console.log("카피하려고?")
        copyCode();
    }

    if (isValidated && message.message === 'Hello from React') {
        response('Hello from content.js');
    }
    if (isValidated && message.message.message === "setTimer") {
        const data = message.message.data
        const hh = parseInt(data.hh.current.value)
        const mm = parseInt(data.mm.current.value)
        const ss = parseInt(data.ss.current.value)
        const render = document.createElement("timerdiv")


        response("타이머 셋팅 완료")
        
    }

    if (isValidated && message.message=== "alarm") {
        response("노티하기")
        
    }

    if (isValidated && message.message === "delete logo") {
        const search = document.getElementById("search")
        search?.parentElement?.removeChild(search)
    }


    
}

const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}



main();
if (currentUrl.includes("acmicpc.net/status")){
    addStatusTable();
}
if (currentUrl.includes("acmicpc.net/source")){
    console.log("카피하려고?")
    copyCode();
}

