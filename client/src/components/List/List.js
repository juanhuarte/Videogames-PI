import styles from "./List.module.css";

export default function List({ itemToSelect, itemsList, selectHandler }) {
  // htmlFor: Return the value of the for attribute of a label:
  // onInput: The oninput event occurs when an element gets user input. This event occurs when the value of an <input> or <textarea> element is changed.
  return (
    <div className={styles.content}>
      {/* <label htmlFor=""> */}
      {/* {itemToSelect} <br /> */}
      <select
        className={styles.select}
        name={itemToSelect}
        onInput={selectHandler}
      >
        <option disabled selected>
          {itemToSelect}
        </option>
        {itemsList?.map((item, i) => (
          <option value={item.id} key={i}>
            {item.name}
          </option>
        ))}
      </select>
      {/* <i className={styles.arrow}></i> */}
      {/* </label> */}
    </div>
  );
}
