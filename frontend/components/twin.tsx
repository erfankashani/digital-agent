'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Agent avatar — placeholder for now. Swap the <User /> icon for an
// <img src="/erfan-agent.jpg" /> once a real photo of Erfan is added.
function AgentAvatar() {
    return (
        <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-rose-400 text-white">
            <User className="h-4 w-4" />
        </div>
    );
}

function UserAvatar() {
    return (
        <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center bg-white/[0.1] border border-white/[0.08] text-white/60">
            <User className="h-4 w-4" />
        </div>
    );
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        if (messages.length > 0) scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        inputRef.current?.focus();
        setIsLoading(true);

        try {
            const response = await fetch(
                'https://8g72jelcri.execute-api.us-east-2.amazonaws.com/chat',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: input,
                        session_id: sessionId || undefined,
                    }),
                }
            );

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();
            if (!sessionId) setSessionId(data.session_id);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="mx-auto w-full max-w-xl">
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] overflow-hidden">
                {hasMessages && (
                    <div
                        ref={scrollRef}
                        className="max-h-72 overflow-y-auto px-4 py-3 space-y-3 text-left"
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={
                                    message.role === 'user'
                                        ? 'flex justify-end items-end gap-2'
                                        : 'flex justify-start items-end gap-2'
                                }
                            >
                                {message.role === 'assistant' && <AgentAvatar />}
                                <div
                                    className={
                                        message.role === 'user'
                                            ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-white/[0.08] border border-white/[0.06] px-3 py-2 text-sm text-white/90'
                                            : 'max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.05] px-3 py-2 text-sm text-white/80'
                                    }
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </p>
                                </div>
                                {message.role === 'user' && <UserAvatar />}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start items-end gap-2">
                                <AgentAvatar />
                                <div className="rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.05] px-3 py-2.5">
                                    <div className="flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce" />
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce delay-100" />
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce delay-200" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div
                    className={
                        hasMessages
                            ? 'border-t border-white/[0.06] p-2'
                            : 'p-2'
                    }
                >
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={
                                hasMessages ? '' : 'Ask my digital twin anything...'
                            }
                            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-rose-400 text-white shadow-sm hover:from-indigo-300 hover:to-rose-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            aria-label="Send message"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {!hasMessages && (
                <p className="mt-3 text-center text-xs text-white/30 tracking-wide">
                    Powered by AI digital-twin agent trained on my career
                </p>
            )}
        </div>
    );
}
