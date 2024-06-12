import React from "react";
import styles from "./Comment.module.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatStringToHtml } from "../util";
import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";

export function Comment(props) {
  const timeAgo = formatDistanceToNow(new Date(props.date), {
    addSuffix: true,
    locale: ptBR,
  });

  const content = formatStringToHtml(props.comment);

  const time = format(props.date, "dd 'de' MMMM 'de' yyyy', ás' HH:mm", {
    locale: ptBR,
  });

  function HandleDeleteComment() {
    console.log(props);
    props.onDelete(props.id);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        avatar={
          props.author.avatar ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&s"
        }
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{props.author.name}</strong>
              <time title={time}>{timeAgo}</time>
            </div>
            <button
              onClick={HandleDeleteComment}
              title="deletar comentario"
              className={styles.replyButton}
            >
              <Trash size={24} />
            </button>
          </header>
          {content}
          <div />
        </div>
        <footer>
          <button title="Aplaudir">
            <ThumbsUp size={20} /> Aplaudir<span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
