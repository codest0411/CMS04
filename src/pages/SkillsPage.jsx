import ResourceManager from '../components/resource/ResourceManager.jsx';

const splitNames = (raw) =>
  (raw || '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);

const SkillsPage = () => (
  <ResourceManager
    title="Skills"
    description="List only the tools and disciplines you genuinely ship with. No fake superpowers."
    endpoint="/skills"
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'proficiency', label: 'Mastery (%)' },
    ]}
    formFields={[
      {
        name: 'name',
        label: 'Skill name(s)',
        placeholder: 'Figma, React, Node.js',
        validation: { required: 'At least one skill name is required' },
      },
      { name: 'category', label: 'Category', placeholder: 'Design / Frontend' },
      {
        name: 'proficiency',
        label: 'Proficiency',
        type: 'number',
        placeholder: '95',
        validation: {
          min: { value: 0, message: 'Min 0' },
          max: { value: 100, message: 'Max 100' },
        },
      },
      { name: 'icon_url', label: 'Icon URL (optional)', placeholder: 'Leave blank to auto-pick logo' },
    ]}
    formatPayload={(values, editingItem) => {
      if (editingItem?.id) {
        return values;
      }

      const names = splitNames(values.name);
      if (names.length <= 1) {
        return { ...values, name: names[0] || values.name };
      }

      return names.map((name) => ({
        ...values,
        name,
      }));
    }}
  />
);

export default SkillsPage;
