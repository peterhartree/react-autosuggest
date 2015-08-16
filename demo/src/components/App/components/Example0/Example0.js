import theme from 'theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from 'flux/actionCreators/app';
import Autosuggest from 'AutosuggestContainer';

const exampleId = '0';

function mapStateToProps(state) {
  return {
    value: state[exampleId].value,
    suggestions: state[exampleId].suggestions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch(updateInputValue(exampleId, event.target.value))
  };
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.text}</span>
  );
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { value, suggestions, onChange } = this.props;
    const inputProps = {
      placeholder: 'Pick a fruit',
      value,
      onChange,
      onBlur: () => console.log(`Example ${exampleId}: Blurred`),
      onFocus: () => console.log(`Example ${exampleId}: Focused`)
    };

    return (
      <div>
        <Autosuggest suggestions={suggestions}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps}
                     theme={theme} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);