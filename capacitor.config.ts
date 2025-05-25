
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a5d6bdea778a45e5ba2b554dd6310c6a',
  appName: 'MindSalary AI',
  webDir: 'dist',
  server: {
    url: 'https://a5d6bdea-778a-45e5-ba2b-554dd6310c6a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: true,
      spinnerColor: '#3b82f6'
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#3b82f6'
    },
    Keyboard: {
      resize: 'ionic'
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#3b82f6'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true,
    captureInput: true
  }
};

export default config;
