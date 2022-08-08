import { useState, useRef, forwardRef, useEffect } from "react";
import { data as emojiList } from "./data";
import styles from "./emojiPicker.module.scss";

import EmojiSearch from "./emojiSearch";
import EmojiButton from "./emojiButton";

export function EmojiPicker(props, inputRef) {
  const [isOpen, setIsOPen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);
  //Se tiene un array en el state

  const containerRef = useRef(null);
  //Para cerrar el selector dando click en cualquier emogi

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!containerRef.current.contains(e.target)) {
        //contains, si damos click al padre de un elemento, se ejecuta el código
        //Cuando el elemento no sea padre del contenedor
        setIsOPen(false);
        setEmojis(emojiList);
      }
    });
  }, []);

  function handleClickOpen() {
    setIsOPen(!isOpen);
  }
  function handleSearch(letter) {
    const q = letter;
    if (!!q) {
      const search = emojiList.filter((e) => {
        return (
          e.name.toLowerCase().includes(q) ||
          e.keywords.toLowerCase().includes(q)
        );
      });
      console.log(search);
      setEmojis(search);
    } else {
      setEmojis(emojiList);
    }
    //Si existe el valoor de q
  }
  /*
  function EmojiPickerContainer() {
    return (
      <div>
        <EmojiSearch onSearch={handleSearch} />
        <div>
          {emojiList.map((e) => (
            <div key={e.symbol}>{e.symbol}</div>
          ))}
        </div>
      </div>
    );
  }*/
  function handleOnClickEmoji(emoji) {
    const cursorPos = inputRef.current.selectionStart;
    //selectionStart, dice la posicion del cursor
    const text = inputRef.current.value;
    //Trae el texto actual
    //Se parte el texto en dos
    const prev = text.slice(0, cursorPos);
    //Para saber lo que hay antes del cursor
    const next = text.slice(cursorPos);
    //Para saber lo que hay después del cursor

    inputRef.current.value = prev + emoji.symbol + next;
    //Se agrega el valor al value
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
    inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
    inputRef.current.focus();
    //Mantiene la posición del input para seguir la linea de escritura
  }
  return (
    <div ref={containerRef} className={styles.inputContainer}>
      <button onClick={handleClickOpen} className={styles.emojiPickerButton}>click</button>
      {isOpen ? (
        <div className={styles.emojiPickerContainer}>
          <EmojiSearch onSearch={handleSearch} />
          <div className={styles.emojiList}>
            {emojis.map((e) => (
              <EmojiButton
                key={e.symbol}
                emoji={e}
                onClick={handleOnClickEmoji}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(EmojiPicker);
