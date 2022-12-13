import React, {useEffect} from "react";


const Blog = () => {
  // const ref = useRef(null);

  useEffect(() => {
    import("blog/BlogIndex");

  }, []);

  // useEffect(() => {
  //   console.log('useeffect');
  //
  //   // import("blog/BlogIndex").then(({mount}) => {
  //   //   mount(ref.current);
  //   // });
  // }, []);

  // return <div ref={ref}></div>
  // @ts-ignore
  return <my-blog basename="/blog"></my-blog>;
};

export default Blog;
