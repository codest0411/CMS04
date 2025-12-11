import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { fetcher } from '../../lib/api.js';
import { deleteResource, postResource, putResource } from '../../lib/resourceClient.js';
import BaseFormModal from '../forms/BaseFormModal.jsx';
import ConfirmModal from '../modals/ConfirmModal.jsx';
import PageHeader from '../PageHeader.jsx';
import EmptyState from '../EmptyState.jsx';

const ResourceManager = ({
  title,
  description,
  endpoint,
  columns,
  formFields,
  formatPayload,
  formatRow,
  searchPlaceholder = 'Search entries',
  createLabel = 'Add new',
}) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const listKey = `${endpoint}${search ? `?search=${encodeURIComponent(search.trim())}` : ''}`;

  const { data, isLoading, mutate } = useSWR(listKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
  });

  const items = useMemo(() => data || [], [data]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const normalizeValues = (values) => {
    const result = { ...values };
    formFields.forEach((field) => {
      if (field.type === 'number' && values[field.name] !== undefined && values[field.name] !== '') {
        result[field.name] = Number(values[field.name]);
      }
      if (field.type === 'checkbox') {
        result[field.name] = !!values[field.name];
      }
      if (field.transform) {
        result[field.name] = field.transform(values[field.name], values);
      }
    });
    return formatPayload ? formatPayload(result, editingItem) : result;
  };

  const handleSubmit = async (values) => {
    const payload = normalizeValues(values);
    if (editingItem?.id) {
      await putResource(`${endpoint}/${editingItem.id}`, payload, '🔁 Updated successfully.');
    } else {
      if (Array.isArray(payload)) {
        await Promise.all(
          payload.map((item) => postResource(endpoint, item, '✨ Created successfully.')),
        );
      } else {
        await postResource(endpoint, payload, '✨ Created successfully.');
      }
    }
    setShowModal(false);
    setEditingItem(null);
    mutate();
  };

  const handleDelete = async () => {
    if (!confirmDelete?.id) return;
    await deleteResource(`${endpoint}/${confirmDelete.id}`, '🗑️ Deleted successfully.');
    setConfirmDelete(null);
    mutate();
  };

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold shadow-glow transition hover:bg-white/25"
          >
            <Plus className="size-4" />
            {createLabel}
          </button>
        }
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 w-full md:w-80">
          <Search className="size-4" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="bg-transparent outline-none flex-1 text-white placeholder-white/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p className="text-white/50 text-sm">{items.length} entries</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
        {isLoading ? (
          <div className="p-12 text-center text-white/70">Loading...</div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-white/70">
              <thead>
                <tr className="text-left text-white/60">
                  {columns.map((column) => (
                    <th key={column.key} className="px-6 py-4 font-medium">
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const row = formatRow ? formatRow(item) : item;
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-white/5"
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4">
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(item)}
                            className="rounded-full border border-white/10 p-2 hover:bg-red-500/20 transition text-red-300"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BaseFormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingItem(null);
        }}
        title={editingItem ? 'Edit entry' : 'Create entry'}
        description="All changes sync instantly with the live portfolio."
        defaultValues={editingItem || {}}
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />

      <ConfirmModal
        isOpen={!!confirmDelete}
        message="This action permanently removes the item. This cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ResourceManager;
