// utils.js
import React from "react";

export function formatStringToHtml(str) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hashtagRegex = /(^|\s)(#\w+)/g;

  // Divida a string em linhas
  const lines = str.split("\n");

  // Processa cada linha
  return lines.map((line, index) => {
    // Substitui URLs por links
    const lineWithLinks = line.split(urlRegex).map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={`url-${index}-${i}`}
            href={"#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }
      return part;
    });

    // Substitui hashtags por links
    const lineWithHashtags = lineWithLinks.map((part, i) => {
      if (typeof part === "string") {
        return part.split(hashtagRegex).map((subPart, j) => {
          if (hashtagRegex.test(subPart)) {
            const space = subPart.startsWith(" ") ? " " : "";
            const hashtag = subPart.trim();
            return (
              <React.Fragment key={`hashtag-${index}-${i}-${j}`}>
                {space}
                <a href={`#`}>{hashtag}</a>
              </React.Fragment>
            );
          }
          return subPart;
        });
      }
      return part;
    });

    // Flatten the nested arrays
    const flattenedLine = [].concat(...lineWithHashtags);

    return <p key={index}>{flattenedLine}</p>;
  });
}

export default formatStringToHtml;
