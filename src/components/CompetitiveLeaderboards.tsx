
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, TrendingUp, Users, MapPin } from "lucide-react";

interface CompetitiveLeaderboardsProps {
  userScore: number;
}

const CompetitiveLeaderboards = ({ userScore }: CompetitiveLeaderboardsProps) => {
  const cityLeaderboard = [
    { rank: 1, name: "Anonymous Tech Pro", score: 892, trend: "+15" },
    { rank: 2, name: "Marketing Maven", score: 876, trend: "+8" },
    { rank: 3, name: "Finance Ace", score: 845, trend: "+12" },
    { rank: 4, name: "You", score: userScore, trend: "+22", isUser: true },
    { rank: 5, name: "Startup Founder", score: 723, trend: "+5" }
  ];

  const industryLeaderboard = [
    { company: "Tech Giants (Anonymous)", avgScore: 758, employees: "50+" },
    { company: "Your Company", avgScore: 671, employees: "25+", isUser: true },
    { company: "Fintech Startups", avgScore: 645, employees: "30+" },
    { company: "E-commerce Leaders", avgScore: 612, employees: "40+" }
  ];

  const weeklyChallenge = {
    title: "Stress Mastery Challenge",
    participants: 12847,
    prize: "₹50,000",
    timeLeft: "3 days",
    userRank: 247
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-orange-500" />;
    return <span className="w-4 h-4 text-center text-xs font-bold">{rank}</span>;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-700">
          <Trophy className="w-5 h-5 mr-2" />
          Competitive Rankings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Weekly Challenge */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              {weeklyChallenge.title}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-orange-600">Prize Pool:</span>
                <span className="font-bold ml-2">{weeklyChallenge.prize}</span>
              </div>
              <div>
                <span className="text-orange-600">Your Rank:</span>
                <span className="font-bold ml-2">#{weeklyChallenge.userRank}</span>
              </div>
              <div>
                <span className="text-orange-600">Participants:</span>
                <span className="font-bold ml-2">{weeklyChallenge.participants.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-orange-600">Time Left:</span>
                <span className="font-bold ml-2">{weeklyChallenge.timeLeft}</span>
              </div>
            </div>
            <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
              Join Challenge
            </Button>
          </div>

          {/* City Leaderboard */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Bangalore Rankings
            </h4>
            <div className="space-y-2">
              {cityLeaderboard.map((entry, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    entry.isUser ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {getRankIcon(entry.rank)}
                    <span className={`text-sm ${entry.isUser ? 'font-bold text-blue-800' : 'text-gray-700'}`}>
                      {entry.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{entry.score}</span>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {entry.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry/Company Leaderboard */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-600" />
              Company Mental Fitness
            </h4>
            <div className="space-y-2">
              {industryLeaderboard.map((company, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    company.isUser ? 'bg-green-100 border border-green-300' : 'bg-gray-50'
                  }`}
                >
                  <div>
                    <span className={`text-sm ${company.isUser ? 'font-bold text-green-800' : 'text-gray-700'}`}>
                      {company.company}
                    </span>
                    <p className="text-xs text-gray-500">{company.employees} employees</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm">{company.avgScore}</span>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Challenge */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">
              👨‍👩‍👧‍👦 Family Mental Fitness Challenge
            </h4>
            <p className="text-sm text-purple-700 mb-3">
              Compete with family members anonymously. Your parents will be proud!
            </p>
            <div className="flex justify-between text-xs text-purple-600 mb-3">
              <span>Family Average: 687</span>
              <span>Your Score: {userScore}</span>
              <span>Rank: #2/4</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Invite Family Members
            </Button>
          </div>

          {/* Achievement Unlocks */}
          <div className="bg-yellow-50 rounded-lg p-3">
            <h4 className="font-semibold text-yellow-800 text-sm mb-2">
              🏆 Next Achievement Unlock
            </h4>
            <p className="text-xs text-yellow-700">
              Reach top 100 in Bangalore to unlock "Mental Fitness Influencer" badge
            </p>
            <div className="flex justify-between text-xs text-yellow-600 mt-2">
              <span>Current: #{cityLeaderboard.find(e => e.isUser)?.rank}</span>
              <span>Target: #100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveLeaderboards;
