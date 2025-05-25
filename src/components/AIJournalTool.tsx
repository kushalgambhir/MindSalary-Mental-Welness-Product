
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Mic,
  Send,
  BarChart3
} from "lucide-react";
import { aiStressDetector } from "@/utils/aiStressDetection";

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  stressLevel: number;
  aiInsights: {
    sentiment: number;
    stressKeywords: string[];
    suggestions: string[];
    moodTrend: 'improving' | 'stable' | 'declining';
  };
  typingMetrics: {
    duration: number;
    pauseCount: number;
    backspaceCount: number;
  };
}

interface AIJournalToolProps {
  onStressLevelUpdate: (level: number) => void;
}

const AIJournalTool = ({ onStressLevelUpdate }: AIJournalToolProps) => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [keystrokeTimings, setKeystrokeTimings] = useState<number[]>([]);
  const [touchData, setTouchData] = useState({
    touchPressure: [50, 55, 48, 52],
    touchDuration: [150, 200, 180, 170],
    swipeVelocity: [100, 120, 90, 110]
  });
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [realTimeStress, setRealTimeStress] = useState(0);

  // Track typing patterns
  useEffect(() => {
    const handleKeyPress = () => {
      setKeystrokeTimings(prev => [...prev, Date.now()]);
    };

    if (currentEntry.length > 0) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [currentEntry]);

  // Real-time stress analysis
  useEffect(() => {
    if (currentEntry.length > 10) {
      analyzeRealTimeStress();
    }
  }, [currentEntry]);

  const analyzeRealTimeStress = async () => {
    if (keystrokeTimings.length < 5) return;

    const typingPattern = aiStressDetector.analyzeTypingPattern(currentEntry, keystrokeTimings);
    const textAnalysis = aiStressDetector.analyzeTextSentiment(currentEntry);
    
    const stressLevel = await aiStressDetector.predictStressLevel(
      typingPattern,
      textAnalysis,
      touchData
    );
    
    setRealTimeStress(stressLevel);
    onStressLevelUpdate(stressLevel * 100);
  };

  const handleSubmitEntry = async () => {
    if (!currentEntry.trim()) return;

    setIsAnalyzing(true);

    try {
      const typingPattern = aiStressDetector.analyzeTypingPattern(currentEntry, keystrokeTimings);
      const textAnalysis = aiStressDetector.analyzeTextSentiment(currentEntry);
      
      const stressLevel = await aiStressDetector.predictStressLevel(
        typingPattern,
        textAnalysis,
        touchData
      );

      const suggestions = generateAISuggestions(textAnalysis, stressLevel);
      const moodTrend = calculateMoodTrend();

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        timestamp: new Date(),
        stressLevel,
        aiInsights: {
          sentiment: textAnalysis.sentiment,
          stressKeywords: textAnalysis.stressKeywords,
          suggestions,
          moodTrend
        },
        typingMetrics: {
          duration: keystrokeTimings.length > 0 ? 
            keystrokeTimings[keystrokeTimings.length - 1] - keystrokeTimings[0] : 0,
          pauseCount: typingPattern.pauseDuration > 1000 ? 1 : 0,
          backspaceCount: typingPattern.backspaceCount
        }
      };

      setEntries(prev => [newEntry, ...prev]);
      setCurrentEntry("");
      setKeystrokeTimings([]);
      onStressLevelUpdate(stressLevel * 100);

    } catch (error) {
      console.error('Error analyzing journal entry:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAISuggestions = (analysis: any, stressLevel: number): string[] => {
    const suggestions = [];

    if (stressLevel > 0.7) {
      suggestions.push("Your stress levels seem high. Consider taking a 5-minute breathing break.");
      suggestions.push("Try the 4-7-8 breathing technique to calm your nervous system.");
    }

    if (analysis.urgencyWords > 2) {
      suggestions.push("You mentioned several urgent items. Consider prioritizing the most critical one.");
    }

    if (analysis.sentiment < 0.3) {
      suggestions.push("Your entry shows some negative emotions. Remember that challenges are temporary.");
      suggestions.push("Consider writing three things you're grateful for today.");
    }

    if (analysis.stressKeywords.length > 3) {
      suggestions.push("Multiple stress indicators detected. Consider speaking with a colleague or taking a short walk.");
    }

    if (suggestions.length === 0) {
      suggestions.push("Great job reflecting on your day! Keep up the mindful practice.");
      suggestions.push("Your mental clarity seems good. This is a great time for important decisions.");
    }

    return suggestions.slice(0, 3);
  };

  const calculateMoodTrend = (): 'improving' | 'stable' | 'declining' => {
    if (entries.length < 2) return 'stable';
    
    const recentEntries = entries.slice(0, 3);
    const avgRecentStress = recentEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / recentEntries.length;
    const olderEntries = entries.slice(3, 6);
    const avgOlderStress = olderEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / olderEntries.length;

    if (avgRecentStress < avgOlderStress - 0.1) return 'improving';
    if (avgRecentStress > avgOlderStress + 0.1) return 'declining';
    return 'stable';
  };

  const getStressColor = (level: number) => {
    if (level < 0.3) return "text-green-600";
    if (level < 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getMoodTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Journal Input */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-purple-700">
              <Brain className="w-5 h-5 mr-2" />
              AI Journal Assistant
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={getStressColor(realTimeStress)}>
                Stress: {Math.round(realTimeStress * 100)}%
              </Badge>
              {realTimeStress > 0.7 && (
                <Badge variant="destructive">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  High Stress
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="How are you feeling? What's on your mind? (AI is analyzing your typing patterns and word choice for stress indicators...)"
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isAnalyzing}
              />
              
              {/* Real-time typing analysis indicator */}
              {currentEntry.length > 10 && (
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Zap className="w-3 h-3" />
                    <span>AI analyzing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Real-time stress indicator */}
            {realTimeStress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Real-time stress level</span>
                  <span className={getStressColor(realTimeStress)}>
                    {Math.round(realTimeStress * 100)}%
                  </span>
                </div>
                <Progress value={realTimeStress * 100} className="h-2" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsVoiceMode(!isVoiceMode)}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isVoiceMode ? "Text Mode" : "Voice Mode"}
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Patterns
                </Button>
              </div>
              
              <Button 
                onClick={handleSubmitEntry}
                disabled={!currentEntry.trim() || isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Analyze & Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries with AI Insights */}
      {entries.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <BookOpen className="w-5 h-5 mr-2" />
              Recent Insights & Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStressColor(entry.stressLevel)}>
                        Stress: {Math.round(entry.stressLevel * 100)}%
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getMoodTrendIcon(entry.aiInsights.moodTrend)}
                        <span className="text-xs text-gray-600 capitalize">
                          {entry.aiInsights.moodTrend}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    {entry.content}
                  </p>
                  
                  {/* AI Suggestions */}
                  {entry.aiInsights.suggestions.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h5 className="font-semibold text-blue-800 text-xs mb-2">
                        🤖 AI Suggestions:
                      </h5>
                      <ul className="text-xs text-blue-700 space-y-1">
                        {entry.aiInsights.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Stress Keywords */}
                  {entry.aiInsights.stressKeywords.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-600">Stress indicators: </span>
                      {entry.aiInsights.stressKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs mr-1">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIJournalTool;
