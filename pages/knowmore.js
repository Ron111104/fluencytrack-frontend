import { FaCheckCircle } from 'react-icons/fa';
import Nav from '@/components/Nav';

const KnowMore = () => {
  return (
    <>
    <Nav/>
    <div className="bg-gray-100 lg:px-20 lg:mt-10 py-14 px-8 min-h-screen">
      <h2 className="text-center text-4xl font-bold text-purple-800 mb-10">Know More About Our Parkinson's Analysis Tool</h2>
      
      {/* Parkinson's Disease Speech Analysis Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h3 className="text-3xl font-semibold text-purple-800 mb-4">Parkinson's Disease Speech Analysis</h3>
        <p className="text-lg text-gray-800 mb-6">
          This tool uses audio recordings to help detect signs of Parkinson's disease and track patient progress through speech therapy.
        </p>

        {/* Steps */}
        <ul className="space-y-4 text-gray-800">
          {[
            { title: 'Data Collection', content: 'We start by downloading a dataset of audio recordings in .wav format from patients with Parkinson\'s disease.' },
            { title: 'Extracting Important Information', content: 'We analyze the audio using techniques capturing pitch, jitter, and harmonics.' },
            { title: 'Training Machine Learning Models', content: 'Using data from audio, we train four ML models: Logistic Regression, Decision Tree, SVM, and KNN.' },
            { title: 'Testing the Models', content: 'We test the models on new data to determine the best model for Parkinson’s detection.' },
            { title: 'Tracking Therapy Sessions', content: 'Healthcare providers can track sessions and view predictions on patient progress.' },
            { title: 'Results and Reporting', content: 'Summarized report includes model accuracy and insights for adjusting treatment plans.' },
          ].map((step, idx) => (
            <li key={idx} className="flex items-start">
              <FaCheckCircle className="text-green-500 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold">{step.title}</h4>
                <p>{step.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Feature Extraction Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-3xl font-semibold text-purple-800 mb-4">Feature Extraction for Parkinson's Detection</h3>
        <ul className="space-y-4 text-gray-800">
          {[
            { title: 'Mean, Max, Min Frequency', content: 'Measures pitch control, revealing stability issues in Parkinson’s patients.' },
            { title: 'Jitter', content: 'Indicates vocal instability and irregular vibrations, which are higher in Parkinson’s.' },
            { title: 'Shimmer', content: 'Shows variation in loudness, with higher values indicating instability.' },
            { title: 'Noise-to-Harmonics Ratio (NHR)', content: 'A higher ratio indicates a “breathy” or hoarse voice quality.' },
            { title: 'Harmonics-to-Noise Ratio (HNR)', content: 'Lower HNR values indicate weakened vocal cords.' },
            { title: 'Recurrence Period Density Entropy (RPDE)', content: 'Higher RPDE suggests speech rhythm issues.' },
            { title: 'Detrended Fluctuation Analysis (DFA)', content: 'Higher values suggest more irregular fluctuations in voice.' },
            { title: 'Spread1 and Spread2', content: 'Shows vocal control or range limitations.' },
            { title: 'D2 (Nonlinear Dynamical Complexity)', content: 'Measures randomness in voice, often higher in affected voices.' },
            { title: 'Pitch Period Entropy (PPE)', content: 'High PPE indicates lack of steady pitch, common in vocal impairment.' },
          ].map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FaCheckCircle className="text-green-500 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p>{feature.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default KnowMore;
