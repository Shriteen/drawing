
export default function ButtonSet({buttons, selectedIndex=-1, onSelect}) {
  const buttonJsx= buttons.map((btn, i)=>{
    return (
      <button className={(i==selectedIndex)?"active-button":""}
	      onClick={(e)=>{onSelect(i); }}
	      key={i}>
	{btn.label}
      </button>);
  });
  
  return (
    <div className="buttonset">
      {buttonJsx}
    </div>
  );
}
