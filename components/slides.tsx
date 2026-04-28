"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, Users, Zap, BookOpen, Heart, Sparkles, Laptop, Rocket, Wifi, Github, Import, Type, ImageIcon, Palette, FolderTree, FileText, Plug, ShieldCheck, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"

const WIFI_NETWORK = "WeWork"
const WIFI_PASSWORD = "Ask at front desk"

const slides = [
  { id: "title", component: TitleSlide },
  { id: "agenda", component: AgendaSlide },
  { id: "mc-intro", component: MCIntroSlide },
  { id: "makerslounge", component: MakersLoungeSlide },
  { id: "rootly", component: RootlySlide },
  { id: "philip", component: PhilipSlide },
  { id: "v0-part-1", component: V0Part1Slide },
  { id: "v0-part-2", component: V0Part2Slide },
  { id: "lets-build", component: LetsBuildSlide },
  { id: "demo-time", component: DemoTimeSlide },
  { id: "thank-you", component: ThankYouSlide },
]

export function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Slide Content */}
      <div className="h-full w-full">
        <CurrentSlideComponent />
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 text-sm text-muted-foreground">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

function WifiBadge() {
  return (
    <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
      <Wifi className="h-4 w-4 text-primary" />
      <span className="text-muted-foreground">{WIFI_NETWORK}</span>
    </div>
  )
}

