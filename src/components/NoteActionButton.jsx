import React from 'react';

/**
 * [Skilled] Reusable action button component for NoteItem.
 * Accepts 'variant' ('delete' | 'archive' | 'unarchive') and 'onClick' props.
 */
function NoteActionButton({ variant, onClick }) {
  const classMap = {
    delete: 'note-item__delete-button',
    archive: 'note-item__archive-button',
    unarchive: 'note-item__archive-button',
  };

  const labelMap = {
    delete: 'Delete',
    archive: 'Arsip',
    unarchive: 'Aktifkan',
  };

  const testIdMap = {
    delete: 'note-item-delete-button',
    archive: 'note-item-archive-button',
    unarchive: 'note-item-archive-button',
  };

  return (
    <button
      className={classMap[variant]}
      type="button"
      onClick={onClick}
      data-testid={testIdMap[variant]}
    >
      {labelMap[variant]}
    </button>
  );
}

export default NoteActionButton;
