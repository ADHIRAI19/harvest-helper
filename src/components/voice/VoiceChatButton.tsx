import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/hooks/useAppContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Language codes for speech recognition
const LANGUAGE_CODES: Record<string, string> = {
  'ta': 'ta-IN', // Tamil
  'te': 'te-IN', // Telugu
  'hi': 'hi-IN', // Hindi
  'kn': 'kn-IN', // Kannada
  'ml': 'ml-IN', // Malayalam
  'mr': 'mr-IN', // Marathi
  'pa': 'pa-IN', // Punjabi
  'bn': 'bn-IN', // Bengali
  'gu': 'gu-IN', // Gujarati
  'or': 'or-IN', // Odia
  'as': 'as-IN', // Assamese
  'ur': 'ur-IN', // Urdu
  'en': 'en-IN', // English (India)
};

interface VoiceChatButtonProps {
  className?: string;
}

export const VoiceChatButton: React.FC<VoiceChatButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { selectedCrop, selectedState, selectedDistrict, selectedMarket, language } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  // Get voice for the detected language
  const getVoiceForLanguage = useCallback((langCode: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = langCode.split('-')[0];
    
    // Try to find a voice matching the language
    let voice = voices.find(v => v.lang.startsWith(langPrefix) && v.lang.includes('IN'));
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(langPrefix));
    }
    if (!voice) {
      voice = voices.find(v => v.lang.includes('IN')) || voices[0];
    }
    return voice;
  }, []);

  const speakResponse = useCallback((text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_CODES[langCode] || 'en-IN';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    
    const voice = getVoiceForLanguage(langCode);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [getVoiceForLanguage]);

  const processWithAI = useCallback(async (text: string) => {
    setIsProcessing(true);
    
    try {
      const context = {
        selectedCrop: selectedCrop?.name,
        location: selectedState ? {
          state: selectedState,
          district: selectedDistrict,
          market: selectedMarket,
        } : null,
        language: language,
      };

      const { data, error } = await supabase.functions.invoke('voice-assistant', {
        body: { message: text, context }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const aiResponse = data.response;
      setResponse(aiResponse);
      
      // Detect language from response for TTS
      const responseLang = detectLanguageFromText(aiResponse);
      setDetectedLanguage(responseLang);
      speakResponse(aiResponse, responseLang);
      
    } catch (error) {
      console.error('AI processing error:', error);
      const fallbackResponse = getFallbackResponse(text);
      setResponse(fallbackResponse);
      speakResponse(fallbackResponse, 'en');
      
      toast({
        title: "Connection Issue",
        description: "Using offline mode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedCrop, selectedState, selectedDistrict, selectedMarket, language, speakResponse, toast]);

  // Simple language detection from text
  const detectLanguageFromText = (text: string): string => {
    // Tamil
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    // Telugu
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
    // Hindi/Devanagari
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    // Kannada
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
    // Malayalam
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
    // Bengali
    if (/[\u0980-\u09FF]/.test(text)) return 'bn';
    // Gujarati
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
    // Punjabi/Gurmukhi
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
    // Odia
    if (/[\u0B00-\u0B7F]/.test(text)) return 'or';
    // Default to English
    return 'en';
  };

  // Fallback responses when AI is unavailable
  const getFallbackResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('rice') || lowerText.includes('நெல்') || lowerText.includes('धान')) {
      return 'Rice prices are currently around ₹2,200 per quintal. Markets are stable.';
    }
    if (lowerText.includes('wheat') || lowerText.includes('गेहूं') || lowerText.includes('கோதுமை')) {
      return 'Wheat is trading at ₹2,400 per quintal with steady demand.';
    }
    if (lowerText.includes('weather') || lowerText.includes('மழை') || lowerText.includes('बारिश')) {
      return 'Check local weather updates. Current conditions appear favorable for farming.';
    }
    
    return 'Please ask about crop prices, weather, or best time to sell. Example: "What is rice price today?"';
  };

  const startListening = useCallback(() => {
    if (!isSupported || isListening || isProcessing) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    // Set language based on app preference, but allow detection of any Indian language
    recognition.lang = LANGUAGE_CODES[language] || 'en-IN';

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
      
      // Detect language from input
      const inputLang = detectLanguageFromText(text);
      setDetectedLanguage(inputLang);
      
      if (result.isFinal) {
        processWithAI(text);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        toast({
          title: "No speech detected",
          description: "Please try speaking again.",
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, isListening, isProcessing, language, processWithAI, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const handleClose = useCallback(() => {
    stopListening();
    stopSpeaking();
    setIsOpen(false);
    setTranscript('');
    setResponse('');
  }, [stopListening, stopSpeaking]);

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
        aria-label="Open voice assistant"
      >
        <Mic className="h-6 w-6" />
      </Button>

      {/* Voice Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-t-3xl md:rounded-2xl shadow-lg border border-border p-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Krishi Mitra</h3>
                <p className="text-xs text-muted-foreground">கிருஷி மித்ரா • कृषि मित्र</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-6">
              {/* Mic Button */}
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={cn(
                  'relative h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300',
                  isProcessing && 'opacity-50 cursor-not-allowed',
                  isListening
                    ? 'bg-destructive/20'
                    : 'bg-primary/10 hover:bg-primary/20'
                )}
              >
                {isProcessing ? (
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                ) : isListening ? (
                  <MicOff className="h-10 w-10 text-destructive" />
                ) : (
                  <Mic className="h-10 w-10 text-primary" />
                )}
                
                {/* Ripple Effect */}
                {isListening && !isProcessing && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
                    <span className="absolute inset-2 rounded-full bg-destructive/10 animate-ping animation-delay-150" />
                  </>
                )}
              </button>

              <p className="text-sm text-muted-foreground text-center">
                {isProcessing 
                  ? 'Processing...' 
                  : isListening 
                    ? t('voice.listening')
                    : 'Tap to speak in any Indian language'}
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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className={cn("h-4 w-4 text-primary", isSpeaking && "animate-pulse")} />
                      <p className="text-sm font-medium text-primary">Response:</p>
                    </div>
                    {isSpeaking && (
                      <Button variant="ghost" size="sm" onClick={stopSpeaking} className="h-6 text-xs">
                        Stop
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{response}</p>
                </div>
              )}

              {/* Example Queries */}
              {!transcript && !response && (
                <div className="w-full space-y-2">
                  <p className="text-xs text-muted-foreground text-center mb-3">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'நெல் விலை என்ன?',
                      'गेहूं का भाव?',
                      'Best time to sell?',
                      'Weather today?'
                    ].map((example) => (
                      <button
                        key={example}
                        onClick={() => {
                          setTranscript(example);
                          processWithAI(example);
                        }}
                        className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
