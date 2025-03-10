interface Props {
  c: any, 
  onDoubleClick: any,
  onClick?: any,
  highlight?: string
}

function Class({ c, onDoubleClick, onClick, highlight }: Props) {
  return (
      <div onClick={onClick} onDoubleClick={onDoubleClick} className={`group border-2 border-transparent duration-100 hover:border-blue-400 cursor-pointer flex flex-col h-50 shadow-neutral-800 shadow-md p-5 ${highlight || 'bg-neutral-800'}`}>
        <h4 className="font-semibold mb-2 uppercase">{c.Name}</h4>
        <p className={`overflow-hidden text-xs line-clamp-8 ${highlight ? 'text-white' : 'text-neutral-400'}`}>{c.Description}</p>
      </div>
  );
}

export default Class;