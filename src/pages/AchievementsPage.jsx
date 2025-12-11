import { useState } from 'react';
import ResourceManager from '../components/resource/ResourceManager.jsx';

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState('awards');

  return (
    <div>
      <div className="mb-6 flex gap-2 rounded-full bg-white/5 p-1 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('awards')}
          className={`px-4 py-2 text-sm rounded-full font-semibold transition ${
            activeTab === 'awards'
              ? 'bg-white text-black shadow-glow'
              : 'bg-transparent text-white/70 hover:text-white'
          }`}
        >
          Awards
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 text-sm rounded-full font-semibold transition ${
            activeTab === 'certificates'
              ? 'bg-white text-black shadow-glow'
              : 'bg-transparent text-white/70 hover:text-white'
          }`}
        >
          Certificates
        </button>
      </div>

      {activeTab === 'awards' ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default AchievementsPage;
