import ResourceManager from '../components/resource/ResourceManager.jsx';

const EducationPage = () => (
  <ResourceManager
    title="Education"
    description="List your formal education, bootcamps, or certifications."
    endpoint="/education"
    columns={[
      { key: 'institution', label: 'Institution' },
      { key: 'degree', label: 'Degree' },
      { key: 'start_date', label: 'Start' },
      { key: 'end_date', label: 'End' },
    ]}
    formFields={[
      {
        name: 'institution',
        label: 'Institution',
        placeholder: 'University of XYZ',
        validation: { required: 'Institution required' },
      },
      {
        name: 'degree',
        label: 'Degree',
        placeholder: 'B.Tech in Computer Science',
        validation: { required: 'Degree required' },
      },
      {
        name: 'field',
        label: 'Field of study',
        placeholder: 'Computer Science',
      },
      { name: 'start_date', label: 'Start date', type: 'date', validation: { required: 'Start date required' } },
      { name: 'end_date', label: 'End date', type: 'date' },
      { name: 'location', label: 'Location', placeholder: 'Remote / Bengaluru' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        placeholder: 'Highlights, grades, or achievements',
      },
      {
        name: 'skills',
        label: 'Skills (optional)',
        type: 'textarea',
        rows: 3,
        placeholder: 'e.g. Data Structures, Algorithms, Machine Learning',
        transform: (value) => value ? value.split(',').map(s => s.trim()).filter(Boolean) : [],
      },
    ]}
  />
);

export default EducationPage;
