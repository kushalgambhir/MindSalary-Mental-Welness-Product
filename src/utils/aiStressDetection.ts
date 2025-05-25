
import * as tf from '@tensorflow/tfjs';

interface TypingPattern {
  keystrokeIntervals: number[];
  wordCount: number;
  backspaceCount: number;
  pauseDuration: number;
  typingSpeed: number;
}

interface TextAnalysis {
  sentiment: number;
  stressKeywords: string[];
  urgencyWords: number;
  negativeWords: number;
  anxietyIndicators: number;
}

interface BiometricData {
  touchPressure: number[];
  touchDuration: number[];
  swipeVelocity: number[];
  heartRateVariability?: number;
}

export class AIStressDetector {
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    try {
      // In a real implementation, this would load a pre-trained model
      // For demo purposes, we'll create a simple neural network
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [15], units: 32, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({ units: 16, activation: 'relu' }),
          tf.layers.dense({ units: 1, activation: 'sigmoid' })
        ]
      });
      
      this.model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });
      
      this.isModelLoaded = true;
      console.log('AI Stress Detection Model loaded successfully');
    } catch (error) {
      console.error('Failed to load AI model:', error);
    }
  }

  analyzeTypingPattern(text: string, timings: number[]): TypingPattern {
    const words = text.split(' ').filter(word => word.length > 0);
    const keystrokeIntervals = timings.slice(1).map((time, i) => time - timings[i]);
    const backspaceCount = (text.match(/\b\w*\b/g) || []).length - words.length;
    
    return {
      keystrokeIntervals,
      wordCount: words.length,
      backspaceCount: Math.max(0, backspaceCount),
      pauseDuration: Math.max(...keystrokeIntervals) || 0,
      typingSpeed: words.length / (timings[timings.length - 1] - timings[0]) * 60000 || 0
    };
  }

  analyzeTextSentiment(text: string): TextAnalysis {
    const stressKeywords = [
      'deadline', 'pressure', 'overwhelmed', 'anxious', 'stressed', 'panic',
      'urgent', 'crisis', 'problem', 'issue', 'worried', 'frustrated',
      'exhausted', 'burnout', 'demanding', 'difficult', 'challenging'
    ];
    
    const urgencyWords = ['urgent', 'asap', 'immediately', 'emergency', 'critical', 'rush'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'fail'];
    const anxietyWords = ['worry', 'fear', 'nervous', 'anxious', 'concerned', 'doubt'];
    
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    const foundStressKeywords = stressKeywords.filter(keyword => 
      lowerText.includes(keyword)
    );
    
    const urgencyCount = urgencyWords.filter(word => 
      lowerText.includes(word)
    ).length;
    
    const negativeCount = negativeWords.filter(word => 
      lowerText.includes(word)
    ).length;
    
    const anxietyCount = anxietyWords.filter(word => 
      lowerText.includes(word)
    ).length;
    
    // Simple sentiment calculation
    const totalWords = words.length;
    const stressScore = (foundStressKeywords.length + urgencyCount + negativeCount + anxietyCount) / totalWords;
    
    return {
      sentiment: Math.max(0, Math.min(1, 1 - stressScore)), // 0 = negative, 1 = positive
      stressKeywords: foundStressKeywords,
      urgencyWords: urgencyCount,
      negativeWords: negativeCount,
      anxietyIndicators: anxietyCount
    };
  }

  analyzeBiometricData(touchData: BiometricData): number {
    // Analyze touch patterns for stress indicators
    const avgPressure = touchData.touchPressure.reduce((a, b) => a + b, 0) / touchData.touchPressure.length;
    const avgDuration = touchData.touchDuration.reduce((a, b) => a + b, 0) / touchData.touchDuration.length;
    const avgVelocity = touchData.swipeVelocity.reduce((a, b) => a + b, 0) / touchData.swipeVelocity.length;
    
    // Higher pressure, longer touch duration, and faster swipes often indicate stress
    const pressureStress = Math.min(1, avgPressure / 100); // Normalize to 0-1
    const durationStress = Math.min(1, avgDuration / 1000); // Normalize to 0-1
    const velocityStress = Math.min(1, avgVelocity / 500); // Normalize to 0-1
    
    return (pressureStress + durationStress + velocityStress) / 3;
  }

  async predictStressLevel(
    typingPattern: TypingPattern,
    textAnalysis: TextAnalysis,
    biometricData: BiometricData
  ): Promise<number> {
    if (!this.isModelLoaded || !this.model) {
      // Fallback calculation if AI model isn't loaded
      return this.calculateFallbackStress(typingPattern, textAnalysis, biometricData);
    }

    try {
      // Prepare input features
      const features = [
        // Typing features
        typingPattern.typingSpeed / 100, // Normalize
        typingPattern.backspaceCount / typingPattern.wordCount || 0,
        Math.min(1, typingPattern.pauseDuration / 5000), // Normalize pause duration
        
        // Text sentiment features
        1 - textAnalysis.sentiment, // Invert sentiment (higher = more stressed)
        textAnalysis.urgencyWords / 10, // Normalize
        textAnalysis.negativeWords / 10, // Normalize
        textAnalysis.anxietyIndicators / 10, // Normalize
        
        // Biometric features
        this.analyzeBiometricData(biometricData),
        
        // Additional computed features
        typingPattern.keystrokeIntervals.length > 0 ? 
          typingPattern.keystrokeIntervals.reduce((a, b) => a + b, 0) / typingPattern.keystrokeIntervals.length / 1000 : 0,
        textAnalysis.stressKeywords.length / 5, // Normalize
        
        // Time-based features (could be enhanced with actual time data)
        new Date().getHours() / 24, // Time of day
        new Date().getDay() / 7, // Day of week
        
        // Pattern consistency features
        typingPattern.keystrokeIntervals.length > 0 ? 
          Math.sqrt(typingPattern.keystrokeIntervals.reduce((sum, val, _, arr) => {
            const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
            return sum + Math.pow(val - mean, 2);
          }, 0) / typingPattern.keystrokeIntervals.length) / 1000 : 0, // Keystroke variance
        
        // Additional features
        0, // Placeholder for heart rate variability
        0  // Placeholder for additional biometric data
      ];

      const prediction = this.model.predict(tf.tensor2d([features])) as tf.Tensor;
      const stressLevel = await prediction.data();
      prediction.dispose();
      
      return stressLevel[0];
    } catch (error) {
      console.error('Error in AI prediction:', error);
      return this.calculateFallbackStress(typingPattern, textAnalysis, biometricData);
    }
  }

  private calculateFallbackStress(
    typingPattern: TypingPattern,
    textAnalysis: TextAnalysis,
    biometricData: BiometricData
  ): number {
    // Fallback stress calculation using rule-based approach
    let stressScore = 0;
    
    // Typing patterns indicating stress
    if (typingPattern.backspaceCount / typingPattern.wordCount > 0.3) stressScore += 0.2;
    if (typingPattern.pauseDuration > 3000) stressScore += 0.15;
    if (typingPattern.typingSpeed > 80 || typingPattern.typingSpeed < 20) stressScore += 0.1;
    
    // Text analysis indicating stress
    stressScore += (1 - textAnalysis.sentiment) * 0.3;
    stressScore += Math.min(0.2, textAnalysis.stressKeywords.length * 0.05);
    
    // Biometric indicators
    stressScore += this.analyzeBiometricData(biometricData) * 0.25;
    
    return Math.min(1, Math.max(0, stressScore));
  }

  async trainModel(trainingData: any[]) {
    // This would be used to continuously improve the model with user data
    console.log('Training model with new data points:', trainingData.length);
    // Implementation would depend on the specific training pipeline
  }
}

export const aiStressDetector = new AIStressDetector();
