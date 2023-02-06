import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
				{ name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
				{ name: 'Carl W.', salary: 15000, increase: false, rise: false, id: 3 },
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({ data }) => {
			// const index = data.findIndex(elem => elem.id === id);
			// const before = data.slice(0, index);
			// const after = data.slice(index + 1);
			// const newArr = [...before, ...after];

			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			rise: false,
			id: this.maxId++
		}

		this.setState(({ data }) => {
			const newArr = [...data, newItem]
			return {
				data: newArr
			}
		});


	}



	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] }
				}
				return item;
			})
		}))

	}

	searchEmp = (item, term) => {
		if (term.length === 0) {
			return item;
		}
		return item.filter(item => {
			return item.name.indexOf(term) > -1;
		})
	}

	onUpdateSearch = (term) => {
		this.setState({ term })
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter(items => items.rise);
			case 'moreThen1000':
				return items.filter(items => items.salary > 1000);
			default:
				return items
		}
	}

	onFilterSelect = (filter) => {
		this.setState({ filter });
	}

	render() {
		const { data, term, filter } = this.state;
		const employees = this.state.data.length;
		const increase = this.state.data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className="app" >
				<AppInfo
					employees={employees}
					increase={increase}
				/>

				<div className="search-panel">
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch}
					/>
					<AppFilter
						filter={filter}
						onFilterSelect={this.onFilterSelect}
					/>
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
				/>
				<EmployeesAddForm
					onAdd={this.addItem} />
			</div>
		);
	}
}

export default App;