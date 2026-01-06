import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceChatButtonProps {
  className?: string;
}

export const VoiceChatButton: React.FC<VoiceChatButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const processCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase();
    
    // Simple command processing
    if (lowerText.includes('rice') && (lowerText.includes('price') || lowerText.includes('விலை'))) {
      return 'The current market price of Rice is approximately ₹2,200 per quintal. Prices have been stable over the last week.';
    }
    if (lowerText.includes('wheat') && (lowerText.includes('price') || lowerText.includes('விலை'))) {
      return 'The current market price of Wheat is approximately ₹2,400 per quintal. There is an upward trend expected.';
    }
    if (lowerText.includes('best time') || lowerText.includes('when to sell')) {
      return 'Based on current market trends, the next 5-7 days appear to be a good window for selling. Prices are expected to rise slightly.';
    }
    if (lowerText.includes('weather') || lowerText.includes('rain')) {
      return 'The weather forecast shows partly cloudy conditions with moderate temperatures. No significant rainfall expected in the next 3 days.';
    }
    if (lowerText.includes('onion') || lowerText.includes('வெங்காயம்')) {
      return 'Onion prices are currently at ₹1,800 per quintal with high demand. Good time to sell if you have ready stock.';
    }
    
    return 'I can help you with crop prices, best selling times, and weather information. Try asking about specific crop prices or market conditions.';
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);
      
      if (result.isFinal) {
        const answer = processCommand(text);
        setResponse(answer);
        speakResponse(answer);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isSupported, processCommand]);

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-24 right-4 md:bottom-8 h-14 w-14 rounded-full shadow-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 z-40',
          className
        )}
      >
        <Mic className="h-6 w-6" />
      </Button>

      {/* Voice Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-t-3xl md:rounded-2xl shadow-lg border border-border p-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Voice Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  setTranscript('');
                  setResponse('');
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-6">
              {/* Mic Button */}
              <button
                onClick={startListening}
                disabled={isListening}
                className={cn(
                  'relative h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300',
                  isListening
                    ? 'bg-destructive/20 animate-pulse'
                    : 'bg-primary/10 hover:bg-primary/20'
                )}
              >
                {isListening ? (
                  <MicOff className="h-10 w-10 text-destructive" />
                ) : (
                  <Mic className="h-10 w-10 text-primary" />
                )}
                
                {/* Ripple Effect */}
                {isListening && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
                    <span className="absolute inset-2 rounded-full bg-destructive/10 animate-ping animation-delay-150" />
                  </>
                )}
              </button>

              <p className="text-sm text-muted-foreground">
                {isListening ? t('voice.listening') : t('voice.speak')}
              </p>

              {/* Transcript */}
              {transcript && (
                <div className="w-full p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">You said:</p>
                  <p className="font-medium text-foreground">{transcript}</p>
                </div>
              )}

              {/* Response */}
              {response && (
                <div className="w-full p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-primary">Response:</p>
                  </div>
                  <p className="text-sm text-foreground">{response}</p>
                </div>
              )}

              {/* Example Queries */}
              {!transcript && !response && (
                <div className="w-full text-center">
                  <p className="text-xs text-muted-foreground">{t('voice.examples')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
