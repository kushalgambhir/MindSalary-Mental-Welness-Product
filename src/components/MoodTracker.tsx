
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MoodTracker = () => {
  // Mock data for the past week
  const weekData = [
    { day: 'Mon', mood: 'happy', energy: 75, stress: 30 },
    { day: 'Tue', mood: 'neutral', energy: 60, stress: 50 },
    { day: 'Wed', mood: 'stressed', energy: 45, stress: 80 },
    { day: 'Thu', mood: 'focused', energy: 70, stress: 40 },
    { day: 'Fri', mood: 'energetic', energy: 85, stress: 25 },
    { day: 'Sat', mood: 'happy', energy: 80, stress: 20 },
    { day: 'Sun', mood: 'neutral', energy: 65, stress: 35 },
  ];

  const getMoodColor = (mood: string) => {
    const colors = {
      energetic: 'bg-green-500',
      happy: 'bg-pink-500',
      focused: 'bg-blue-500',
      neutral: 'bg-gray-500',
      tired: 'bg-purple-500',
      stressed: 'bg-red-500',
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-500';
  };

  const getEnergyTrend = () => {
    const recentEnergy = weekData.slice(-3).map(d => d.energy);
    const avg = recentEnergy.reduce((a, b) => a + b, 0) / recentEnergy.length;
    const previousAvg = weekData.slice(-6, -3).map(d => d.energy).reduce((a, b) => a + b, 0) / 3;
    
    if (avg > previousAvg + 5) return { icon: TrendingUp, color: 'text-green-600', text: 'improving' };
    if (avg < previousAvg - 5) return { icon: TrendingDown, color: 'text-red-600', text: 'declining' };
    return { icon: Minus, color: 'text-gray-600', text: 'stable' };
  };

  const trend = getEnergyTrend();

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-700">Weekly Mood Pattern</span>
          <Badge variant="outline" className="flex items-center space-x-1">
            <trend.icon className={`w-4 h-4 ${trend.color}`} />
            <span className={trend.color}>{trend.text}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mood Timeline */}
          <div className="flex justify-between items-end space-x-2">
            {weekData.map((data, index) => (
              <div key={data.day} className="flex flex-col items-center space-y-2">
                <div className="text-xs text-gray-600 font-medium">{data.day}</div>
                <div className="relative">
                  {/* Energy bar */}
                  <div className="w-8 bg-gray-200 rounded-full overflow-hidden h-20">
                    <div
                      className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                      style={{ height: `${data.energy}%` }}
                    />
                  </div>
                  {/* Mood indicator */}
                  <div
                    className={`w-3 h-3 rounded-full ${getMoodColor(data.mood)} border-2 border-white absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-sm`}
                  />
                </div>
                <div className="text-xs text-gray-500">{data.energy}%</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gradient-to-t from-blue-400 to-blue-600 rounded"></div>
                <span className="text-gray-600">Energy Level</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600">Mood Indicator</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-semibold text-blue-800 mb-1">💡 Weekly Insight</h4>
            <p className="text-sm text-blue-700">
              Your energy peaks on Fridays and dips mid-week. Consider scheduling lighter tasks on Wednesdays.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
