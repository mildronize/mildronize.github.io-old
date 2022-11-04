import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { onMobile, onTablet } from "../themes/responsive";
import "../themes/font-awesome-all-5.2.0.css";
import LinkButton from "./Button";
import UserLinks from "./UserLinks/UserLinks";
import config from "../../data/SiteConfig";

interface IBook {
  name: string;
  url: string;
  image: string;
}

const bookData: IBook[] = [
  {
    name: "TypeScript TH",
    url: "https://typescript-th.thadaw.com/",
    image: "/files/books/typescript.jpg",
  },
  {
    name: "GitHub Actions TH",
    url: "https://github-actions-th.thadaw.com/",
    image: "/files/books/github-actions.jpg",
  },
  {
    name: "Terraform TH",
    url: "https://terraform-th.thadaw.com/",
    image: "/files/books/terraform.jpg",
  },
];
const Books = (props: any) => {
  const { ...restProps } = props;

  return (
    <Container {...restProps}>
      {bookData.map((book) => (
        <BookItem href={book.url} target='_blank' >
          <BookCover>
            <img src={book.image} />
          </BookCover>
          <BookTitle>{book.name}</BookTitle>
        </BookItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-evenly;

  ${onMobile} {
    flex-wrap: wrap;
  }
`;

const Social = styled.p`
  margin-left: 8px;
  margin-top: 20px;
  font-size: 0.7rem;
`;

const BookItem = styled.a`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  :hover{
    background: var(--colors-hover-0);
    cursor: pointer;
  }
`;

const BookTitle = styled.div`
  font-size: 0.8rem;
  text-align: center;
`;

const BookCover = styled.div`
  img {
    max-width: 200px;
  }
`;

export default Books;
