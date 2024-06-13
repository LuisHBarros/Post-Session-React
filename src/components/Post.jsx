import React, { useState } from "react";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatStringToHtml } from "../util";
import { Comment } from "./Comment";
import { faker } from "@faker-js/faker";
import { Avatar } from "./Avatar";

export function Post(props) {
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, SetComments] = useState([
    {
      author: {
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        avatar: "",
      },
      date: new Date(),
      comment: faker.lorem.lines(4),
      id: 1,
    },
    {
      author: {
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        avatar: "",
      },
      date: new Date(),
      comment: faker.lorem.lines(4),
      id: 2,
    },
  ]);

  function handleNewComment(event) {
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity("");
    event.target.setCustomValidity("Escreva um comentário antes de enviar");
  }

  function handleCreateNewComment(event) {
    event.preventDefault();
    SetComments([
      ...comments,
      {
        author: {
          name: "Luis Henrique de Barros",
          role: "Computer Engineer",
          avatar: "https://avatars.githubusercontent.com/u/97200106?v=4",
        },
        date: new Date(),
        comment: newCommentText,
        id: comments.length + 1,
      },
    ]);
    setNewCommentText("");
  }

  const timeAgo = formatDistanceToNow(new Date(props.date), {
    addSuffix: true,
    locale: ptBR,
  });

  const time = format(props.date, "dd 'de' MMMM 'de' yyyy', ás' HH:mm", {
    locale: ptBR,
  });

  function deleteComment(id) {
    const commentsFiltered = comments.filter((comment) => comment.id !== id);
    console.log(id);
    console.log(commentsFiltered);
    SetComments(commentsFiltered);
  }

  const content = formatStringToHtml(props.content);

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            avatar={
              props.author.avatar ||
              "https://api.dicebear.com/8.x/pixel-art/svg"
            }
          />
          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>
        <time title={time} dateTime={props.date}>
          Publicado {timeAgo}
        </time>
      </header>

      <div className={styles.content}>{content}</div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Escreva seu comentário"
          onChange={handleNewComment}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <button type="submit" disabled={newCommentText.length === 0}>
          Comentar
        </button>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              author={comment.author}
              date={comment.date}
              comment={comment.comment}
              key={comment.id}
              id={comment.id}
              onDelete={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
