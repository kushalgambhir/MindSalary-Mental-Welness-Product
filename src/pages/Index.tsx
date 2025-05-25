
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Zap, Users, Calendar, TrendingUp, PlayCircle, BookOpen } from "lucide-react";
import DailyCheckIn from "@/components/DailyCheckIn";
import MoodTracker from "@/components/MoodTracker";
import QuickActions from "@/components/QuickActions";
import InsightsPanel from "@/components/InsightsPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const { toast } = useToast();

  const handleCheckInComplete = () => {
    setHasCheckedInToday(true);
    setCurrentStreak(prev => prev + 1);
    toast({
      title: "🌟 Check-in complete!",
      description: "Great job taking care of your mental wellness today.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sukoon
                </h1>
                <p className="text-sm text-gray-600">Your mental wellness companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Zap className="w-4 h-4 mr-1" />
                {currentStreak} day streak
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Professional! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Take a moment for yourself. How are you feeling today?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Check-in */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Check-in Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Brain className="w-6 h-6 mr-2" />
                  Daily Energy Check-in
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!hasCheckedInToday ? (
                  <DailyCheckIn onComplete={handleCheckInComplete} />
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                      Check-in Complete!
                    </h3>
                    <p className="text-gray-600">
                      You've taken a great step towards self-care today.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mood Tracker */}
            <MoodTracker />

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Right Column - Insights & Stats */}
          <div className="space-y-6">
            <InsightsPanel currentStreak={currentStreak} />
            
            {/* Today's Recommendation */}
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">Today's Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <PlayCircle className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">5-Minute Focus Break</h4>
                      <p className="text-sm text-purple-600">
                        Based on your energy levels, try this breathing exercise
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Start Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wellness Score */}
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Wellness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Wellness</span>
                      <span className="text-sm font-bold text-blue-600">78%</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-xs text-gray-600">Good days this month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-xs text-gray-600">Sessions completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Resources */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Wellness Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Workplace Stress Guide</h4>
                <p className="text-sm text-gray-600">
                  Learn techniques to manage stress in Indian corporate culture
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Peer Support Groups</h4>
                <p className="text-sm text-gray-600">
                  Connect with professionals facing similar challenges
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Expert Consultations</h4>
                <p className="text-sm text-gray-600">
                  Book sessions with certified mental health professionals
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
