import { useState, useRef, useEffect } from 'react';
import { SpeechRecognitionType, isSpeechSupported } from '@/types/speech';

export const useSpeechRecognition = (onTranscript: (transcript: string) => void) => {
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<SpeechRecognitionType | null>(null);

    useEffect(() => {
        if (isSpeechSupported) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current!.continuous = true;
            recognitionRef.current!.interimResults = true;

            if (recognitionRef.current) {
                recognitionRef.current.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => result[0].transcript)
                        .join('');
                    onTranscript(transcript);
                };
            }

            if (recognitionRef.current) {
                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    setIsRecording(false);
                };
            }
        }
    }, [onTranscript]);

    const toggleRecording = () => {
        if (!isSpeechSupported) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsRecording(prev => !prev);
    };

    return { isRecording, toggleRecording };
};