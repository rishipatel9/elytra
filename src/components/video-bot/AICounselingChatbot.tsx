'use client'
import InteractiveAvatarTextInput from './InteractiveAvatarTextInput'
import { Chip } from '@nextui-org/chip'
import { Button } from '../ui/button'
import { Toaster } from 'sonner'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useAvtarSession from '@/hooks/useAvtarSession'
export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}
export default function AICounselingChatbot({ user }: { user: User }) {
    const {
        messages,
        text,
        setText,
        handleSpeak,
        handleInterrupt,
        handleVoiceIconClick,
        isVoiceMode,
        mediaStream,
        endSessionPage,
        loading,
        subtitles,
        additionalContext,
        endSession,
        messagesEndRef,
        startSession,
        stream,
        setEndSessionPage,
        startLoading
    } = useAvtarSession({ user });
    return (
        <>
            {/* {stream && !endSessionPage ? ( */}
                <div className="min-h-screen flex flex-col font-sans  ">
                    <main className=" flex-grow flex flex-col md:flex-row p-4 gap-4 mx-auto w-full  dark:bg-[#202434] bg-background ">
                        <section className="flex-1 bg-gray-100 dark:bg-[#212A39] rounded-xl border dark:border-[#3B4254] border-[#E9ECF1]  shadow-lg overflow-hidden">
                            <div className="aspect-video bg-gray-200 relative">
                                <video ref={mediaStream} className="w-full h-full object-cover" autoPlay />
                                <div className="absolute bottom-8 w-full text-center">
                                    <p className="text-xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                                        {subtitles || "Waiting for avatar to speak..."}
                                    </p>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4"></div>
                            </div>
                            <div className="flex flex-row w-full gap-2 mt-2 bottom-3 right-3 p-4  border-t dark:border-[#3B4254]">
                                <Button className="bg-gradient-to-tr text-white rounded-lg w-full" onClick={handleInterrupt} style={{borderRadius:"0.5rem"}}>
                                    Interrupt task
                                </Button>
                                <Button className="bg-gradient-to-tr to-indigo-300 w-full text-white rounded-lg" onClick={()=>setEndSessionPage(true)} style={{borderRadius:"0.5rem"}}>
                                    End session
                                </Button>
                                <div>
                                    
                                </div>
                            </div>
                            <div className="p-4 border-t  dark:border-[#3B4254]  bg-gray-100 dark:bg-[#212A39]">
                                <h2 className="text-lg font-semibold mb-2">Useful Resources</h2>
                                <ul className="space-y-2">
                                    {additionalContext.resources.length > 0 ? (
                                        additionalContext.resources.map((url, index) => (
                                            <li key={index}>
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                                                    {url}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No resources available.</li>
                                    )}
                                </ul>
                            </div>
                            <div className="p-4 border-t  dark:border-[#3B4254] bg-gray-100 dark:bg-[#212A39]">
                                <h2 className="text-lg font-semibold mb-2">Suggested Questions</h2>
                                <ul className="space-y-2">
                                    {additionalContext.suggestedQuestions.length > 0 ? (
                                        additionalContext.suggestedQuestions.map((question, index) => (
                                            <li key={index}>
                                                <p>{question}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No suggested questions available.</li>
                                    )}
                                </ul>
                            </div>
                        </section>

                        <section className="flex-1 bg-gray-100 dark:bg-[#212A39] bg-background shadow-md flex flex-col justify-between rounded-xl border dark:border-[#3B4254] border-[#E9ECF1]">
                            <div className="flex-grow overflow-y-auto px-2" style={{ maxHeight: "calc(100vh - 90px)" }}>
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 my-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    a: ({ href, children }) => (
                                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                            {children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {message.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="border-t h-auto relative dark:border-[#3B4254] border-[#E9ECF1]">
                                <div className="w-full flex items-center">
                                    <InteractiveAvatarTextInput
                                        input={text}
                                        label=" "
                                        placeholder="Type a message..."
                                        setInput={setText}
                                        onSubmit={handleSpeak}
                                        handleVoiceIconClick={handleVoiceIconClick}
                                        isVoiceMode={isVoiceMode} />

                                    {text && (
                                        <Chip className="absolute right-16 top-1/2 -translate-y-1/2">
                                            Listening
                                        </Chip>
                                    )}
                                </div>
                            </div>
                            {/* <Mic /> */}
                            <Toaster />
                        </section>
                    </main>
                </div>
            {/* ) : (
                <div className="flex flex-col items-center justify-center h-screen bg-background dark:bg-[#202434] font-sans dark:border-[#293040] border-[#E9ECF1]">
                    <div className="max-w-6xl w-full h-full">
                        <UserSessionsTable onStartSession={startSession} startLoading={startLoading} />
                    </div>
                </div>
            )} */}
            {endSessionPage && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold text-center text-white m-2">Session Ended</h1>
                    <Button onClick={() => setEndSessionPage(false)} className="flex items-center justify-center">
                        Start New Session
                    </Button>
                    <Toaster />
                </div>
            )}
        </>
    );
}