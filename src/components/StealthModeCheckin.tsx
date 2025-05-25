
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, Brain, Zap, Clock, DollarSign } from "lucide-react";

interface StealthModeCheckinProps {
  onComplete: (stressLevel: number, focus: number) => void;
}

const StealthModeCheckin = ({ onComplete }: StealthModeCheckinProps) => {
  const [stressLevel, setStressLevel] = useState([50]);
  const [focusLevel, setFocusLevel] = useState([75]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateEarnings = () => {
    const stressBonus = stressLevel[0] > 70 ? Math.floor((stressLevel[0] - 70) * 2) : 0;
    const focusBonus = focusLevel[0] > 60 ? Math.floor((focusLevel[0] - 60) * 1.5) : 0;
    return stressBonus + focusBonus + 10; // Base 10 points
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete(stressLevel[0], focusLevel[0]);
      setIsSubmitting(false);
    }, 1000);
  };

  const earningPotential = calculateEarnings();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center text-blue-700">
            <Eye className="w-5 h-5 mr-2" />
            Stealth Mode Check-in
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Clock className="w-3 h-3 mr-1" />
            15 seconds
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-gray-600 mb-4">
            Quick professional assessment - embedded in your workflow
          </p>

          {/* Stress Level */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2 text-red-500" />
                Current Pressure Level
              </label>
              <Badge variant={stressLevel[0] > 70 ? "default" : "secondary"}>
                {stressLevel[0]}% {stressLevel[0] > 70 ? "🔥 High Earning!" : ""}
              </Badge>
            </div>
            <Slider
              value={stressLevel}
              onValueChange={setStressLevel}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Calm</span>
              <span>Peak Pressure (High ₹)</span>
            </div>
          </div>

          {/* Focus Level */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium flex items-center">
                <Brain className="w-4 h-4 mr-2 text-blue-500" />
                Mental Clarity
              </label>
              <Badge variant="secondary">{focusLevel[0]}%</Badge>
            </div>
            <Slider
              value={focusLevel}
              onValueChange={setFocusLevel}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Scattered</span>
              <span>Laser Focused</span>
            </div>
          </div>

          {/* Earning Preview */}
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">
                Resilience Points Earned:
              </span>
              <span className="font-bold text-green-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                +{earningPotential} points
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              {stressLevel[0] > 70 ? "High stress = High rewards! 🚀" : "Consistent logging builds your score"}
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Processing..." : "Log & Earn"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            This appears as "productivity check" in your calendar
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StealthModeCheckin;
