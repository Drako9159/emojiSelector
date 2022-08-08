import EmojiPicker from "./emojiPicker";
import { useRef } from "react";

export default function EmojiPickerInput() {
  const refInput = useRef(null);
  //Obtiene la referencia de un nodo html
  /*
  function handleClick() {
    refInput.current.focus();
    //current .- saca la referencia del objeto en ref
    //hace referencia al input con el click
  }*/
  return (
    <div>
      <input ref={refInput} />
      
      <EmojiPicker ref={refInput} />
    </div>
  );
}
