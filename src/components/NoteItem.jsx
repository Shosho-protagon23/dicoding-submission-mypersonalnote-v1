import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

/**
 * [Advanced] highlightText — wraps matched keyword in <mark> elements.
 * Returns an array of React elements (plain strings + <mark> nodes).
 */
function highlightText(text, keyword) {
  if (!keyword || !text) return text;

  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* [Basic] + [Advanced] display title, highlight keyword */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        {/* [Basic] use showFormattedDate util */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* [Basic] + [Advanced] display body, highlight keyword */}
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* [Skilled] use NoteActionButton component for delete */}
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(note.id)}
        />
        {/* [Advanced] archive/unarchive toggle button */}
        <NoteActionButton
          variant={note.archived ? 'unarchive' : 'archive'}
          onClick={() => onArchive(note.id)}
        />
      </div>
    </div>
  );
}

export default NoteItem;
