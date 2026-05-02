import { useState, useEffect } from "react";
import ActionButton from "./ActionButton";

const EMPTY_FORM = {
  title: "",
  description: "",
  urgency: "Medium",
  region: "",
  source: "",
};

export default function LogForm({ onSave, editingEntry, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const isEditing = Boolean(editingEntry);

  useEffect(() => {
    if (editingEntry) {
      setForm({
        title: editingEntry.title ?? "",
        description: editingEntry.description ?? "",
        urgency: editingEntry.urgency ?? "Medium",
        region: editingEntry.region ?? "",
        source: editingEntry.source ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingEntry]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, summary: form.description });
    setForm(EMPTY_FORM);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-base p-4 space-y-3 animate-fade-in"
    >
      <p className="section-header mb-0.5">
        {isEditing ? "Editing entry" : "New signal log"}
      </p>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">
          Signal title <span className="text-alert">*</span>
        </label>
        <input
          className="input-base"
          placeholder="e.g. Local gas price expected to rise"
          value={form.title}
          onChange={set("title")}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">
          Description
        </label>
        <textarea
          className="input-base resize-none"
          rows={3}
          placeholder="Add context, observations, or field notes…"
          value={form.description}
          onChange={set("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-teal mb-1">
            Urgency
          </label>
          <select
            className="input-base"
            value={form.urgency}
            onChange={set("urgency")}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-teal mb-1">
            Region
          </label>
          <input
            className="input-base"
            placeholder="e.g. Metro Manila"
            value={form.region}
            onChange={set("region")}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">
          Source
        </label>
        <input
          className="input-base"
          placeholder="e.g. Field report, Trader interview"
          value={form.source}
          onChange={set("source")}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <ActionButton type="submit" variant="primary" size="sm" fullWidth>
          {isEditing ? "Update log" : "Save signal log"}
        </ActionButton>
        {isEditing && (
          <ActionButton
            variant="ghost"
            size="sm"
            onClick={() => {
              setForm(EMPTY_FORM);
              onCancelEdit?.();
            }}
          >
            Cancel
          </ActionButton>
        )}
      </div>
    </form>
  );
}
