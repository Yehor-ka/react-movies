import React, { Component } from 'react';
import SortBy from './SortBy';

export class Filters extends Component {
  render() {
    const {
      filters: { sort_by },
      onChangeFilters,
      onChangePage,
      page,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <div className="btn-group">
          <button
            type="button"
            disabled={Number(page) === 1}
            className="btn btn-light"
            onClick={onChangePage.bind(null, page - 1)}>
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}>
            Вперёд
          </button>
        </div>
      </form>
    );
  }
}

export default Filters;
