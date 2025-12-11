import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, tokens } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (tokens?.accessToken) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [tokens, navigate, location.state]);

  const onSubmit = async (values) => {
    const ok = await login(values);
    if (ok) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-dark text-white">
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className="absolute -top-24 -right-24 size-[420px] rounded-full bg-neon-pink/20 blur-[120px]" />
      <div className="absolute bottom-0 left-10 size-[360px] rounded-full bg-neon-blue/30 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col md:flex-row md:items-center md:justify-between px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md space-y-4"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-neon-green">Admin CMS</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Real portfolio content only.
          </h1>
          <p className="text-white/70">
            Log in with your Supabase admin credentials. Every change updates the live portfolio,
            so keep it authentic—no demo or fake entries.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 md:mt-0 w-full max-w-md rounded-[32px] border border-white/10 bg-black/50 backdrop-blur-xl p-8 shadow-2xl space-y-4"
        >
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
              placeholder="admin@yourdomain.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm text-white/70">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-20 text-white placeholder-white/40 focus:border-neon-green focus:outline-none"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 my-1 inline-flex items-center rounded-xl bg-white/10 px-3 text-xs font-medium text-white/80 hover:bg-white/20"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue py-3 font-semibold text-base-dark shadow-glow transition hover:opacity-90 disabled:opacity-40"
          >
            {loading ? 'Authenticating...' : 'Log in securely'}
          </button>
          <p className="text-xs text-center text-white/60">
            ⚠️ Only real accounts are allowed. Audited via Supabase auth.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginPage;
