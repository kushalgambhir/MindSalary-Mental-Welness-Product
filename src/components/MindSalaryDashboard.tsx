
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Zap, Target, Star, Trophy } from "lucide-react";

interface MindSalaryDashboardProps {
  score: number;
  earnings: number;
  streak: number;
}

const MindSalaryDashboard = ({ score, earnings, streak }: MindSalaryDashboardProps) => {
  const getScoreLevel = (score: number) => {
    if (score >= 850) return { level: "Elite", color: "text-purple-600", bg: "bg-purple-100" };
    if (score >= 750) return { level: "Expert", color: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 650) return { level: "Professional", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 500) return { level: "Developing", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "Beginner", color: "text-gray-600", bg: "bg-gray-100" };
  };

  const scoreLevel = getScoreLevel(score);
  const nextMilestone = score < 650 ? 650 : score < 750 ? 750 : score < 850 ? 850 : 1000;
  const progressToNext = ((score % 100) / 100) * 100;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-green-700">MindSalary Score™ Dashboard</span>
          <Badge className={`${scoreLevel.bg} ${scoreLevel.color}`}>
            <Trophy className="w-4 h-4 mr-1" />
            {scoreLevel.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">{score}</span>
              </div>
              <div className="absolute -top-2 -right-2">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Mental Fitness Score</p>
            <p className="text-xs text-gray-500">Out of 1000</p>
          </div>

          {/* Earnings Display */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">₹{earnings.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xs text-green-600">+₹{Math.floor(earnings * 0.15)} from stress management</p>
          </div>

          {/* Streak Display */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-orange-600">{streak}</span>
            </div>
            <p className="text-sm text-gray-600">Day Streak</p>
            <p className="text-xs text-orange-600">Consistency bonus: +5 points/day</p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to {nextMilestone}+ Level</span>
              <span className="text-sm font-bold">{score}/{nextMilestone}</span>
            </div>
            <Progress value={(score / nextMilestone) * 100} className="h-3" />
          </div>

          {/* Benefits at Next Level */}
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              Unlock at {nextMilestone}+ Score:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {nextMilestone === 650 && (
                <>
                  <li>• Access to premium job opportunities</li>
                  <li>• 15-20% higher freelance rates</li>
                  <li>• Mental fitness certification badge</li>
                </>
              )}
              {nextMilestone === 750 && (
                <>
                  <li>• Executive-level positions</li>
                  <li>• Leadership coaching opportunities</li>
                  <li>• Corporate training facilitator roles</li>
                </>
              )}
              {nextMilestone === 850 && (
                <>
                  <li>• Top 1% earning potential</li>
                  <li>• C-suite advisory positions</li>
                  <li>• International consulting opportunities</li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Boost Score
            </Button>
            <Button variant="outline" className="flex-1">
              <DollarSign className="w-4 h-4 mr-2" />
              View Opportunities
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindSalaryDashboard;
