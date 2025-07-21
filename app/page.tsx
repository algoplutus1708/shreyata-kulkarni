"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Chatbot from "@/components/chatbot"
import {
  Moon,
  Sun,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Download,
  Calendar,
  Building,
  Award,
  Target,
  TrendingUp,
  Users,
  Star,
  Sparkles,
  Code,
  Zap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for sections
  const heroRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Simplified intersection observers - always show content, just trigger animations
  const heroInView = useInView(heroRef, { threshold: 0.1, once: false })
  const skillsInView = useInView(skillsRef, { threshold: 0.1, once: false })
  const experienceInView = useInView(experienceRef, { threshold: 0.1, once: false })
  const contactInView = useInView(contactRef, { threshold: 0.1, once: false })

  const { scrollYProgress } = useScroll()

  // Ensure component is mounted
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Handle dark mode
  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [darkMode, mounted])

  // Update active section
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (skillsInView) setActiveSection("skills")
    else if (experienceInView) setActiveSection("experience")
    else if (contactInView) setActiveSection("contact")
  }, [heroInView, skillsInView, experienceInView, contactInView])

  const skills = [
    { name: "Selenium WebDriver", icon: "🔧", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Java", icon: "☕", level: 90, color: "from-orange-500 to-red-500" },
    { name: "Playwright", icon: "🎭", level: 88, color: "from-purple-500 to-pink-500" },
    { name: "Spring Framework", icon: "🌱", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Spring Boot", icon: "🚀", level: 87, color: "from-indigo-500 to-purple-500" },
    { name: "Test Automation", icon: "🤖", level: 95, color: "from-teal-500 to-blue-500" },
    { name: "SOAP/REST APIs", icon: "🌐", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "RestAssured", icon: "✅", level: 88, color: "from-pink-500 to-rose-500" },
    { name: "Agile/Waterfall", icon: "🔄", level: 92, color: "from-violet-500 to-purple-500" },
  ]

  const experiences = [
    {
      period: "Apr 2023 - Present",
      company: "Mastercard",
      role: "Senior Software Engineer",
      description: "Leading QE initiatives and test automation frameworks for financial services",
      color: "from-orange-500 to-red-500",
      achievements: ["Led 5+ automation projects", "Reduced testing time by 60%", "Mentored 3 junior engineers"],
    },
    {
      period: "Apr 2022 - Apr 2023",
      company: "HSBC",
      role: "Senior QA Specialist",
      description: "Specialized in banking domain testing and quality assurance processes",
      color: "from-red-500 to-pink-500",
      achievements: ["Implemented CI/CD pipelines", "Improved test coverage by 40%", "Led cross-functional teams"],
    },
    {
      period: "Mar 2019 - Apr 2022",
      company: "TCS",
      role: "Team Lead",
      description: "Led testing teams and implemented comprehensive QA strategies",
      color: "from-blue-500 to-purple-500",
      achievements: ["Managed team of 8 testers", "Delivered 15+ projects", "Achieved 99.5% quality metrics"],
    },
    {
      period: "Apr 2017 - Jan 2019",
      company: "Hansen Technologies",
      role: "Senior Software Engineer",
      description: "Developed robust test automation frameworks and procedures",
      color: "from-green-500 to-blue-500",
      achievements: ["Built automation framework", "Reduced manual effort by 70%", "Trained 10+ team members"],
    },
    {
      period: "2015 - Feb 2017",
      company: "HSBC",
      role: "Software Engineer",
      description: "Implemented manual and automated testing solutions",
      color: "from-purple-500 to-pink-500",
      achievements: ["Automated 200+ test cases", "Improved defect detection by 35%", "Optimized test processes"],
    },
    {
      period: "2014 - Aug 2015",
      company: "KPIT",
      role: "Software Engineer",
      description: "Started career in software testing and quality assurance",
      color: "from-yellow-500 to-orange-500",
      achievements: ["Completed 5+ certifications", "Delivered first automation project", "Received excellence award"],
    },
  ]

  const stats = [
    { icon: Award, label: "Years Experience", value: "11+", color: "from-blue-500 to-purple-500" },
    { icon: Target, label: "Projects Completed", value: "50+", color: "from-green-500 to-blue-500" },
    { icon: TrendingUp, label: "Test Coverage", value: "95%", color: "from-orange-500 to-red-500" },
    { icon: Users, label: "Team Members Led", value: "25+", color: "from-purple-500 to-pink-500" },
  ]

  const navigationItems = [
    { name: "About", id: "hero" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Handle contact actions
  const handleEmailClick = () => {
    window.open("mailto:shreyta.kulkarni@example.com", "_blank")
  }

  const handleLinkedInClick = () => {
    window.open("https://in.linkedin.com/in/shreyta-kulkarni-361795a0", "_blank")
  }

  const handleGitHubClick = () => {
    window.open("https://github.com/shreyta-kulkarni", "_blank")
  }

  const handleDownloadCV = () => {
    // Create a temporary link to download CV
    const link = document.createElement("a")
    link.href = "/cv/shreyta-kulkarni-cv.pdf" // You would need to add the actual CV file
    link.download = "Shreyta_Kulkarni_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Don't render anything until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
          />
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-2xl font-bold text-white mb-4"
          >
            Loading Portfolio...
          </motion.h2>
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-purple-400"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Container */}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full blur-sm ${
                i % 3 === 0 ? "bg-blue-400/10" : i % 3 === 1 ? "bg-purple-400/10" : "bg-pink-400/10"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, Math.random() * 0.5 + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.h1
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => scrollToSection("hero")}
              >
                Shreyata Kulkarni
              </motion.h1>

              <div className="flex items-center gap-4">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative ${
                        activeSection === item.id ? "text-blue-600 dark:text-blue-400" : ""
                      }`}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <AnimatePresence mode="wait">
                    {darkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
                >
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left py-2 px-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="pt-20 relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center py-20 px-6">
            <div className="container mx-auto text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Profile Image */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mx-auto w-48 h-48 group"
                >
                  <motion.div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src="/images/shreyta-profile.jpg"
                        alt="Shreyta Kulkarni"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>

                  {/* Floating Icons */}
                  {[
                    { Icon: Star, position: "top-2 right-2" },
                    { Icon: Sparkles, position: "bottom-2 left-2" },
                    { Icon: Code, position: "top-2 left-2" },
                    { Icon: Zap, position: "bottom-2 right-2" },
                  ].map(({ Icon, position }, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                      className={`absolute ${position} w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-3 h-3 text-blue-500" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Name and Title */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold"
                  >
                    <motion.span
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_100%]"
                    >
                      Shreyata Kulkarni
                    </motion.span>
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Senior Software Engineer
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center justify-center gap-2 text-lg text-gray-600 dark:text-gray-400"
                  >
                    <Building className="w-5 h-5" />
                    <span className="font-medium text-orange-600 dark:text-orange-400">Mastercard</span>
                    <span>•</span>
                    <MapPin className="w-4 h-4" />
                    <span>Pune, Maharashtra</span>
                  </motion.div>
                </div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                  Efficient Software Test Engineer with 11+ years of experience in Automation and Manual Testing.
                  Specialized in developing and maintaining test automation frameworks, building test cases and
                  procedures, preparing test analysis, and developing requirement traceability matrices.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleEmailClick}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Me
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleDownloadCV}
                      variant="outline"
                      className="px-8 py-3 rounded-full border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="pt-12"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="flex flex-col items-center text-gray-400 cursor-pointer"
                    onClick={() => scrollToSection("skills")}
                  >
                    <span className="text-sm mb-2">Scroll to explore</span>
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section - ALWAYS VISIBLE */}
          <section
            ref={skillsRef}
            id="skills"
            className="min-h-screen flex items-center py-20 px-6 bg-gray-50/50 dark:bg-gray-800/50"
          >
            <div className="container mx-auto max-w-6xl">
              {/* Section Header - Always visible */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Technical Expertise
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Specialized skills in test automation and quality engineering
                </p>
              </motion.div>

              {/* Skills Grid - Always visible */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: skillsInView ? index * 0.1 : 0,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: skillsInView ? index * 0.1 + 0.1 : 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          className="text-4xl mb-4"
                        >
                          {skill.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: skillsInView ? index * 0.1 + 0.3 : 0.3,
                              duration: 1.2,
                              type: "spring",
                            }}
                            className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative overflow-hidden`}
                          >
                            <motion.div
                              animate={{ x: ["0%", "100%"] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="absolute inset-0 bg-white/30 w-1/4"
                            />
                          </motion.div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{skill.level}%</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section - ALWAYS VISIBLE */}
          <section ref={experienceRef} id="experience" className="min-h-screen flex items-center py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              {/* Section Header - Always visible */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Journey
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  11+ years of excellence in software testing and quality engineering
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline Line - Always visible */}
                <motion.div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: experienceInView ? 1.5 : 0.5, ease: "easeInOut" }}
                  style={{ originY: 0 }}
                />

                {/* Experience Items - Always visible */}
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: experienceInView ? index * 0.2 : 0,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`relative flex flex-col md:flex-row items-center mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} className="group">
                        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden">
                          <CardContent className="p-6">
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "100%" }}
                              transition={{
                                delay: experienceInView ? index * 0.2 + 0.1 : 0,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                              className={`w-full h-2 bg-gradient-to-r ${exp.color} rounded-full mb-4 relative overflow-hidden`}
                            >
                              <motion.div
                                animate={{ x: ["0%", "100%"] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="absolute inset-0 bg-white/30 w-1/3"
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: experienceInView ? index * 0.2 + 0.2 : 0,
                                duration: 0.4,
                              }}
                              className="flex items-center gap-2 mb-2"
                            >
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <Badge variant="secondary" className="text-xs">
                                {exp.period}
                              </Badge>
                            </motion.div>
                            <motion.h3
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: experienceInView ? index * 0.2 + 0.3 : 0,
                                duration: 0.4,
                              }}
                              className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            >
                              {exp.role}
                            </motion.h3>
                            <motion.h4
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: experienceInView ? index * 0.2 + 0.4 : 0,
                                duration: 0.4,
                              }}
                              className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                            >
                              {exp.company}
                            </motion.h4>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: experienceInView ? index * 0.2 + 0.5 : 0,
                                duration: 0.4,
                              }}
                              className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
                            >
                              {exp.description}
                            </motion.p>
                            <div className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <motion.div
                                  key={achIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: experienceInView ? index * 0.2 + achIndex * 0.1 + 0.6 : 0.6,
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 150,
                                  }}
                                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      delay: experienceInView ? index * 0.2 + achIndex * 0.1 + 0.5 : 0.5,
                                      duration: 0.3,
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                  />
                                  {achievement}
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Timeline Dot */}
                    <motion.div
                      whileHover={{ scale: 1.5, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full z-10 shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section - ALWAYS VISIBLE */}
          <section
            ref={contactRef}
            id="contact"
            className="min-h-screen flex items-center py-20 px-6 bg-gray-50/50 dark:bg-gray-800/50"
          >
            <div className="container mx-auto text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="space-y-8"
              >
                {/* Section Header - Always visible */}
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Connect
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Ready to discuss quality engineering solutions or explore new opportunities? Let's build something
                  amazing together.
                </p>

                {/* Contact Buttons - Always visible with functional links */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  {[
                    {
                      icon: Mail,
                      text: "Email Me",
                      gradient: "from-blue-600 to-purple-600",
                      onClick: handleEmailClick,
                    },
                    {
                      icon: Linkedin,
                      text: "LinkedIn",
                      gradient: "from-blue-500 to-blue-700",
                      onClick: handleLinkedInClick,
                    },
                    { icon: Github, text: "GitHub", gradient: "from-gray-700 to-gray-900", onClick: handleGitHubClick },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: contactInView ? index * 0.1 + 0.6 : 0.6,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 150,
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        onClick={item.onClick}
                        className={`bg-gradient-to-r ${item.gradient} hover:shadow-2xl text-white px-8 py-4 rounded-full transition-all duration-300 relative overflow-hidden group cursor-pointer`}
                      >
                        <motion.div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative z-10"
                        >
                          <item.icon className="w-5 h-5 mr-2" />
                        </motion.div>
                        <span className="relative z-10">{item.text}</span>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
          <div className="container mx-auto text-center relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400"
            >
              © 2024 Shreyta Kulkarni. Crafted with passion for quality engineering.
            </motion.p>
          </div>
        </footer>

        {/* Chatbot */}
        <Chatbot skills={skills} experiences={experiences} />
      </div>
    </div>
  )
}
