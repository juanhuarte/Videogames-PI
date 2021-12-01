export default function List({ itemToSelect, itemsList, selectHandler }) {
  // htmlFor: Return the value of the for attribute of a label:
  // onInput: The oninput event occurs when an element gets user input. This event occurs when the value of an <input> or <textarea> element is changed.
  return (
    <div>
      <label htmlFor="">
        {itemToSelect} <br />
        <select name={itemToSelect} onInput={selectHandler}>
          <option>-----</option>
          {itemsList?.map((item, i) => (
            <option value={item.id} key={i}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
