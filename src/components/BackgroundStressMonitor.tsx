
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Eye, 
  Smartphone, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Zap,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { aiStressDetector } from "@/utils/aiStressDetection";

interface BiometricReading {
  timestamp: Date;
  touchPressure: number;
  touchDuration: number;
  appUsagePattern: number;
  typingSpeed: number;
  scrollingBehavior: number;
  stressLevel: number;
}

interface BackgroundStressMonitorProps {
  onStressDetected: (level: number) => void;
  isActive: boolean;
}

const BackgroundStressMonitor = ({ onStressDetected, isActive }: BackgroundStressMonitorProps) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentReading, setCurrentReading] = useState<BiometricReading | null>(null);
  const [readings, setReadings] = useState<BiometricReading[]>([]);
  const [lastAlert, setLastAlert] = useState<Date | null>(null);
  const [averageStress, setAverageStress] = useState(0);
  const [trendDirection, setTrendDirection] = useState<'up' | 'down' | 'stable'>('stable');

  // Simulate biometric sensors and behavioral tracking
  useEffect(() => {
    if (!isActive || !isMonitoring) return;

    const monitoringInterval = setInterval(() => {
      collectBiometricData();
    }, 30000); // Every 30 seconds

    return () => clearInterval(monitoringInterval);
  }, [isActive, isMonitoring]);

  // Analyze trends
  useEffect(() => {
    if (readings.length > 5) {
      const recentReadings = readings.slice(-5);
      const olderReadings = readings.slice(-10, -5);
      
      const recentAvg = recentReadings.reduce((sum, r) => sum + r.stressLevel, 0) / recentReadings.length;
      const olderAvg = olderReadings.reduce((sum, r) => sum + r.stressLevel, 0) / olderReadings.length;
      
      setAverageStress(recentAvg);
      
      if (recentAvg > olderAvg + 0.1) {
        setTrendDirection('up');
      } else if (recentAvg < olderAvg - 0.1) {
        setTrendDirection('down');
      } else {
        setTrendDirection('stable');
      }
    }
  }, [readings]);

  const collectBiometricData = async () => {
    try {
      // Simulate collecting real device data
      const touchData = simulateTouchData();
      const appUsage = simulateAppUsageData();
      const typing = simulateTypingData();
      const scrolling = simulateScrollingData();

      const biometricData = {
        touchPressure: [touchData.pressure],
        touchDuration: [touchData.duration],
        swipeVelocity: [scrolling.velocity]
      };

      // Use AI to predict stress from behavioral patterns
      const typingPattern = {
        keystrokeIntervals: [typing.interval],
        wordCount: typing.wordCount,
        backspaceCount: typing.backspaces,
        pauseDuration: typing.pause,
        typingSpeed: typing.speed
      };

      const textAnalysis = {
        sentiment: 0.5, // Neutral baseline
        stressKeywords: [],
        urgencyWords: 0,
        negativeWords: 0,
        anxietyIndicators: 0
      };

      const stressLevel = await aiStressDetector.predictStressLevel(
        typingPattern,
        textAnalysis,
        biometricData
      );

      const newReading: BiometricReading = {
        timestamp: new Date(),
        touchPressure: touchData.pressure,
        touchDuration: touchData.duration,
        appUsagePattern: appUsage.switchFrequency,
        typingSpeed: typing.speed,
        scrollingBehavior: scrolling.velocity,
        stressLevel: stressLevel
      };

      setCurrentReading(newReading);
      setReadings(prev => [...prev.slice(-49), newReading]); // Keep last 50 readings
      onStressDetected(stressLevel * 100);

      // Trigger alert if stress is high and hasn't alerted recently
      if (stressLevel > 0.75 && (!lastAlert || Date.now() - lastAlert.getTime() > 600000)) {
        triggerStressAlert(stressLevel);
        setLastAlert(new Date());
      }

    } catch (error) {
      console.error('Error collecting biometric data:', error);
    }
  };

  const simulateTouchData = () => {
    // Simulate touch pressure and duration data
    // Higher values typically indicate more stress
    const baselineStress = Math.random() * 0.3; // 0-30% baseline
    const situationalStress = Math.random() * 0.4; // 0-40% additional
    const totalStress = baselineStress + situationalStress;
    
    return {
      pressure: 30 + (totalStress * 70), // 30-100 pressure units
      duration: 100 + (totalStress * 200) // 100-300ms touch duration
    };
  };

  const simulateAppUsageData = () => {
    // Frequent app switching can indicate anxiety/stress
    const stressLevel = Math.random();
    return {
      switchFrequency: stressLevel * 10, // 0-10 switches per minute
      focusTime: (1 - stressLevel) * 300 // 0-300 seconds focus time
    };
  };

  const simulateTypingData = () => {
    const stressLevel = Math.random();
    return {
      speed: 40 + ((1 - stressLevel) * 60), // 40-100 WPM (stress reduces speed)
      interval: 100 + (stressLevel * 200), // 100-300ms between keystrokes
      pause: stressLevel * 2000, // 0-2000ms pause duration
      backspaces: Math.floor(stressLevel * 5), // 0-5 backspaces
      wordCount: Math.floor(10 + (Math.random() * 20))
    };
  };

  const simulateScrollingData = () => {
    const stressLevel = Math.random();
    return {
      velocity: 50 + (stressLevel * 150), // 50-200 pixels/second
      acceleration: stressLevel * 100, // 0-100 acceleration
      jerkiness: stressLevel * 10 // 0-10 jerkiness score
    };
  };

  const triggerStressAlert = (level: number) => {
    // This would trigger a notification in a real app
    console.log(`High stress detected: ${Math.round(level * 100)}%`);
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    collectBiometricData(); // Take initial reading
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const getStressColor = (level: number) => {
    if (level < 0.3) return "text-green-600";
    if (level < 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getStressLabel = (level: number) => {
    if (level < 0.3) return "Low";
    if (level < 0.6) return "Moderate";
    return "High";
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center text-blue-700">
            <Eye className="w-5 h-5 mr-2" />
            Background Stress Monitor
          </span>
          <div className="flex items-center space-x-2">
            {isMonitoring ? (
              <Badge className="bg-green-100 text-green-700">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Active
              </Badge>
            ) : (
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                Inactive
              </Badge>
            )}
            {currentReading && (
              <Badge variant="outline" className={getStressColor(currentReading.stressLevel)}>
                {getStressLabel(currentReading.stressLevel)}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Control Panel */}
          <div className="flex justify-center">
            {!isMonitoring ? (
              <Button onClick={startMonitoring} className="bg-blue-600 hover:bg-blue-700">
                <Smartphone className="w-4 h-4 mr-2" />
                Start Background Monitoring
              </Button>
            ) : (
              <Button onClick={stopMonitoring} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Stop Monitoring
              </Button>
            )}
          </div>

          {/* Current Reading */}
          {currentReading && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Current Biometric Reading
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Stress Level:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress 
                      value={currentReading.stressLevel * 100} 
                      className="flex-1 h-2" 
                    />
                    <span className={`font-bold ${getStressColor(currentReading.stressLevel)}`}>
                      {Math.round(currentReading.stressLevel * 100)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600">Touch Pressure:</span>
                  <p className="font-medium">{Math.round(currentReading.touchPressure)} units</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Touch Duration:</span>
                  <p className="font-medium">{Math.round(currentReading.touchDuration)}ms</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Typing Speed:</span>
                  <p className="font-medium">{Math.round(currentReading.typingSpeed)} WPM</p>
                </div>
                
                <div>
                  <span className="text-gray-600">App Usage:</span>
                  <p className="font-medium">{Math.round(currentReading.appUsagePattern)} switches/min</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Scroll Velocity:</span>
                  <p className="font-medium">{Math.round(currentReading.scrollingBehavior)} px/s</p>
                </div>
              </div>
            </div>
          )}

          {/* Stress Trend Analysis */}
          {readings.length > 3 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                {getTrendIcon()}
                <span className="ml-2">Stress Trend Analysis</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Average Stress (30min):</span>
                  <p className={`font-bold text-lg ${getStressColor(averageStress)}`}>
                    {Math.round(averageStress * 100)}%
                  </p>
                </div>
                
                <div>
                  <span className="text-blue-600">Trend Direction:</span>
                  <p className="font-medium capitalize flex items-center">
                    {getTrendIcon()}
                    <span className="ml-1">{trendDirection}</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-3">
                <span className="text-blue-600 text-sm">Data Points Collected:</span>
                <p className="font-medium">{readings.length} readings</p>
              </div>
            </div>
          )}

          {/* AI Insights */}
          {readings.length > 5 && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-3">
                🤖 AI Pattern Recognition
              </h4>
              
              <div className="text-sm text-purple-700 space-y-2">
                {averageStress > 0.6 && (
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                    <p>Elevated stress patterns detected. Consider taking micro-breaks.</p>
                  </div>
                )}
                
                {trendDirection === 'up' && (
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 mt-0.5" />
                    <p>Stress levels are trending upward. This might be a good time for intervention.</p>
                  </div>
                )}
                
                {trendDirection === 'down' && (
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5" />
                    <p>Great! Your stress levels are improving. Keep up the good work!</p>
                  </div>
                )}
                
                <div className="flex items-start space-x-2">
                  <BarChart3 className="w-4 h-4 mt-0.5" />
                  <p>
                    Your typing patterns suggest {currentReading?.typingSpeed && currentReading.typingSpeed < 60 ? 'high cognitive load' : 'normal cognitive state'}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Alert Settings */}
          <div className="border border-red-200 rounded-lg p-3 bg-red-50">
            <h5 className="font-semibold text-red-800 text-sm mb-2">
              🚨 Emergency Intervention Settings
            </h5>
            <p className="text-xs text-red-700">
              Automatic alerts trigger when stress exceeds 75% for sustained periods.
              Last alert: {lastAlert ? lastAlert.toLocaleTimeString() : 'None today'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackgroundStressMonitor;
