
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, DollarSign, Star, MapPin, Briefcase } from "lucide-react";

interface SocialProofEngineProps {
  userScore: number;
}

const SocialProofEngine = ({ userScore }: SocialProofEngineProps) => {
  const successStories = [
    {
      role: "Senior Developer",
      industry: "Tech",
      achievement: "30% salary increase",
      score: "780+",
      location: "Bangalore",
      timeframe: "3 months"
    },
    {
      role: "Marketing Manager", 
      industry: "E-commerce",
      achievement: "Promoted to Director",
      score: "850+",
      location: "Mumbai",
      timeframe: "6 months"
    },
    {
      role: "Consultant",
      industry: "Finance", 
      achievement: "₹2.5L monthly freelancing",
      score: "720+",
      location: "Delhi",
      timeframe: "4 months"
    }
  ];

  const peerStats = [
    { metric: "Professionals like you", value: "2,847", icon: Users },
    { metric: "Average score increase", value: "+125", icon: TrendingUp },
    { metric: "Monthly earnings boost", value: "₹35K", icon: DollarSign },
    { metric: "Career advancement", value: "89%", icon: Star }
  ];

  const yourCohort = {
    city: "Bangalore",
    industry: "Technology",
    scoreRange: "650-700",
    activeUsers: 1247,
    averageIncrease: "₹28,000"
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-700">
          <Users className="w-5 h-5 mr-2" />
          People Like You Are Succeeding
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Your Cohort Stats */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Your Professional Cohort
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-purple-600">Location:</span>
                <span className="font-semibold ml-2">{yourCohort.city}</span>
              </div>
              <div>
                <span className="text-purple-600">Industry:</span>
                <span className="font-semibold ml-2">{yourCohort.industry}</span>
              </div>
              <div>
                <span className="text-purple-600">Score Range:</span>
                <span className="font-semibold ml-2">{yourCohort.scoreRange}</span>
              </div>
              <div>
                <span className="text-purple-600">Active Users:</span>
                <span className="font-semibold ml-2">{yourCohort.activeUsers}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-purple-200">
              <p className="text-sm text-purple-700">
                <strong>Average monthly increase:</strong> {yourCohort.averageIncrease}
              </p>
            </div>
          </div>

          {/* Peer Statistics */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">This Week's Results</h4>
            <div className="grid grid-cols-2 gap-3">
              {peerStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Recent Success Stories</h4>
            <div className="space-y-3">
              {successStories.map((story, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-green-800 flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {story.role}
                    </span>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Score: {story.score}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-700 font-medium">{story.achievement}</p>
                  <div className="flex justify-between text-xs text-green-600 mt-1">
                    <span>{story.location} • {story.industry}</span>
                    <span>{story.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Validation */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              🎯 Your Score ({userScore}) vs. Peers
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              You're performing <strong>
                {userScore > 650 ? "above average" : "on track"}
              </strong> compared to professionals in your field.
            </p>
            <div className="flex justify-between text-xs text-blue-600">
              <span>Bottom 25%: 400-550</span>
              <span>Average: 550-650</span>
              <span>Top 25%: 650+</span>
            </div>
          </div>

          {/* Call to Action */}
          <Button variant="outline" className="w-full">
            <Users className="w-4 h-4 mr-2" />
            Join Your Industry Peer Group
          </Button>

          <p className="text-xs text-gray-500 text-center">
            All data anonymized. Individual results may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialProofEngine;
