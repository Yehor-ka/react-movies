import React, { Component } from 'react'

export class UISelect extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="sort_by">Сортировать по:</label>
                <select 
                    className="form-control" 
                    value={sort_by} 
                    id="sort_by" 
                    name="sort_by"
                    onChange={onChangeFilters}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default UISelect
