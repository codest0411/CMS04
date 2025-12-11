import ResourceManager from '../components/resource/ResourceManager.jsx';

const ServicesPage = () => (
  <ResourceManager
    title="Services"
    description="Define actual offerings with transparent pricing and duration details."
    endpoint="/services"
    columns={[
      { key: 'title', label: 'Service' },
      { key: 'price_range', label: 'Price range' },
      { key: 'duration', label: 'Typical duration' },
    ]}
    formFields={[
      { name: 'title', label: 'Title', placeholder: 'Brand Sprint', validation: { required: 'Title required' } },
      { name: 'description', label: 'Description', type: 'textarea', rows: 4, placeholder: 'Describe the outcome clients can expect.' },
      { name: 'price_range', label: 'Price Range', placeholder: '$3K - $5K' },
      { name: 'duration', label: 'Duration', placeholder: '2 weeks' },
      { name: 'image_url', label: 'Image URL', placeholder: 'https://...' },
      {
        name: 'image_upload',
        label: 'Upload image',
        type: 'fileUpload',
        accept: 'image/*',
        targetField: 'image_url',
      },
    ]}
  />
);

export default ServicesPage;
