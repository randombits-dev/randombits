import {h} from "preact";
import {useEffect, useRef} from "preact/hooks";

const Blog = () => {
  const ref = useRef(null);

  useEffect(() => {
    import("blog/BlogIndex").then(({mount}) => {
      mount(ref.current);
    });

  }, []);

  // useEffect(() => {
  //   console.log('useeffect');
  //
  //   // import("blog/BlogIndex").then(({mount}) => {
  //   //   mount(ref.current);
  //   // });
  // }, []);

  return <div ref={ref}></div>
};

export default Blog;
