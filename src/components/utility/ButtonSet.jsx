import styles from './ButtonSet.module.css';

export default function ButtonSet({buttons, selectedIndex=-1, onSelect}) {
  const buttonJsx= buttons.map((btn, i)=>{
    return (
      <button className={(i==selectedIndex)?(styles["active-button"]  + " active-button"):""}
	      onClick={(e)=>{onSelect(i); }}
	      key={i}>
	{btn.label}
      </button>);
  });
  
  return (
    <div className={styles.buttonset + " buttonset"}>
      {buttonJsx}
    </div>
  );
}
