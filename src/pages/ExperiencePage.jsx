import ResourceManager from '../components/resource/ResourceManager.jsx';

const ExperiencePage = () => (
  <ResourceManager
    title="Experience timeline"
    description="Document only actual roles, clients, or collaborations you’ve done."
    endpoint="/experience"
    columns={[
      { key: 'company', label: 'Company' },
      { key: 'title', label: 'Title' },
      { key: 'start_date', label: 'Start' },
      { key: 'end_date', label: 'End' },
    ]}
    formFields={[
      { name: 'company', label: 'Company', placeholder: 'Neon Labs', validation: { required: 'Company required' } },
      { name: 'title', label: 'Title', placeholder: 'Lead Product Designer', validation: { required: 'Title required' } },
      { name: 'start_date', label: 'Start date', type: 'date', validation: { required: 'Start date required' } },
      { name: 'end_date', label: 'End date', type: 'date' },
      { name: 'location', label: 'Location', placeholder: 'Remote / Bengaluru' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        placeholder: 'Highlights of impact',
      },
      {
        name: 'skills',
        label: 'Skills (optional)',
        type: 'textarea',
        rows: 3,
        placeholder: 'e.g. React.js, Node.js, TypeScript',
      },
    ]}
  />
);

export default ExperiencePage;
