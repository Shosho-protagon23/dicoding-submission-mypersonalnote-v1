import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // [Basic] controlled inputs
      title: '',
      body: '',
      // [Advanced] error message for body validation
      bodyError: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // [Basic] update state with event value
    // [Skilled] limit title to 50 characters using state (not maxLength attr)
    const value = event.target.value;
    if (value.length <= 50) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    // [Basic] update body state to make textarea a controlled component
    const value = event.target.value;
    this.setState({
      body: value,
      // Clear error once user types enough
      bodyError: value.length > 0 && value.length < 10
        ? 'Isi catatan minimal harus 10 karakter'
        : '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // [Advanced] reject submit when body < 10 characters
    if (body.length < 10) {
      this.setState({ bodyError: 'Isi catatan minimal harus 10 karakter' });
      return;
    }

    // [Basic] call props.addNote with title & body from state, then reset form
    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', bodyError: '' });
  }

  render() {
    const { title, body, bodyError } = this.state;
    // [Skilled] calculate remaining characters dynamically
    const remainingChars = 50 - title.length;
    const isNearLimit = remainingChars < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* [Advanced] show error message with class note-input__feedback--error */}
        {bodyError && (
          <p className="note-input__feedback note-input__feedback--error">
            {bodyError}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {/* [Skilled] display remaining characters dynamically */}
          <p
            className={`note-input__title__char-limit${isNearLimit ? ' note-input__title__char-limit--warn' : ''}`}
            data-testid="note-input-title-remaining"
          >
            {remainingChars} karakter tersisa
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
