import React from "react";
import { Header } from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import { faker } from "@faker-js/faker";

const db = {
  posts: [
    {
      id: 1,
      author: {
        name: "Luis Henrique de Barros",
        role: "Computer Engineer",
        avatar: "https://github.com/luishbarros.png",
      },
      content:
        faker.lorem.paragraphs(4) +
        "\n" +
        "https://www.example.com" +
        " https://www.example.com" +
        " #example" +
        " #example",
      publishedAt: faker.date.recent(),
    },
    {
      id: 2,
      author: {
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
      },
      content:
        faker.lorem.paragraphs(4) +
        "\n" +
        "https://www.example.com" +
        " https://www.example.com" +
        " #example" +
        " #example",
      publishedAt: faker.date.recent(),
    },
    {
      id: 3,
      author: {
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
      },
      content:
        faker.lorem.paragraphs(4) +
        "\n" +
        "https://www.example.com" +
        " https://www.example.com" +
        " #example" +
        " #example",
      publishedAt: faker.date.recent(),
    },
  ],
};

export function App() {
  console.log(db.posts);
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {db.posts.map((post) => {
            console.log(post.id);
            return (
              <Post
                date={post.publishedAt}
                author={post.author}
                content={post.content}
                key={post.id}
                onClick={(e) => {}}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
