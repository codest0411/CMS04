import ResourceManager from '../components/resource/ResourceManager.jsx';

const CertificatesPage = () => (
  <ResourceManager
    title="Certificates"
    description="List professional certifications and online course certificates."
    endpoint="/certificates"
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'issuer', label: 'Issuer' },
      { key: 'issued_on', label: 'Date' },
    ]}
    formFields={[
      {
        name: 'title',
        label: 'Title',
        placeholder: 'AWS Certified Solutions Architect',
        validation: { required: 'Title required' },
      },
      {
        name: 'issuer',
        label: 'Issuer',
        placeholder: 'AWS / Coursera / Udemy',
      },
      { name: 'issued_on', label: 'Date', type: 'date' },
      { name: 'credential_id', label: 'Credential ID', placeholder: 'ABC-123' },
      { name: 'credential_url', label: 'Credential URL', placeholder: 'https://...' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        placeholder: 'What this certificate covers or validates',
      },
    ]}
  />
);

export default CertificatesPage;
