import styles from "./Avatar.module.css";

export function Avatar({ hasBorder = true, avatar }) {
  return (
    <img
      className={hasBorder ? styles.avatar : styles.avatarWithoutBorder}
      src={avatar}
    ></img>
  );
}
