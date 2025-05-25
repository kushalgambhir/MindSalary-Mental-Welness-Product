
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown, Zap, Coffee, Moon, Heart } from "lucide-react";

interface DailyCheckInProps {
  onComplete: () => void;
}

const DailyCheckIn = ({ onComplete }: DailyCheckInProps) => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string>("");
  const [energy, setEnergy] = useState([50]);
  const [stress, setStress] = useState([30]);
  const [gratitude, setGratitude] = useState("");
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  const moods = [
    { icon: Smile, label: "उत्साहित (Energetic)", value: "energetic", color: "text-green-600" },
    { icon: Heart, label: "खुश (Happy)", value: "happy", color: "text-pink-600" },
    { icon: Coffee, label: "focused", value: "focused", color: "text-blue-600" },
    { icon: Meh, label: "तटस्थ (Neutral)", value: "neutral", color: "text-gray-600" },
    { icon: Moon, label: "थका हुआ (Tired)", value: "tired", color: "text-purple-600" },
    { icon: Frown, label: "तनाव (Stressed)", value: "stressed", color: "text-red-600" },
  ];

  const stressFactors = [
    "Heavy workload", "Tight deadlines", "Team conflicts", "Management pressure",
    "Work-life balance", "Travel/commute", "Financial stress", "Family expectations",
    "Career uncertainty", "Health concerns", "Social pressure", "Technology issues"
  ];

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleSubmit = () => {
    // Here you would typically save the data
    console.log({
      mood,
      energy: energy[0],
      stress: stress[0],
      gratitude,
      stressFactors: selectedFactors
    });
    onComplete();
  };

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">
            How are you feeling right now?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moods.map((moodOption) => (
              <Card
                key={moodOption.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  mood === moodOption.value 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setMood(moodOption.value)}
              >
                <CardContent className="p-4 text-center">
                  <moodOption.icon className={`w-8 h-8 mx-auto mb-2 ${moodOption.color}`} />
                  <p className="text-sm font-medium">{moodOption.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={() => setStep(2)} 
            disabled={!mood}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Next →
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Energy & Stress Levels</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                  Energy Level
                </label>
                <Badge variant="secondary">{energy[0]}%</Badge>
              </div>
              <Slider
                value={energy}
                onValueChange={setEnergy}
                max={100}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Drained</span>
                <span>Energized</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-600" />
                  Stress Level
                </label>
                <Badge variant="secondary">{stress[0]}%</Badge>
              </div>
              <Slider
                value={stress}
                onValueChange={setStress}
                max={100}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Calm</span>
                <span>Overwhelmed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            ← Back
          </Button>
          <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">
            Next →
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">What's affecting your mood?</h3>
          <p className="text-sm text-gray-600 mb-4">Select all that apply (optional)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {stressFactors.map((factor) => (
              <Badge
                key={factor}
                variant={selectedFactors.includes(factor) ? "default" : "outline"}
                className={`cursor-pointer p-2 text-center justify-center ${
                  selectedFactors.includes(factor) 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => handleFactorToggle(factor)}
              >
                {factor}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            One thing you're grateful for today (optional)
          </label>
          <Textarea
            placeholder="Even small things count... a good cup of chai, a helpful colleague, or just making it through a tough meeting!"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            ← Back
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Complete Check-in ✓
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default DailyCheckIn;
