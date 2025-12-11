import ResourceManager from '../components/resource/ResourceManager.jsx';

const BlogsPage = () => (
  <ResourceManager
    title="Blog posts"
    description="Publish thought leadership that’s actually yours. No lorem filler."
    endpoint="/blogs"
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'status', label: 'Status' },
    ]}
    formFields={[
      { name: 'title', label: 'Title', placeholder: 'Designing with neon gradients', validation: { required: 'Title required' } },
      { name: 'slug', label: 'Slug', placeholder: 'designing-with-neon-gradients', validation: { required: 'Slug required' } },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Two-line teaser for the article' },
      {
        name: 'preview_image_file',
        label: 'Preview image',
        type: 'fileUpload',
        targetField: 'preview_image_url',
        accept: 'image/*',
      },
      {
        name: 'preview_image_url',
        label: 'Preview image URL',
        type: 'text',
        placeholder: 'Will be filled after upload',
      },
      {
        name: 'readme_file',
        label: 'README file',
        type: 'fileToText',
        targetField: 'readme',
        accept: '.md,.txt',
      },
      {
        name: 'readme',
        label: 'README',
        type: 'textarea',
        rows: 10,
        placeholder: 'Paste the contents of your README file here (will be shown line by line).',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
          { value: 'archived', label: 'Archived' },
        ],
        validation: { required: 'Status is required' },
      },
      { name: 'published_at', label: 'Published at', type: 'datetime-local' },
    ]}
  />
);

export default BlogsPage;
