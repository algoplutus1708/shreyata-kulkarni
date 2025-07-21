"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

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

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Skills-related responses
    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      const topSkills = skills
        .sort((a, b) => b.level - a.level)
        .slice(0, 5)
        .map((skill) => `${skill.name} (${skill.level}%)`)
        .join(", ")
      return `Shreyata's top technical skills include: ${topSkills}. She specializes in test automation, quality engineering, and has extensive experience with Java, Selenium WebDriver, and modern testing frameworks.`
    }

    // Experience-related responses
    if (message.includes("experience") || message.includes("work") || message.includes("job")) {
      const currentJob = experiences[0]
      return `Shreyata has 11+ years of experience in software testing and quality engineering. She's currently working as a ${currentJob.role} at ${currentJob.company} since ${currentJob.period}. Her key achievements include leading 5+ automation projects, reducing testing time by 60%, and mentoring junior engineers.`
    }

    // Company-specific responses
    if (message.includes("mastercard")) {
      const mastercard = experiences.find((exp) => exp.company === "Mastercard")
      return mastercard
        ? `At Mastercard, Shreyata works as a ${mastercard.role}. ${mastercard.description}. Her key achievements include: ${mastercard.achievements.join(", ")}.`
        : "Shreyata currently works at Mastercard as a Senior Software Engineer, leading QE initiatives and test automation frameworks for financial services."
    }

    if (message.includes("hsbc")) {
      const hsbc = experiences.filter((exp) => exp.company === "HSBC")
      return `Shreyata has worked at HSBC in two different roles. Most recently as a Senior QA Specialist (${hsbc[0]?.period}), where she specialized in banking domain testing and implemented CI/CD pipelines. Earlier, she worked as a Software Engineer implementing manual and automated testing solutions.`
    }

    if (message.includes("tcs")) {
      const tcs = experiences.find((exp) => exp.company === "TCS")
      return tcs
        ? `At TCS, Shreyata worked as a ${tcs.role} from ${tcs.period}. ${tcs.description}. She managed a team of 8 testers, delivered 15+ projects, and achieved 99.5% quality metrics.`
        : "Shreyata worked at TCS as a Team Lead, managing testing teams and implementing comprehensive QA strategies."
    }

    // Automation-related responses
    if (message.includes("automation") || message.includes("selenium") || message.includes("playwright")) {
      return "Shreyata is highly skilled in test automation with 95% proficiency in both Selenium WebDriver and Test Automation. She also has 88% proficiency in Playwright. She has built automation frameworks, reduced manual effort by 70%, and led multiple automation projects throughout her career."
    }

    // Java-related responses
    if (message.includes("java") || message.includes("spring")) {
      return "Shreyata has strong Java skills (90% proficiency) and is experienced with Spring Framework (85%) and Spring Boot (87%). She has used these technologies extensively in building robust test automation frameworks and backend testing solutions."
    }

    // API testing responses
    if (message.includes("api") || message.includes("rest") || message.includes("soap")) {
      return "Shreyata has 85% proficiency in SOAP/REST APIs and 88% proficiency in RestAssured. She has extensive experience in API testing, building automated API test suites, and ensuring API quality in various projects."
    }

    // Education or background
    if (message.includes("education") || message.includes("background") || message.includes("qualification")) {
      return "Shreyata is an experienced Software Test Engineer with 11+ years in the industry. She has completed 5+ certifications and has worked across various domains including banking, financial services, and technology. She's based in Pune, Maharashtra."
    }

    // Contact information
    if (message.includes("contact") || message.includes("reach") || message.includes("email")) {
      return "You can reach out to Shreyata through the contact section on this website. She's available on LinkedIn and email for professional opportunities and collaborations."
    }

    // Achievements
    if (message.includes("achievement") || message.includes("accomplishment")) {
      return "Some of Shreyata's key achievements include: Leading 5+ automation projects, reducing testing time by 60%, mentoring 3+ junior engineers, implementing CI/CD pipelines, improving test coverage by 40%, managing teams of 8+ testers, delivering 15+ projects, and achieving 99.5% quality metrics."
    }

    // Default responses for common greetings
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! I'm here to help you learn more about Shreyata Kulkarni. You can ask me about her skills, work experience, achievements, or any specific technology she works with."
    }

    if (message.includes("thank")) {
      return "You're welcome! Feel free to ask me anything else about Shreyata's professional background."
    }

    // Default response
    return "I can help you learn about Shreyata's skills, work experience, achievements, and background. Try asking me about her experience at specific companies like Mastercard, HSBC, or TCS, or about specific technologies like Java, Selenium, or API testing."
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Check cache for response
    if (responseCache.current.has(inputValue)) {
      const cachedResponse = responseCache.current.get(inputValue) || ""
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
      // Simulate typing delay and generate response
      setTimeout(() => {
        const generatedText = generateResponse(inputValue)
        responseCache.current.set(inputValue, generatedText)
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generatedText,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
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
            className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-1.5rem)] max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
          >
            <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Shreyata's Assistant</h3>
                    <p className="text-xs opacity-90">Ask me about her skills & experience</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
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
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about skills, experience..."
                      className="flex-1 resize-none text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
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
