
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Headphones, MessageCircle, Book, Coffee, Zap, Clock, Heart } from "lucide-react";

const QuickActions = () => {
  const quickActions = [
    {
      icon: PlayCircle,
      title: "2-Min Breathing",
      subtitle: "Quick stress relief",
      duration: "2 min",
      color: "bg-green-100 text-green-700",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Headphones,
      title: "Focus Music",
      subtitle: "Concentration boost",
      duration: "10 min",
      color: "bg-blue-100 text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: Coffee,
      title: "Mindful Break",
      subtitle: "Reset your energy",
      duration: "5 min",
      color: "bg-amber-100 text-amber-700",
      buttonColor: "bg-amber-600 hover:bg-amber-700"
    },
    {
      icon: MessageCircle,
      title: "Peer Chat",
      subtitle: "Connect with others",
      duration: "Now",
      color: "bg-purple-100 text-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: Book,
      title: "Wellness Tip",
      subtitle: "Daily wisdom",
      duration: "1 min",
      color: "bg-pink-100 text-pink-700",
      buttonColor: "bg-pink-600 hover:bg-pink-700"
    },
    {
      icon: Zap,
      title: "Energy Booster",
      subtitle: "Quick exercises",
      duration: "3 min",
      color: "bg-yellow-100 text-yellow-700",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700"
    }
  ];

  const emergencySupport = {
    icon: Heart,
    title: "Need Immediate Support?",
    subtitle: "Connect with a professional right now",
    action: "Get Help Now"
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-700">Quick Wellness Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer bg-white/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {action.duration}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{action.subtitle}</p>
                <Button size="sm" className={`w-full ${action.buttonColor} text-white`}>
                  Start Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Support */}
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <emergencySupport.icon className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-red-800">{emergencySupport.title}</h4>
              <p className="text-sm text-red-600">{emergencySupport.subtitle}</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              {emergencySupport.action}
            </Button>
          </div>
          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-red-700">
              <strong>Crisis Helplines:</strong> NIMHANS: 080-46110007 | Vandrevala Foundation: 9999 666 555 | iCall: 9152987821
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
