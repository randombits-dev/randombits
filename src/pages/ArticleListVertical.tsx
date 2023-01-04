import {useEffect, useState} from 'react';

import styled from "styled-components";
import ActionButton from "components/ActionButton";
import {importRemoteWithParams} from "utils/import-remote";
import {useRouter} from "router/Router";

const ArticleListContainer = styled.div`
`;

const ArticleContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
`;

const ArticleTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #333;
`;

const ArticleQuick = styled.div`
  font-size: 16px;
  margin: 20px 0;
  font-weight: 400;
  -webkit-line-clamp: 5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
  const [blogs, setBlogs] = useState<any[]>([]);
  const {navigate} = useRouter();
  const seeAll = () => {
    // navigateTo('/articles');
    navigate('/articles');
  };

  useEffect(() => {
    importRemoteWithParams('http://localhost:8081', 'blog', 'articles').then((result: any) => {
      setBlogs(result);
    });
  }, []);

  const blogsToShow = limit ? blogs.slice(0, limit) : blogs;

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
