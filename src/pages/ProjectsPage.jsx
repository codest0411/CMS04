import ResourceManager from '../components/resource/ResourceManager.jsx';

const ProjectsPage = () => (
  <ResourceManager
    title="Projects"
    description="Showcase work that actually shipped. Provide live links or repos where possible."
    endpoint="/projects"
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'featured', label: 'Featured', render: (val) => (val ? 'Yes' : '—') },
    ]}
    formFields={[
      { name: 'title', label: 'Title', placeholder: 'Neon portfolio OS', validation: { required: 'Title is required' } },
      { name: 'slug', label: 'Slug', placeholder: 'neon-portfolio-os', validation: { required: 'Slug is required' } },
      { name: 'summary', label: 'Summary', type: 'textarea', placeholder: 'One-liner about the impact' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 5, placeholder: 'Full write-up that will appear in detail view' },
      { name: 'preview_image_url', label: 'Preview image URL', placeholder: 'https://images.yourcdn.com/project-cover.png' },
      {
        name: 'preview_image_upload',
        label: 'Upload preview image',
        type: 'fileUpload',
        accept: 'image/*',
        targetField: 'preview_image_url',
      },
      { name: 'preview_url', label: 'Preview / case-study URL', placeholder: 'https://dribbble.com/shot-or-case-study' },
      { name: 'live_url', label: 'Live URL', placeholder: 'https://project.com' },
      { name: 'repo_url', label: 'Repository URL', placeholder: 'https://github.com/you/project' },
      {
        name: 'tech_stack',
        label: 'Tech stack (comma separated)',
        type: 'textarea',
        rows: 2,
        placeholder: 'React.js, Node.js, Tailwind CSS, Supabase',
        transform: (value) => value ? value.split(',').map(s => s.trim()).filter(Boolean) : [],
      },
      { name: 'featured', label: 'Featured', type: 'checkbox', checkboxLabel: 'Pin to hero slider' },
      { name: 'started_on', label: 'Started on', type: 'date' },
      { name: 'completed_on', label: 'Completed on', type: 'date' },
    ]}
  />
);

export default ProjectsPage;
