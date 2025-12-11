import useSWR from 'swr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowUpRight, FolderGit2, PenSquare, Inbox, Sparkles, LayoutGrid, Shield, PanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsGrid from '../components/StatsGrid.jsx';
import { fetcher } from '../lib/api.js';
import EmptyState from '../components/EmptyState.jsx';
import PageHeader from '../components/PageHeader.jsx';

dayjs.extend(relativeTime);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: projects = [] } = useSWR('/projects', fetcher);
  const { data: blogs = [] } = useSWR('/blogs', fetcher);
  const { data: services = [] } = useSWR('/services', fetcher);
  const { data: messages = [] } = useSWR('/messages', fetcher);
  const { data: skills = [] } = useSWR('/skills', fetcher);
  const { data: experience = [] } = useSWR('/experience', fetcher);
  const { data: education = [] } = useSWR('/education', fetcher);
  const { data: awards = [] } = useSWR('/awards', fetcher);
  const { data: certificates = [] } = useSWR('/certificates', fetcher);
  const { data: about } = useSWR('/about', fetcher);

  const overviewCount =
    projects.length +
    blogs.length +
    services.length +
    messages.length +
    skills.length +
    experience.length +
    education.length +
    awards.length +
    certificates.length;

  const aboutCount = about?.id ? 1 : 0;
  const awardsCertificatesCount = awards.length + certificates.length;

  const stats = [
    {
      label: 'Overview',
      value: overviewCount,
      icon: LayoutGrid,
      accentClass: 'text-neon-green',
      to: '/',
    },
    {
      label: 'About',
      value: aboutCount,
      icon: Shield,
      accentClass: 'text-neon-pink',
      to: '/about',
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: PanelLeft,
      accentClass: 'text-neon-blue',
      to: '/skills',
    },
    {
      label: 'Projects',
      value: projects.length,
      icon: FolderGit2,
      accentClass: 'text-neon-green',
      to: '/projects',
    },
    {
      label: 'Blog posts',
      value: blogs.length,
      icon: PenSquare,
      accentClass: 'text-neon-pink',
      to: '/blogs',
    },
    {
      label: 'Experience',
      value: experience.length,
      icon: PanelLeft,
      accentClass: 'text-neon-green',
      to: '/experience',
    },
    {
      label: 'Education',
      value: education.length,
      icon: PanelLeft,
      accentClass: 'text-neon-purple',
      to: '/education',
    },
    {
      label: 'Awards & Certificates',
      value: awardsCertificatesCount,
      icon: PanelLeft,
      accentClass: 'text-neon-pink',
      to: '/achievements',
    },
    {
      label: 'Services',
      value: services.length,
      icon: Sparkles,
      accentClass: 'text-neon-blue',
      to: '/services',
    },
    {
      label: 'Unread messages',
      value: messages.filter((msg) => !msg.read).length,
      icon: Inbox,
      accentClass: 'text-yellow-300',
      to: '/messages',
    },
  ];

  const latestMessages = messages.slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live pulse"
        description="Monitor everything that powers your portfolio in one neon-lit cockpit."
      />

      <StatsGrid stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-left"
          >
            <h3 className="text-lg font-semibold">Latest projects</h3>
            <span className="text-sm text-white/50">{projects.length} total</span>
          </button>
          {projects.length === 0 ? (
            <div className="mt-6">
              <EmptyState title="No projects yet" subtitle="Add real case studies today." />
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {projects.slice(0, 4).map((project) => (
                <li
                  key={project.id}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/5 bg-black/20 px-4 py-3"
                >
                  <div>
                    <p className="font-medium break-words line-clamp-2">{project.title}</p>
                    <p className="text-xs text-white/60">
                      Updated {dayjs(project.updated_at).fromNow()}
                    </p>
                  </div>
                  <a
                    href={project.live_url || project.repo_url || '#'}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View <ArrowUpRight className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <button
            type="button"
            onClick={() => navigate('/messages')}
            className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-left"
          >
            <h3 className="text-lg font-semibold">New messages</h3>
            <span className="text-sm text-white/50">Last {latestMessages.length}</span>
          </button>
          {latestMessages.length === 0 ? (
            <div className="mt-6">
              <EmptyState title="Inbox is quiet" subtitle="Real inquiries will land here." />
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {latestMessages.map((message) => (
                <li
                  key={message.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 flex flex-col gap-1"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-sm">
                    <span className="font-semibold break-words">{message.fullname}</span>
                    <span className="text-white/60 whitespace-nowrap">
                      {dayjs(message.created_at).fromNow()}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 break-all">{message.email}</p>
                  <p className="text-white/80 mt-2 line-clamp-2 break-words">{message.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
