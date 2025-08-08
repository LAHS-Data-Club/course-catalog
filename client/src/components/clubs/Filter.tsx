interface Props {
	filter: string[],
	filterValues: string[], 
	setFilterValues: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Filter({ filterValues, setFilterValues, filter }: Props) {
	function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>, value: string) {
		setFilterValues((prev) => e.target.checked ? [...prev, value] : prev.filter(x => x !== value));
	}
	return (
		<div className="flex flex-wrap gap-3">
			{filterValues.map((value) => (
				<div key={value + '_cb'} className="flex items-center gap-1">
					<input
						checked={filter.includes(value)}
						id={value + '_timecb'}
						className="me-1"
						type="checkbox"
						onChange={(e) => handleFilterChange(e, value)}
					/>
					<label htmlFor={value + '_timecb'}>
						{value}
					</label>
				</div>
			))}
		</div>
	);
}