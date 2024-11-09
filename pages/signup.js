import { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'next/router';
import { useIsMobile } from '../components/hooks/useIsMobile.js';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      sessionStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', 'true');

      setEmail('');
      setPassword('');
      setConfirmPassword('');

      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      sessionStorage.setItem('email', user.email);
      localStorage.setItem('isLoggedIn', 'true');

      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Error with Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${isMobile ? '/assets/bg_laptop.png' : '/assets/bg_laptop.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-opacity duration-500 opacity-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSignUp} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-green-600 rounded-md focus:outline-none hover:bg-green-700"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="mt-6 w-full py-2 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition"
          >
            <FcGoogle className="mr-2 text-2xl" />
            {loading ? 'Signing Up with Google...' : 'Sign Up with Google'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-green-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
