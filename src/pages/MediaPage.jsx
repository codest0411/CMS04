import { useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Upload, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetcher } from '../lib/api.js';
import { deleteResource, uploadFormData } from '../lib/resourceClient.js';
import { toast } from 'sonner';

const MediaPage = () => {
  const { data = [], mutate, isLoading } = useSWR('/upload', fetcher);
  const [uploading, setUploading] = useState(false);

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      await uploadFormData('/upload/image', formData, '📸 Media uploaded.');
      mutate();
    } catch (error) {
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id) => {
    await deleteResource(`/upload/${id}`, '🗑️ Media removed.');
    mutate();
  };

  return (
    <div className="space-y-6 text-white">
      <PageHeader
        title="Media library"
        description="Uploads sync to Supabase Storage. Keep only real, production assets."
        actions={
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25">
            <Upload className="size-4" />
            {uploading ? 'Uploading...' : 'Upload media'}
            <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
          </label>
        }
      />

      {isLoading ? (
        <p className="text-white/70">Loading media...</p>
      ) : data.length === 0 ? (
        <EmptyState
          title="No media uploaded yet"
          subtitle="All visuals must be authentic portfolio assets."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-black/30 overflow-hidden"
            >
              <img src={item.url} alt={item.alt} className="h-40 w-full object-cover" />
              <div className="p-4 space-y-2">
                <p className="text-sm font-semibold truncate">{item.file_name}</p>
                <p className="text-xs text-white/60">{(item.size_bytes / 1024).toFixed(0)} kB</p>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:bg-red-500/20"
                >
                  <Trash2 className="size-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaPage;
