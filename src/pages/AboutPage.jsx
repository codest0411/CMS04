import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Loader2, Save, Upload, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { fetcher } from '../lib/api.js';
import { putResource, uploadFormData } from '../lib/resourceClient.js';
import { toast } from 'sonner';

const AboutPage = () => {
  const { data, isLoading, mutate } = useSWR('/about', fetcher);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      headline: '',
      bio: '',
      highlight: '',
      profile_image_url: '',
      resume_url: '',
      socials: '',
    },
  });

  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        headline: data.headline || '',
        bio: data.bio || '',
        highlight: Array.isArray(data.highlight) ? data.highlight.join('\n') : '',
        profile_image_url: data.profile_image_url || '',
        resume_url: data.resume_url || '',
        socials: Array.isArray(data.socials)
          ? data.socials
              .map((item) => `${item.platform || 'Platform'}|${item.url || ''}`)
              .join('\n')
          : '',
      });
    }
  }, [data, reset]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingResume(true);
      const formData = new FormData();
      formData.append('file', file);
      const uploaded = await uploadFormData('/upload/resume', formData, '📄 Resume uploaded.');

      if (uploaded?.url) {
        setValue('resume_url', uploaded.url, { shouldDirty: true, shouldTouch: true });
        toast.success('Resume URL updated. Don’t forget to save About section.');
      }
    } catch (error) {
      toast.error('Unable to upload resume.');
    } finally {
      setIsUploadingResume(false);
      event.target.value = '';
    }
  };

  const handleClearResume = () => {
    setValue('resume_url', '', { shouldDirty: true, shouldTouch: true });
    toast.message('Resume cleared from profile. Save to persist this change.');
  };

  const onSubmit = async (values) => {
    const payload = {
      id: values.id,
      headline: values.headline,
      bio: values.bio,
      highlight: values.highlight
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      profile_image_url: values.profile_image_url,
      resume_url: values.resume_url,
      socials: values.socials
        .split('\n')
        .map((line) => {
          const [platform, url] = line.split('|').map((part) => part.trim());
          if (!platform || !url) return null;
          return { platform, url };
        })
        .filter(Boolean),
    };

    await putResource('/about', payload, '✨ About section updated.');
    mutate();
  };

  return (
    <div>
      <PageHeader
        title="About section"
        description="Craft the narrative exactly how you want it to appear on the public portfolio."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white"
      >
        <div className="space-y-2">
          <label className="text-sm text-white/70">Headline</label>
          <input
            type="text"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
            placeholder="Creative Technologist & Storyteller"
            {...register('headline', { required: 'Headline is required' })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Bio</label>
          <textarea
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-green focus:outline-none"
            placeholder="Share your real journey, impact, and ethos."
            {...register('bio', { required: 'Bio is required' })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Highlights (one per line)</label>
          <textarea
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-blue focus:outline-none"
            placeholder={'Led multi-million product launch\nBuilt a Gen-Z brand OS'}
            {...register('highlight')}
          />
          <p className="text-xs text-white/50">These become key bullet highlights on the hero.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Profile image URL</label>
          <input
            type="url"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-blue focus:outline-none"
            placeholder="https://images.cdn/profile.jpg"
            {...register('profile_image_url')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Resume PDF URL</label>
          <input
            type="url"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-blue focus:outline-none"
            placeholder="https://cdn.yoursite.com/resume.pdf"
            {...register('resume_url')}
          />
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-medium hover:bg-white/25">
              <Upload className="size-3" />
              {isUploadingResume ? 'Uploading…' : 'Upload PDF resume'}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleResumeUpload}
              />
            </label>
            <button
              type="button"
              onClick={handleClearResume}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-white/70 hover:bg-white/20"
            >
              <Trash2 className="size-3" />
              Remove resume
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Social links (Platform|URL per line)</label>
          <textarea
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-neon-blue focus:outline-none"
            placeholder={'Instagram|https://instagram.com/you\nLinkedIn|https://linkedin.com/in/you'}
            {...register('socials')}
          />
          <p className="text-xs text-white/50">Format: Platform|https://link</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue px-6 py-3 font-semibold text-base-dark shadow-glow disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save real content
        </button>
      </form>
    </div>
  );
};

export default AboutPage;
