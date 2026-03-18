import styles from './ButtonSet.module.css';

export default function ButtonSet({buttons, selectedIndex=-1, onSelect}) {
  const buttonJsx= buttons.map((btn, i)=>{
    const Icon= btn.reactIcon;
    let innerJsx;
    switch(btn.displayMode){
    case "label-icon":
      innerJsx= (<><span>{btn.label}</span> {Icon && <Icon/>}</>);
      break;
    case "icon-label":
      innerJsx= (<>{Icon && <Icon/>} <span>{btn.label}</span></>);
      break;
    case "icon-only":
      innerJsx= (<>{Icon && <Icon/>}</>);
      break;
    case "label-only":
    default:
      innerJsx= (<span>{btn.label}</span>);
    }
    
    return (
      <button className={(i==selectedIndex)?(styles["active-button"]  + " active-button"):""}
	      onClick={(e)=>{onSelect(i); }}
              title={btn.tooltip}
	      key={i}>
	{innerJsx}
      </button>);
  });
  
  return (
    <div className={styles.buttonset + " buttonset"}>
      {buttonJsx}
    </div>
  );
}
