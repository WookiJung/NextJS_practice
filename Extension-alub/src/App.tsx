import React, { useEffect, useRef, useState } from 'react';
import { ChromeMessage, Sender, getCurrentTabUId, getCurrentTabUrl} from './types';
import './App.css'

import { Form, Button} from 'react-bootstrap';

import { useForm, Controller } from 'react-hook-form';
const App = () => {
    const [url, setUrl] = useState('')
    const [responseFromContent, setResponseFromContent] = useState('')
    const {
        trigger,
        watch,
        handleSubmit,
        control,
      } = useForm();
    const hours = useRef()
    const minutes = useRef()
    const seconds = useRef()
    const [config, setConfig] = useState("DEFAULT")

    useEffect(() => {
        getCurrentTabUrl((url) => {
            setUrl(url || "undefined")
        })
    },[])

    
    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }
        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    
    const sendRemoveMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "delete logo",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    };

    const setTimer = () => {
        hours.current = watch("hours", "")
        minutes.current = watch("minutes", "")
        seconds.current = watch("seconds", "")
        const message: ChromeMessage = {
            from: Sender.React,
            message: {data:{hh: hours, mm: minutes, ss:seconds}, message:"setTimer"},
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    }

    return (
        <div className="App">
            
                <div>
                    <p>URL:</p>
                    <p>{url}</p>

                </div>
                <button onClick={sendTestMessage}> Send Message from chrome</button>
                <button onClick={sendRemoveMessage}> Delete logo</button>

                <div>
                    <Form onSubmit={handleSubmit(setTimer)}>
                        <Form.Group>
                            <Controller
                                name="hours"
                                control = {control}
                                rules = {{
                                    pattern: {
                                        value: /^(?=.*\d)/,
                                        message: "숫자를 적어주세요"
                                    }
                                }}
                                defaultValue = "0"
                                render={({ field }) => (
                                    <Form.Control
                                      placeholder="시"
                                      {...field}
                                    />)}
                            />
                            <span>:</span>
                            <span>
                            <Controller
                                name="minutes"
                                control = {control}
                                rules = {{
                                    pattern: {
                                        value: /^(?=[0-59])/,
                                        message: "0-59사이의 숫자를 적어주세요"
                                    }}}
                                defaultValue= "0"
                                render={({ field }) => (
                                    <Form.Control
                                      placeholder="분"
                                      {...field}
                                    />)}
                            />
                            </span>
                            <span>:</span>
                            <span>
                            <Controller
                                name="seconds"
                                control = {control}
                                rules = {{
                                    pattern: {
                                        value: /^(?=[0-59])/,
                                        message: "0-59사이의 숫자를 적어주세요"
                                    }}}
                                defaultValue= "0"
                                render={({ field }) => (
                                    <Form.Control
                                      placeholder="초"
                                      {...field}
                                    />)}
                            />
                            </span>
                        </Form.Group>
                        <div>
                            <Button type="submit">타이머 설정하기</Button>
                        </div>
                    </Form>  
                </div>
                <p>Response from content:</p>
                <p>
                    {responseFromContent}
                </p>
                <p>{config}</p>
        </div>
    );
};

export default App