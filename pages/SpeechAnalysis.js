import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import withAuthentication from "@/firebase/withAuthenticator";

const SpeechAnalysis = ({ user }) => {
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [uStream, setUStream] = useState(null);  // User's microphone stream
  const [audioContext, setAudioContext] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [recording, setRecording] = useState(false);

  // Ensure that window is available and only create AudioContext on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new (window.AudioContext || window.webkitAudioContext)()); // Only create once
    }
  }, []);

  // Handle audio stop and save the recording
  const handleAudioStop = async (blobUrl) => {
    console.log("Recording stopped, audio blob URL:", blobUrl); // Debug log
    setRecordedAudio(blobUrl);
    setAnalysisResult('Analyzing... Audio saved locally.');

    // Create a FormData object to send the file to the backend
    const formData = new FormData();
    
    // Fetch the blob data from the blob URL and create a Blob object
    const audioBlob = await fetch(blobUrl).then((res) => res.blob());
  
    // Append the audio blob to the FormData object
    formData.append('file', audioBlob, 'recorded-speech.wav'); // The second parameter is the filename (e.g., 'recorded-speech.wav')
  
    // Send the FormData to the backend (POST request)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze-audio/', {
        method: 'POST',
        body: formData, // Send audio file as part of the request body
      });
  
      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.prediction); // Update the result with the backend's prediction
      } else {
        setAnalysisResult('Error in analyzing the audio.');
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      setAnalysisResult('Error in sending the audio.');
    }
  };

  const startRecording = useCallback(async () => {
    if (!audioContext) return; // Ensure audioContext is initialized

    try {
      // Get user microphone stream
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setUStream(userStream);

      // Create a MediaStream from userStream
      const micSource = audioContext.createMediaStreamSource(userStream);

      // Create a MediaRecorder to record the combined stream
      const recorder = new MediaRecorder(userStream);
      setMediaRecorder(recorder);

      let mediaParts = [];
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          mediaParts.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(mediaParts, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setMediaUrl(url); // Store the URL for audio playback
        handleAudioStop(url); // Call handleAudioStop with the blob URL
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [audioContext]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop recording
      uStream?.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  }, [mediaRecorder, uStream]);

  return (
    <>
      <Nav />
      <div className="bg-white lg:mt-10 py-12 px-8 lg:px-20 min-h-screen">
        <h1 className="text-3xl lg:text-4xl font-bold text-purple-700 mb-6">Speech Deterioration Analysis</h1>
        <p className="text-lg lg:text-xl text-blue-900 mb-8">
          Record and analyze your speech for early signs of deterioration associated with Parkinson's disease.
        </p>

        <div className="bg-blue-100 p-6 rounded-2xl lg:mx-10 shadow-lg">
          {/* Recording Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side: Instructions and Record Button */}
            <div className="space-y-6">
              <h2 className="text-2xl text-blue-900 font-semibold">Record Your Speech</h2>
              <p className="text-gray-800">Click the microphone to start recording. Make sure your microphone is enabled on this device.</p>

              <div className="space-y-4">
                {/* Start/Stop Recording Buttons */}
                {!recording && (
                  <button
                    onClick={startRecording}
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
                  >
                    Start Recording
                  </button>
                )}
                {recording && (
                  <button
                    onClick={stopRecording}
                    className="bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600"
                  >
                    Stop Recording
                  </button>
                )}

                {/* Audio Player for Recording Playback */}
                {mediaUrl && (
                  <div className="mt-6">
                    <audio
                      src={mediaUrl}
                      controls
                      className="w-full max-w-4xl rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Analysis Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 bg-lightPurple text-white rounded-xl shadow-lg flex flex-col items-center"
            >
              <h2 className="text-xl font-bold my-7">Analysis Result</h2>
              <p className="text-lg">
                {analysisResult || 'Record your audio to see results.'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Explanation or Analysis Output Section */}
        <div className="mt-12 bg-gray-100 p-6 rounded-2xl lg:mx-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-700">How it works:</h2>
          <p className="text-gray-800 mt-4">
            Our analysis uses audio recordings to detect speech characteristics that may indicate early signs of speech deterioration. This can include factors like voice tremors, pauses, and vocal clarity.
          </p>
          <p className="text-gray-800 mt-2">
            Once recorded, our machine learning models (coming soon) will analyze your speech patterns, and any indications of Parkinson's-related changes will be highlighted here.
          </p>
        </div>
      </div>
    </>
  );
};

export default withAuthentication(SpeechAnalysis);
