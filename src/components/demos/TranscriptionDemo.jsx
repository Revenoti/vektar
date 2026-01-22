import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mic, MicOff, Play, Pause, Users, FileText, CheckCircle, Clock, User } from 'lucide-react'

const TranscriptionDemo = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [transcriptionIndex, setTranscriptionIndex] = useState(0)
  
  const meetingTranscript = [
    { speaker: 'Sarah Chen', role: 'Product Manager', time: '0:00', text: "Let's review the Q4 roadmap and prioritize features for the next sprint.", color: 'from-violet-500 to-purple-600' },
    { speaker: 'Mike Johnson', role: 'Tech Lead', time: '0:15', text: "I think we should focus on the AI integration first. It's the highest-impact item.", color: 'from-blue-500 to-indigo-600' },
    { speaker: 'Emily Davis', role: 'Designer', time: '0:28', text: "Agreed. I've finished the mockups for the new dashboard interface.", color: 'from-pink-500 to-rose-600' },
    { speaker: 'Sarah Chen', role: 'Product Manager', time: '0:42', text: "Great! Can we get estimates for the backend work, Mike?", color: 'from-violet-500 to-purple-600' },
    { speaker: 'Mike Johnson', role: 'Tech Lead', time: '0:55', text: "I estimate 2 weeks for the core API and another week for testing.", color: 'from-blue-500 to-indigo-600' },
    { speaker: 'AI Summary', role: 'Auto-Generated', time: '', text: "Meeting covered Q4 roadmap priorities. AI integration prioritized. Dashboard mockups complete. Estimated 3 weeks for backend implementation.", color: 'from-emerald-500 to-teal-600', isAI: true }
  ]

  const actionItems = [
    { text: 'Complete AI integration backend', assignee: 'Mike Johnson', due: '2 weeks' },
    { text: 'Review dashboard mockups', assignee: 'Team', due: 'Tomorrow' },
    { text: 'Schedule follow-up meeting', assignee: 'Sarah Chen', due: 'Friday' }
  ]

  useEffect(() => {
    let interval
    if (isRecording && transcriptionIndex < meetingTranscript.length - 1) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1)
        if (currentTime > 0 && currentTime % 8 === 0) {
          setTranscriptionIndex(prev => Math.min(prev + 1, meetingTranscript.length - 2))
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, currentTime, transcriptionIndex])

  const startRecording = () => {
    setIsRecording(true)
    setCurrentTime(0)
    setTranscriptionIndex(0)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setTranscriptionIndex(meetingTranscript.length - 1)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">Meeting Transcription Demo</h4>
          <p className="text-muted-foreground text-sm">Watch AI transcribe and summarize meetings in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Clock className="w-3 h-3" />
            {formatTime(currentTime)}
          </Badge>
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? 'bg-red-500 hover:bg-red-600' : 'vektar-gradient'}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Demo
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-secondary/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">Live Transcript</span>
                {isRecording && (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-red-500 font-medium">Recording</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {meetingTranscript.slice(0, transcriptionIndex + 1).map((entry, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl transition-all duration-500 ${
                      entry.isAI 
                        ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30' 
                        : 'bg-card/80 border border-border/50'
                    } ${idx === transcriptionIndex && !entry.isAI ? 'ring-2 ring-primary/50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${entry.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {entry.isAI ? '🤖' : entry.speaker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{entry.speaker}</span>
                          <span className="text-xs text-muted-foreground">{entry.role}</span>
                          {entry.time && <span className="text-xs text-muted-foreground ml-auto">{entry.time}</span>}
                        </div>
                        <p className={`text-sm ${entry.isAI ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-foreground'}`}>
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-secondary/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Action Items</span>
              </div>
              <div className="space-y-3">
                {actionItems.map((item, idx) => (
                  <div key={idx} className="p-3 bg-card/80 rounded-lg border border-border/50">
                    <p className="text-sm font-medium mb-2">{item.text}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.assignee}
                      </span>
                      <span>Due: {item.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-emerald-500" />
                <span className="font-medium text-emerald-600 dark:text-emerald-400">10x Faster Notes</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI automatically generates meeting summaries, extracts action items, and identifies key decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TranscriptionDemo
