'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { ChatSidebar } from './ChatSidebar'
import { useTRPC } from '@/trpc/client'
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

// so humare pass ek fll arrayv ke fimer me sare session ayege and ek iniita jo phele vala hha
interface ChatInterfaceProps {
    chatSessions: {
        id: string
        title: string
        createdAt: string
        updatedAt: string
        userId: string
        lastMessageAt: string
    }[]
    initialActiveSession: {
        id: string
        title: string
        createdAt: string
        updatedAt: string
        userId: string
        lastMessageAt: string
    } | null
}

export const ChatInterface = ({
    chatSessions,
    initialActiveSession,
}: ChatInterfaceProps) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const [activeSessionId, setActiveSessionId] = useState<string | null>(
        initialActiveSession?.id ?? null
    )
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false)
    const [newChatTitle, setNewChatTitle] = useState('')

    // Pick active session (fallback to first)
    const activeSession =
        chatSessions?.find((s) => s.id === activeSessionId) ??
        chatSessions?.[0] ??
        null

    // Fetch messages for active session
    const { data: messages = [] } = useSuspenseQuery(
        trpc.message.getMessages.queryOptions(
            { chatSessionId: activeSession?.id ?? '', limit: 50 },
            { enabled: !!activeSession }
            //passingnthre. chart session id for that one whcih we need message
        )
    )

    // Mutation: send message
    const sendMessageMutation = useMutation(
        trpc.message.sendMessage.mutationOptions({
            onMutate: async ({ chatSessionId, content }) => {
                setIsTyping(true)

                queryClient.setQueryData(
                    trpc.message.getMessages.queryKey({ chatSessionId }),
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (old: any) => [
                        ...(old ?? []),
                        {
                            id: `temp-${Date.now()}`,
                            chatSessionId,
                            sender: 'user',
                            content,
                            createdAt: new Date(),
                        },
                    ]
                )
            },
            onSuccess: async (data, variables) => {
                // Replace with real user + AI message
                await queryClient.invalidateQueries(
                    trpc.message.getMessages.queryOptions({
                        chatSessionId: variables.chatSessionId,
                    })
                )
                await queryClient.invalidateQueries(
                    trpc.chat.getAllChatSessions.queryOptions()
                )
                setIsTyping(false)
            },
            onError: () => {
                setIsTyping(false)
            },
        })
    )

    const handleSendMessage = () => {
        if (!inputValue.trim() || !activeSession) return
        sendMessageMutation.mutate({
            chatSessionId: activeSession.id,
            content: inputValue,
        })
        setInputValue('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Mutation: create new chat session
    const createSession = useMutation(
        trpc.chat.createSession.mutationOptions({
            onSuccess: async (newSession) => {
                await queryClient.invalidateQueries(
                    trpc.chat.getAllChatSessions.queryOptions()
                )
                setActiveSessionId(newSession.id)
                setIsNewChatDialogOpen(false)
                setNewChatTitle('')
            },
        })
    )

    // TODO: need to provide the dialog to ask for the title of the chat session and then create the session with that title

    const handleCreateNewChat = () => {
        if (newChatTitle.trim()) {
            createSession.mutate({ title: newChatTitle.trim() })
        }
    }

    return (
        <div className="flex h-screen">
            <ChatSidebar
                sessions={chatSessions}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                onNewChat={() => setIsNewChatDialogOpen(true)}
                onSelectSession={(id) => setActiveSessionId(id)}
            />

            {/* Chat Area */}
            <div className="flex flex-1 flex-col">
                {/* Chat Header */}
                <div className="border-border border-b bg-white/50 p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                                <Bot className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-foreground font-semibold">
                                {activeSession?.title ?? 'AI Career Counselor'}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Always here to help with your career journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="mx-auto max-w-4xl space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`animate-fade-in flex items-start space-x-3 ${
                                    message.sender === 'user'
                                        ? 'flex-row-reverse space-x-reverse'
                                        : ''
                                }`}
                            >
                                <Avatar className="flex-shrink-0">
                                    <AvatarFallback
                                        className={
                                            message.sender === 'user'
                                                ? 'bg-secondary'
                                                : 'bg-gradient-primary text-primary-foreground'
                                        }
                                    >
                                        {message.sender === 'user' ? (
                                            <User className="h-4 w-4" />
                                        ) : (
                                            <Bot className="h-4 w-4" />
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <Card
                                    className={`max-w-2xl p-4 ${
                                        message.sender === 'user'
                                            ? 'bg-chat-user text-chat-user-foreground ml-12'
                                            : 'bg-chat-ai text-chat-ai-foreground mr-12'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">
                                        {message.content}
                                    </p>
                                    <p className="mt-2 text-xs opacity-70">
                                        {new Date(
                                            message.createdAt
                                        ).toLocaleTimeString()}
                                    </p>
                                </Card>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="animate-fade-in flex items-start space-x-3">
                                <Avatar>
                                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                                        <Bot className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <Card className="bg-chat-ai text-chat-ai-foreground mr-12 p-4">
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm">
                                            AI is thinking...
                                        </span>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                {activeSession && (
                    <div className="border-border border-t bg-white/50 p-4 backdrop-blur-sm">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex items-end space-x-3">
                                <div className="flex-1">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about your career..."
                                        className="bg-muted/50 focus:bg-background min-h-[44px] resize-none border-0"
                                    />
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isTyping}
                                    variant="outline"
                                    size="icon"
                                    className="h-[44px] w-[44px] shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* New Chat Dialog */}
            <Dialog
                open={isNewChatDialogOpen}
                onOpenChange={setIsNewChatDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Chat Session</DialogTitle>
                        <DialogDescription>
                            Give your new chat session a descriptive title to
                            help you organize your conversations.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label
                                htmlFor="title"
                                className="text-right text-sm font-medium"
                            >
                                Title
                            </label>
                            <Input
                                id="title"
                                value={newChatTitle}
                                onChange={(e) =>
                                    setNewChatTitle(e.target.value)
                                }
                                placeholder="e.g., Career Advice, Resume Review..."
                                className="col-span-3"
                                onKeyPress={(e) => {
                                    if (
                                        e.key === 'Enter' &&
                                        newChatTitle.trim()
                                    ) {
                                        handleCreateNewChat()
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsNewChatDialogOpen(false)
                                setNewChatTitle('')
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreateNewChat}
                            disabled={
                                !newChatTitle.trim() || createSession.isPending
                            }
                        >
                            {createSession.isPending
                                ? 'Creating...'
                                : 'Create Chat'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
