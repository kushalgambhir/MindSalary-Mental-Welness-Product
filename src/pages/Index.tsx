
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, Zap, Users, Calendar, TrendingUp, DollarSign, Trophy, Target, Star, Bot, Activity, BookOpen } from "lucide-react";
import DailyCheckIn from "@/components/DailyCheckIn";
import MoodTracker from "@/components/MoodTracker";
import QuickActions from "@/components/QuickActions";
import InsightsPanel from "@/components/InsightsPanel";
import MindSalaryDashboard from "@/components/MindSalaryDashboard";
import StealthModeCheckin from "@/components/StealthModeCheckin";
import SocialProofEngine from "@/components/SocialProofEngine";
import CompetitiveLeaderboards from "@/components/CompetitiveLeaderboards";
import EarningsTracker from "@/components/EarningsTracker";
import AIJournalTool from "@/components/AIJournalTool";
import AIChatbot from "@/components/AIChatbot";
import BackgroundStressMonitor from "@/components/BackgroundStressMonitor";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [mindSalaryScore, setMindSalaryScore] = useState(675);
  const [monthlyEarnings, setMonthlyEarnings] = useState(12500);
  const [currentStressLevel, setCurrentStressLevel] = useState(45);
  const [backgroundMonitoringActive, setBackgroundMonitoringActive] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const handleCheckInComplete = () => {
    setHasCheckedInToday(true);
    setCurrentStreak(prev => prev + 1);
    setMindSalaryScore(prev => Math.min(prev + 15, 1000));
    toast({
      title: "🎯 MindSalary Score Increased!",
      description: `+15 points earned! Your score is now ${mindSalaryScore + 15}. Higher scores = Higher earning potential!`,
    });
  };

  const handleStealthCheckin = (stressLevel: number, focus: number) => {
    const points = Math.floor((stressLevel + focus) / 2 * 0.3);
    setMindSalaryScore(prev => Math.min(prev + points, 1000));
    const earnings = Math.floor(points * 2.5);
    setMonthlyEarnings(prev => prev + earnings);
    
    toast({
      title: "🔥 Stress Harvested Successfully!",
      description: `+${points} MindSalary points, ₹${earnings} resilience earnings unlocked!`,
    });
  };

  const handleStressLevelUpdate = (level: number) => {
    setCurrentStressLevel(level);
    
    // Update earnings based on stress management
    if (level < 30) {
      setMonthlyEarnings(prev => prev + 10);
    }
  };

  const handleAIStressDetection = (level: number) => {
    setCurrentStressLevel(level);
    
    if (level > 75) {
      toast({
        title: "🚨 High Stress Detected",
        description: "AI detected elevated stress patterns. Consider taking a break or using our support tools.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  MindSalary AI
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Mental Wellness Economy - Mobile App</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Trophy className="w-4 h-4 mr-1" />
                Score: {mindSalaryScore}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <DollarSign className="w-4 h-4 mr-1" />
                ₹{monthlyEarnings} earned
              </Badge>
              <Badge 
                variant={currentStressLevel > 70 ? "destructive" : currentStressLevel > 40 ? "secondary" : "default"}
                className={currentStressLevel <= 40 ? "bg-green-100 text-green-700" : ""}
              >
                <Activity className="w-4 h-4 mr-1" />
                Stress: {Math.round(currentStressLevel)}%
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* AI-Powered Mobile App Introduction */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            AI-Powered Mental Wellness 🤖💰
          </h2>
          <p className="text-gray-600 text-lg">
            Advanced stress detection, smart interventions, and earning opportunities - all powered by AI
          </p>
        </div>

        {/* Mobile-First Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center">
              <Bot className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">AI Tools</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="earn" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Earn</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Core Features */}
              <div className="lg:col-span-2 space-y-6">
                {/* MindSalary Dashboard */}
                <MindSalaryDashboard 
                  score={mindSalaryScore} 
                  earnings={monthlyEarnings}
                  streak={currentStreak}
                />

                {/* Stealth Mode Check-in */}
                <StealthModeCheckin onComplete={handleStealthCheckin} />

                {/* Daily Check-in Card */}
                <Card className="bg-white/70 backdrop-blur-sm border-green-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Brain className="w-6 h-6 mr-2" />
                      Daily Resilience Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!hasCheckedInToday ? (
                      <DailyCheckIn onComplete={handleCheckInComplete} />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-700 mb-2">
                          Resilience Points Earned!
                        </h3>
                        <p className="text-gray-600">
                          You're building your professional mental fitness. Higher scores = Higher earning potential!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Social & Competition */}
              <div className="space-y-6">
                {/* Competitive Leaderboards */}
                <CompetitiveLeaderboards userScore={mindSalaryScore} />
                
                {/* Social Proof Engine */}
                <SocialProofEngine userScore={mindSalaryScore} />
                
                <InsightsPanel currentStreak={currentStreak} />
              </div>
            </div>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Journal Tool */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  AI-Powered Journaling
                </h3>
                <AIJournalTool onStressLevelUpdate={handleStressLevelUpdate} />
              </div>

              {/* AI Chatbot */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  AI Wellness Assistant
                </h3>
                <AIChatbot 
                  currentStressLevel={currentStressLevel}
                  onStressUpdate={handleStressLevelUpdate}
                />
              </div>
            </div>
          </TabsContent>

          {/* Background Monitor Tab */}
          <TabsContent value="monitor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Background Stress Monitor */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Background AI Monitoring
                </h3>
                <BackgroundStressMonitor 
                  onStressDetected={handleAIStressDetection}
                  isActive={backgroundMonitoringActive}
                />
              </div>

              {/* Mood Tracker & Quick Actions */}
              <div className="space-y-6">
                <MoodTracker />
                <QuickActions />
              </div>
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earn" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Earnings Tracker */}
              <EarningsTracker monthlyEarnings={monthlyEarnings} />

              {/* Career Opportunities */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Premium AI-Verified Opportunities!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Target className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-800">AI Wellness Consultant</h4>
                          <p className="text-sm text-green-600">
                            ₹3,50,000 - For professionals with AI-verified mental fitness scores 750+
                          </p>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Apply Now (Score: {mindSalaryScore})
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* MindSalary Score Details */}
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      AI-Enhanced MindSalary Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">AI-Verified Mental Fitness</span>
                          <span className="text-sm font-bold text-green-600">{mindSalaryScore}/1000</span>
                        </div>
                        <Progress value={mindSalaryScore/10} className="h-3" />
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>650+: AI-verified job access</div>
                        <div>750+: Executive opportunities with biometric proof</div>
                        <div>850+: Top 1% AI-certified earning potential</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">₹{Math.floor(mindSalaryScore * 200)}</p>
                          <p className="text-xs text-gray-600">AI-predicted monthly premium</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{Math.floor(mindSalaryScore/20)}%</p>
                          <p className="text-xs text-gray-600">Above market rate (AI-verified)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Section - AI-Powered Professional Network */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">AI-Powered Mental Fitness Network</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Bot className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">AI Talent Marketplace</h4>
                <p className="text-sm text-gray-600">
                  Get hired based on AI-verified mental resilience and behavioral patterns
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Real-time Support Network</h4>
                <p className="text-sm text-gray-600">
                  AI-matched peer support based on stress patterns and work challenges
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">AI Mental Fitness Certification</h4>
                <p className="text-sm text-gray-600">
                  Blockchain-verified credentials with biometric proof of mental resilience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