function TitleSlide() {
  return (
    <div className="h-full flex flex-col px-12 py-10 relative">
      {/* Top header bar */}
      <div className="flex items-center gap-4">
        <VercelTriangle className="h-4 w-4" />
        <span className="text-muted-foreground font-mono text-sm tracking-wider">02A/GLOBAL BUILD WEEK</span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex items-center">
        <div className="flex items-end gap-8">
          <h1 className="text-7xl md:text-9xl leading-none">
            <span className="italic text-muted-foreground font-light">Zero to </span>
            <span className="pixel-text text-foreground">Agent</span>
          </h1>
          <VercelTriangle className="h-20 w-20 md:h-28 md:w-28 mb-4" />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="flex justify-between items-end">
        <div className="font-mono text-muted-foreground tracking-wider">
          <p className="text-lg">05.01.26</p>
        </div>
        <div className="font-mono text-muted-foreground tracking-wider text-right">
          <p className="text-lg">TORONTO/CAN</p>
        </div>
      </div>

      {/* Sponsors footer */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-8">
        <RootlyLogo />
        <span className="text-muted-foreground">x</span>
        <MakersLoungeLogo />
      </div>
    </div>
  )
}

function AgendaSlide() {
  const agendaItems = [
    { time: "5:30 - 6:30 PM", title: "Check-in & Networking", description: "Food, drinks & intros", icon: Users },
    { time: "6:30 - 7:30 PM", title: "Hands-on Building", description: "Build with v0", icon: Laptop },
    { time: "7:30 - 8:30 PM", title: "Demos & Wrap-up", description: "Show what you built", icon: Rocket },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 relative">
      <WifiBadge />
      
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Tonight&apos;s Agenda</h2>
      
      <div className="w-full max-w-2xl space-y-6">
        {agendaItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary font-medium mb-1">{item.time}</p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MCIntroSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="w-40 h-40 rounded-full border-2 border-primary mb-8 overflow-hidden">
        <Image 
          src="/images/berto-headshot.jpeg" 
          alt="Berto" 
          width={160} 
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h2 className="text-5xl md:text-6xl font-bold mb-2">Berto</h2>
      <p className="text-2xl text-muted-foreground mb-10">Your MC for Tonight</p>

      <div className="flex flex-col gap-4 max-w-xl text-left">
        <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">Co-founder of MakersLounge - building community for Toronto builders</p>
        </div>
<div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">Passionate about helping people go from idea to shipped product</p>
        </div>
        <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">These slides? Built in v0 in under 5 minutes</p>
        </div>
      </div>
    </div>
  )
}

function MakersLoungeSlide() {
  const values = [
    { icon: Zap, title: "Hustle", description: "Ship fast, iterate often" },
    { icon: BookOpen, title: "Learning", description: "Grow by sharing knowledge" },
    { icon: Heart, title: "Community", description: "Your win is our win" },
    { icon: Sparkles, title: "Fun", description: "Celebrate the joy of creating" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="mb-8">
        <MakersLoungeLogo large />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-2">Where <span className="text-primary">Makers</span> Build Together</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        A Toronto-based community for founders, developers, and creators who are actively building something.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {values.map((value) => (
          <div key={value.title} className="p-6 rounded-2xl bg-card border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <value.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{value.title}</h3>
            <p className="text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RootlySlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="mb-8">
        <RootlyLogo large />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">AI SRE Agents</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        On-call and incident response platform that brings AI and modern teams together to prevent and resolve incidents faster.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mb-10">
        {["Root Cause Analysis", "Pattern Detection", "Always-on Copilot", "Continuous Improvement"].map((feature) => (
          <div key={feature} className="p-4 rounded-xl bg-card border border-border">
            <p className="text-sm font-medium">{feature}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">Trusted by</p>
      <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
        <span className="font-medium">LinkedIn</span>
        <span className="font-medium">NVIDIA</span>
        <span className="font-medium">Replit</span>
        <span className="font-medium">Canva</span>
        <span className="font-medium">Figma</span>
        <span className="font-medium">Dropbox</span>
      </div>
    </div>
  )
}

function PhilipSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="w-44 h-44 rounded-full border-2 border-primary mb-8 overflow-hidden">
        <Image 
          src="/images/philip-headshot.jpeg" 
          alt="Philip" 
          width={176} 
          height={176}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h2 className="text-5xl md:text-6xl font-bold mb-2">Philip</h2>
      <p className="text-2xl text-primary mb-2">Vercel</p>
      <p className="text-xl text-muted-foreground mb-10">Flying in from Brazil for tonight!</p>

      <div className="flex flex-col gap-4 max-w-xl text-left">
        <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">Developer Relations at Vercel</p>
        </div>
        <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">Deep expertise in v0 and AI-powered development</p>
        </div>
        <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-primary mt-2.5" />
          <p className="text-lg">20 min talk + Q&A</p>
        </div>
      </div>
    </div>
  )
}

function V0Part1Slide() {
  const features = [
    { icon: Github, title: "Import from GitHub", description: "Bring existing repos into v0" },
    { icon: Import, title: "Create from Figma", description: "Turn designs into code" },
    { icon: Type, title: "Generate Text", description: "AI-powered copy writing" },
    { icon: ImageIcon, title: "Generate Images", description: "Create visuals on the fly" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="mb-4">
        <VercelLogo large />
      </div>
      <p className="text-xl text-muted-foreground mb-8">v0 Quick Start - Part 1</p>
      <p className="text-sm text-primary mb-8">Presented by Hakan</p>
      
      <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
        {features.map((feature) => (
          <div key={feature.title} className="p-6 rounded-2xl bg-card border border-border text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function V0Part2Slide() {
  const features = [
    { icon: Palette, title: "Design System", description: "Consistent theming & styles" },
    { icon: FolderTree, title: "Folder Structure", description: "Organized project layout" },
    { icon: FileText, title: "Instructions/Rules", description: "Custom AI behavior" },
    { icon: Plug, title: "MCP Integrations", description: "Connect external tools" },
    { icon: ShieldCheck, title: "Ask Permission", description: "Control what v0 can do" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="mb-4">
        <VercelLogo large />
      </div>
      <p className="text-xl text-muted-foreground mb-8">v0 Quick Start - Part 2</p>
      <p className="text-sm text-primary mb-8">Presented by Berto</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl w-full">
        {features.map((feature) => (
          <div key={feature.title} className="p-5 rounded-2xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LetsBuildSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <h2 className="text-5xl md:text-7xl font-bold mb-4">Let&apos;s Build!</h2>
      
      <p className="text-xl text-muted-foreground max-w-xl mb-8">
        Scan for $30 free credits and to submit your project
      </p>

      <div className="p-6 bg-white rounded-2xl mb-6">
        <QRCodeSVG 
          value="https://zerotoagent.dev/event/RbeBMcn9EPsyxEld"
          size={180}
          level="H"
          includeMargin={false}
        />
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        zerotoagent.dev/event/RbeBMcn9EPsyxEld
      </p>

      <div className="flex flex-col gap-3 text-left max-w-md w-full">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">1</span>
          </div>
          <p>Open <span className="text-primary font-medium">v0.dev</span> and start building</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">2</span>
          </div>
          <p>Build your AI agent idea</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">3</span>
          </div>
          <p>Submit 15 min before demos!</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Berto is available to help first-timers!
      </p>
    </div>
  )
}

function DemoTimeSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
        <Mic className="h-12 w-12 text-primary" />
      </div>
      
      <h2 className="text-5xl md:text-7xl font-bold mb-6">Demo Time!</h2>
      
      <p className="text-xl text-muted-foreground max-w-xl mb-10">
        Who wants to show what they built?
      </p>

      <div className="flex flex-col gap-4 max-w-md w-full">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <p className="text-lg font-semibold mb-2">First come, first serve</p>
          <p className="text-muted-foreground">Raise your hand when ready</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <p className="text-lg font-semibold mb-2">2-3 minutes each</p>
          <p className="text-muted-foreground">Show us the highlights</p>
        </div>
      </div>
    </div>
  )
}

function ThankYouSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center relative">
      <WifiBadge />
      
      <h2 className="text-5xl md:text-7xl font-bold mb-8">Thank You!</h2>
      
      {/* Logos row */}
      <div className="flex items-center gap-6 mb-10">
        <VercelLogo />
        <span className="text-muted-foreground text-2xl">x</span>
        <RootlyLogo />
        <span className="text-muted-foreground text-2xl">x</span>
        <MakersLoungeLogo />
      </div>

      <p className="text-xl text-muted-foreground max-w-xl mb-10">
        Keep building. Keep shipping. Stay connected.
      </p>

      <div className="flex flex-col gap-4 max-w-md w-full">
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-primary font-medium">@makerslounge</p>
          <p className="text-sm text-muted-foreground">Follow us on socials</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-primary font-medium">makerslounge.co</p>
          <p className="text-sm text-muted-foreground">Join the community - $10/mo</p>
        </div>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Submit your projects to the global competition for $6,000+ in prizes!
      </p>
    </div>
  )
}

// Logo Components
function VercelTriangle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 76 65" fill="currentColor">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}

function VercelLogo({ large }: { large?: boolean }) {
  const size = large ? "h-12" : "h-8"
  return (
  <svg className={size} viewBox="0 0 283 64" fill="currentColor">
      <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"/>
    </svg>
  )
}

function RootlyLogo({ large }: { large?: boolean }) {
  const height = large ? 56 : 40
  const width = large ? 240 : 160
  return (
    <Image 
      src="/logos/rootly-white.svg" 
      alt="Rootly AI" 
      width={width} 
      height={height}
      className={large ? "h-14 w-auto" : "h-10 w-auto"}
    />
  )
}

function MakersLoungeLogo({ large }: { large?: boolean }) {
  return (
    <Image 
      src="/logos/makerslounge-wordmark-white.svg" 
      alt="MakersLounge" 
      width={large ? 240 : 160} 
      height={large ? 56 : 40}
      className={large ? "h-14 w-auto" : "h-10 w-auto"}
    />
  )
}
