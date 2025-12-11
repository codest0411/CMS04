import ResourceManager from '../components/resource/ResourceManager.jsx';

const TestimonialsPage = () => (
  <ResourceManager
    title='Testimonials'
    description='Capture only real voices from genuine collaborators or clients.'
    endpoint='/testimonials'
    columns={[
      { key: 'author', label: 'Author' },
      { key: 'company', label: 'Company' },
      { key: 'highlight', label: 'Highlighted', render: (val) => (val ? 'Yes' : '—') },
    ]}
    formFields={[
      { name: 'author', label: 'Author', placeholder: 'Aisha Khan', validation: { required: 'Author required' } },
      { name: 'role', label: 'Role', placeholder: 'Founder, Flux Studio' },
      { name: 'company', label: 'Company', placeholder: 'Flux Studio' },
      { name: 'content', label: 'Quote', type: 'textarea', rows: 4, placeholder: 'Write the unfiltered praise.', validation: { required: 'Quote required' } },
      { name: 'highlight', label: 'Highlight', type: 'checkbox', checkboxLabel: 'Mark as featured pull-quote' },
    ]}
  />
);

export default TestimonialsPage;
