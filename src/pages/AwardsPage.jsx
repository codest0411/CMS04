import ResourceManager from '../components/resource/ResourceManager.jsx';

const AwardsPage = () => (
  <ResourceManager
    title="Awards"
    description="Showcase important awards and recognitions."
    endpoint="/awards"
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'issuer', label: 'Issuer' },
      { key: 'issued_on', label: 'Date' },
    ]}
    formFields={[
      {
        name: 'title',
        label: 'Title',
        placeholder: 'Best Developer Award',
        validation: { required: 'Title required' },
      },
      {
        name: 'issuer',
        label: 'Issuer',
        placeholder: 'Company / Organization',
      },
      { name: 'issued_on', label: 'Date', type: 'date' },
      { name: 'location', label: 'Location', placeholder: 'Remote / Bengaluru' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        placeholder: 'Context or details about the award',
      },
    ]}
  />
);

export default AwardsPage;
