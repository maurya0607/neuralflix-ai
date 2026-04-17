import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLoader, FiCpu, FiStar, FiActivity, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Immersive Neural Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full"></div>
        
        {/* Animated Grid / Scanlines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side: Cinematic Branding */}
        <div className="hidden md:flex flex-col gap-8 animate-fade-in pr-10">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              <FiCpu className="w-3 h-3" /> System Access
            </div>
            <h1 className="text-6xl font-medium tracking-tighter text-white">
              Initialize <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">Neural Sync.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              Enter the gateway to cinematic intelligence. VishwaNova AI awaits your creative directives.
            </p>
          </div>

          <div className="space-y-6 mt-4">
            {[
              { icon: <FiStar />, title: 'Cinematic Precision', desc: 'AI-driven narrative scaling' },
              { icon: <FiActivity />, title: 'Neural Realtime', desc: 'Instant script composition' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400">{feature.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-300">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
            
            <div className="text-center md:hidden mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">VishwaNova</h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Sign in to begin</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em]">Director Identity</label>
                <div className="relative group/field">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/field:text-indigo-400">
                    <FiMail className="h-4 w-4" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.com" 
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-gray-700 outline-none focus:border-indigo-500/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Secret Protocol</label>
                  <a href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-[0.1em]">Forgot?</a>
                </div>
                <div className="relative group/field">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/field:text-indigo-400">
                    <FiLock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passphrase" 
                    required
                    className="w-full pl-11 pr-12 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-gray-700 outline-none focus:border-indigo-500/30 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 hover:text-white shadow-xl flex items-center justify-center gap-2 group-hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {loading ? <FiLoader className="w-5 h-5 animate-spin" /> : 'Authorize Sync'}
              </button>
            </form>



            <p className="text-center text-[10px] font-bold text-gray-600 mt-8 uppercase tracking-widest">
              New Recuit?{' '}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-black tracking-[0.2em]">
                Initialize Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
