
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Coins, Briefcase, Star } from "lucide-react";

interface EarningsTrackerProps {
  monthlyEarnings: number;
}

const EarningsTracker = ({ monthlyEarnings }: EarningsTrackerProps) => {
  const earningsBreakdown = [
    { source: "Stress Harvesting", amount: 3500, icon: Coins },
    { source: "Consistency Bonus", amount: 2200, icon: Star },
    { source: "Peer Support Karma", amount: 1800, icon: TrendingUp },
    { source: "Challenge Winnings", amount: 5000, icon: Target }
  ];

  const opportunities = [
    {
      title: "Senior Consultant - Crisis Management",
      company: "Anonymous Firm",
      salary: "₹2,50,000",
      requirement: "750+ MindSalary Score",
      match: "98%"
    },
    {
      title: "Freelance Project - Team Resilience Training", 
      company: "Tech Startup",
      salary: "₹75,000",
      requirement: "650+ Score + Peer Support Badge",
      match: "85%"
    }
  ];

  const monthlyTarget = 15000;
  const progressPercentage = (monthlyEarnings / monthlyTarget) * 100;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-green-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-green-700">
          <DollarSign className="w-5 h-5 mr-2" />
          Earnings from Mental Fitness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Monthly Progress */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-green-800">₹{monthlyEarnings.toLocaleString()}</span>
              <Badge className="bg-green-100 text-green-700">
                {Math.round(progressPercentage)}% of target
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>This Month</span>
              <span>Target: ₹{monthlyTarget.toLocaleString()}</span>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Earnings Breakdown</h4>
            <div className="space-y-3">
              {earningsBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">{item.source}</span>
                  </div>
                  <span className="font-bold text-green-700">₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Opportunities */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Premium Opportunities</h4>
            <div className="space-y-3">
              {opportunities.map((opp, index) => (
                <div key={index} className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-sm text-blue-800">{opp.title}</h5>
                      <p className="text-xs text-blue-600">{opp.company}</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {opp.match} match
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-700">{opp.salary}</span>
                    <span className="text-xs text-blue-600">{opp.requirement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Briefcase className="w-4 h-4 mr-2" />
              View All Jobs
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Boost Score
            </Button>
          </div>

          {/* Next Earning Opportunity */}
          <div className="bg-yellow-50 rounded-lg p-3">
            <h4 className="font-semibold text-yellow-800 text-sm mb-1">
              💡 Next Big Earning Opportunity
            </h4>
            <p className="text-xs text-yellow-700">
              Complete 5 more stress harvesting sessions to unlock a ₹1,25,000 consulting project
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsTracker;
