import { ChromeMessage, Sender } from "../types";

type MessageResponse = (response?: any) => void

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

    if (isValidated && message.message === 'Hello from React') {
        response('Hello from content.js');
    }

    if (isValidated && message.message === "delete logo") {
        const search = document.getElementById("search")
        search?.parentElement?.removeChild(search)
    }
    if (isValidated && message.message === "get boj info") {
        const bojid = document.querySelector(".loginbar .username")?.innerHTML
        response(bojid)
    }
    if (isValidated && message.message === "add status table") {
        const statusTable = document.getElementById("status-table")
        console.log(statusTable)
        const commitColumn = document.createElement("th")
        commitColumn.innerHTML = "Alub-commit"
        const commitButton = document.createElement("button")
        commitButton.innerHTML = "Commit"
        if (statusTable?.childNodes[0]?.childNodes[0]?.childNodes?.length === 9){
            statusTable?.childNodes[0]?.childNodes[0]?.appendChild(commitColumn)
        }
        statusTable?.childNodes[1]?.childNodes[0]?.appendChild(commitButton)
        response("추가했어요!")
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