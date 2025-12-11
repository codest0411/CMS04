import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import api, { extractData } from '../../lib/api.js';

const overlayProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalProps = {
  initial: { opacity: 0, y: 32, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 24, scale: 0.95 },
};

const BaseFormModal = ({
  isOpen,
  onClose,
  title,
  description,
  defaultValues = {},
  fields = [],
  onSubmit,
  submitLabel = 'Save',
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...overlayProps}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur px-4 pt-16 pb-6"
        >
          <motion.div
            {...modalProps}
            className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-base-charcoal/95 p-6 text-white shadow-2xl max-h-[80vh] overflow-y-auto flex flex-col"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-neon-green">{title}</p>
              {description && <p className="text-sm text-white/70">{description}</p>}
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm text-white/80">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={field.rows || 3}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
                      placeholder={field.placeholder}
                      {...register(field.name, field.validation)}
                    />
                  ) : field.type === 'fileToText' ? (
                    <input
                      type="file"
                      accept={field.accept || '.md,.txt'}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const text = await file.text();
                        const target = field.targetField || 'readme';
                        setValue(target, text, { shouldDirty: true, shouldTouch: true });
                      }}
                    />
                  ) : field.type === 'fileUpload' ? (
                    <input
                      type="file"
                      accept={field.accept || 'image/*'}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append('file', file);

                        try {
                          const response = await api.post('/upload/image', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                          });
                          const data = extractData(response);
                          const record = Array.isArray(data) ? data[0] : data;
                          const url = record?.url;
                          const target = field.targetField || 'preview_image_url';
                          if (url) {
                            setValue(target, url, { shouldDirty: true, shouldTouch: true });
                          }
                        } catch (err) {
                          // errors are already toasted by api interceptor
                          // eslint-disable-next-line no-console
                          console.error('Image upload failed', err);
                        }
                      }}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-neon-pink focus:outline-none"
                      {...register(field.name, field.validation)}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-white/40 bg-transparent text-neon-pink focus:ring-neon-pink"
                        {...register(field.name)}
                      />
                      <span className="text-white/80">{field.checkboxLabel || field.placeholder}</span>
                    </label>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-neon-pink focus:outline-none"
                      placeholder={field.placeholder}
                      {...register(field.name, field.validation)}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-xs text-red-400">{errors[field.name].message}</p>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/70"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-neon-pink/90 px-6 py-2 text-sm font-semibold text-base-dark hover:bg-neon-pink transition disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : submitLabel}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaseFormModal;
