import React from 'react';
import NoteItem from './NoteItem';

/**
 * [Advanced] Group notes by month-year combination.
 * Returns an object keyed by "YYYY-MM" with array of notes as value.
 */
function groupNotesByMonthYear(notes) {
  return notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    // Key format: "YYYY-MM" for reliable sorting
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(note);
    return groups;
  }, {});
}

/**
 * [Advanced] Format group key (YYYY-MM) to human-readable Indonesian month-year.
 */
function formatGroupHeader(key) {
  const [year, month] = key.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  // [Basic] validate notes not empty
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* [Basic] informative empty message */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  // [Advanced] group notes by month-year
  const groupedNotes = groupNotesByMonthYear(notes);
  // Sort groups descending (newest first)
  const sortedGroupKeys = Object.keys(groupedNotes).sort((a, b) => b.localeCompare(a));

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {/* [Advanced] render each group in <section className="notes-group"> */}
      {sortedGroupKeys.map((groupKey) => (
        <section
          key={groupKey}
          data-testid={`${groupKey}-group`}
          className="notes-group"
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{formatGroupHeader(groupKey)}</h3>
            <span
              data-testid={`${groupKey}-group-count`}
              className="notes-group__count"
            >
              {groupedNotes[groupKey].length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {/* [Basic] use array.map to render NoteItem for each note */}
            {groupedNotes[groupKey].map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
