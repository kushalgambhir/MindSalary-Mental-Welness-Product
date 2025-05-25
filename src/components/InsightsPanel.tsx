
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Award, Calendar, Users, Lightbulb, ArrowRight } from "lucide-react";

interface InsightsPanelProps {
  currentStreak: number;
}

const InsightsPanel = ({ currentStreak }: InsightsPanelProps) => {
  const weeklyGoal = 5; // days
  const completedDays = 4;
  const progressPercentage = (completedDays / weeklyGoal) * 100;

  const insights = [
    {
      title: "Peak Performance Time",
      description: "You're most productive between 10-11 AM",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Stress Pattern",
      description: "Stress peaks on Wednesdays - plan lighter schedules",
      icon: Target,
      color: "text-orange-600"
    },
    {
      title: "Social Connection",
      description: "You feel better after peer interactions",
      icon: Users,
      color: "text-green-600"
    }
  ];

  const achievements = [
    { name: "Week Warrior", description: "7-day check-in streak", achieved: true },
    { name: "Mindful Month", description: "30 days of wellness", achieved: false },
    { name: "Stress Buster", description: "Completed 10 breathing sessions", achieved: true },
    { name: "Community Helper", description: "Helped 5 peers", achieved: false },
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Goal Progress */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Target className="w-5 h-5 mr-2" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Check-ins this week</span>
                <span className="text-sm font-bold">{completedDays}/{weeklyGoal}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{currentStreak}</p>
              <p className="text-sm text-gray-600">Day Streak 🔥</p>
            </div>
            
            {progressPercentage >= 100 ? (
              <Badge className="w-full justify-center bg-green-100 text-green-700">
                <Award className="w-4 h-4 mr-1" />
                Goal Achieved!
              </Badge>
            ) : (
              <p className="text-xs text-gray-600 text-center">
                {weeklyGoal - completedDays} more check-ins to reach your weekly goal
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Insights */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Lightbulb className="w-5 h-5 mr-2" />
            Your Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                <div>
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full">
              View Detailed Report
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Award className="w-5 h-5 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  achievement.achieved ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.achieved ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm ${
                    achievement.achieved ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-xs ${
                    achievement.achieved ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Users className="w-5 h-5 mr-2" />
            Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">You're part of</p>
              <p className="text-xl font-bold text-blue-600">Tech Professionals</p>
              <p className="text-sm text-gray-600">Bangalore Group</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-purple-600">247</p>
                <p className="text-xs text-gray-600">Active members</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">89%</p>
                <p className="text-xs text-gray-600">Weekly engagement</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              Join Group Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
