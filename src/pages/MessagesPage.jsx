import { useState } from 'react';
import useSWR from 'swr';
import { Mail, CheckCircle2, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetcher } from '../lib/api.js';
import { deleteResource } from '../lib/resourceClient.js';
import ConfirmModal from '../components/modals/ConfirmModal.jsx';

const MessagesPage = () => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const {
    data = [],
    isLoading,
    mutate,
  } = useSWR('/messages', fetcher, {
    revalidateOnFocus: false,
  });

  const handleConfirmDelete = async () => {
    if (!confirmDelete?.id) {
      setConfirmDelete(null);
      return;
    }
    await deleteResource(`/messages/${confirmDelete.id}`, '🗑️ Message deleted.');
    setConfirmDelete(null);
    mutate();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Every message is real. Respond thoughtfully and mark them via Supabase."
      />
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 text-white">
        {isLoading ? (
          <p className="text-white/60">Loading messages...</p>
        ) : data.length === 0 ? (
          <EmptyState title="No contact inquiries yet" subtitle="Stay ready for real conversations." />
        ) : (
          <ul className="space-y-4">
            {data.map((message) => {
              const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
                message.email || ''
              )}&su=${encodeURIComponent(`Re: ${message.subject || ''}`)}&body=${encodeURIComponent(
                `Hi ${message.fullname || ''},\n\n`
              )}`;

              return (
                <li
                  key={message.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-2"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between text-sm text-white/70">
                    <span className="break-words">
                      {message.fullname}{' '}
                      <span className="text-white/50">·</span>{' '}
                      <a href={`mailto:${message.email}`} className="break-all">
                        {message.email}
                      </a>
                    </span>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(message)}
                        className="inline-flex items-center gap-1 rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs text-red-200 hover:bg-red-500/20"
                      >
                        <Trash2 className="size-3" /> Delete
                      </button>
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/15"
                      >
                        <Mail className="size-3" /> Reply in Gmail
                      </a>
                      {message.read ? (
                        <span className="inline-flex items-center gap-1 text-neon-green text-xs">
                          <CheckCircle2 className="size-4" /> Responded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-300 text-xs">
                          <Mail className="size-4" /> Unread
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-1 break-words line-clamp-2">
                    {message.subject}
                  </p>
                  <p className="mt-2 text-white/90 whitespace-pre-line break-words">
                    {message.body}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="I don\'t like this pic*"
        message="Are you sure you want to delete this message permanently? This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MessagesPage;
