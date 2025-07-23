"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatbotProps {
  skills: Array<{ name: string; level: number }>
  experiences: Array<{
    company: string
    role: string
    period: string
    description: string
    achievements: string[]
  }>
}

export default function Chatbot({ skills, experiences }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Shreyata's AI assistant. I can tell you about her skills, experience, and background. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Cache for user messages and bot responses
  const responseCache = useRef<Map<string, string>>(new Map())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInputValue = inputValue
    setInputValue("")
    setIsTyping(true)

    // Check cache for response
    if (responseCache.current.has(currentInputValue)) {
      const cachedResponse = responseCache.current.get(currentInputValue) || ""
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: cachedResponse,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 300) // Short delay for cached response
    } else {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInputValue,
            skills,
            experiences,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response from the server.")
        }

        const data = await response.json()
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          isBot: true,
          timestamp: new Date(),
        }

        responseCache.current.set(currentInputValue, data.text)
        setMessages((prev) => [...prev, botResponse])
      } catch (error) {
        console.error("Error sending message:", error)
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsTyping(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
        >
          <motion.div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-1.5rem)] h-[600px] max-h-[calc(100vh-6rem)] flex flex-col"
          >
            <Card className="h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Shreyata's Assistant</h3>
                    <p className="text-xs opacity-90">Powered by Gemini</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2 ${
                          message.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        {message.isBot && (
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.isBot
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                        {!message.isBot && (
                          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 justify-start"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0.2,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0.4,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about skills, experience..."
                      className="flex-1 resize-none text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={1}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}