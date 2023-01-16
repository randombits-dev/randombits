import {useEffect, useState} from 'react';

import styled from "styled-components";
import ActionButton from "components/ActionButton";
import {importRemote} from "utils/import-remote";
import {useRouter} from "router/Router";

const ArticleListContainer = styled.div`
`;

const ArticleContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
`;

const ArticleTitle = styled.h2`
  letter-spacing: 2px;
  margin: 0;
`;

const ArticleQuick = styled.div`
  font-size: 14px;
  margin: 10px 0;
  -webkit-line-clamp: 5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  letter-spacing: 1px;
  color: #555;
`;

const ArticleSummary = ({blog}) => {
  const {navigate} = useRouter();
  const url = `/article/${blog.id}`;
  const goTo = (e) => {
    e.preventDefault();
    // navigateTo(url);
    navigate(url);
  };
  return <a href={url} onClick={goTo}><ArticleContainer>
    <ArticleTitle>{blog.title}</ArticleTitle>
    <ArticleQuick>
      {blog.summary}
    </ArticleQuick>
  </ArticleContainer></a>;
};

interface Params {
  limit?: number;
}

const ArticleListVertical = ({limit}: Params) => {
  const [articles, setArticles] = useState<any[]>([]);
  const {navigate} = useRouter();
  const seeAll = () => {
    navigate('/articles');
  };

  useEffect(() => {
    importRemote('markdown', 'articles').then((result: any) => {
      setArticles(result);
    });
  }, []);

  const blogsToShow = limit ? articles.slice(0, limit) : articles;

  return (
    <ArticleListContainer>
      {
        blogsToShow.map(blog => <ArticleSummary key={blog.id} blog={blog}/>)
      }
      {
        limit ? <ActionButton onClick={seeAll}>See All Articles</ActionButton> : null
      }
    </ArticleListContainer>
  );
}

export default ArticleListVertical
