import {createSignal, onMount} from "solid-js";

const fixedClases = ['!sticky', 'top-5'];
const ArticleTOC = ({path, relatedPages, headings}) => {
    const [selected, setSelected] = createSignal('');

    let el;
    onMount(() => {
        let yPos = 0;
       window.addEventListener('scroll', () => {
           if (window.scrollY > (yPos || el.offsetTop)) {
               yPos = yPos || el.offsetTop;
               el.classList.add(...fixedClases);
           } else {
               el.classList.remove(...fixedClases);
           }
       }) ;
    });

    const handleClickHeading = (heading) => {
        // setSelected(heading.slug);
    };

    if (relatedPages) {
        return <nav aria-label="Table of Contents" class="rb-article__nav" ref={el}>
            {
                relatedPages.sort((a, b) => a.data.order - b.data.order).map(article => {

                    const showLink = path === article.slug;
                    if (showLink) {
                      return <div><div class="font-bold" aria-selected={!selected()}>{article.data.toc || article.data.title}</div>
                            <div class="rb-article__sub-nav">
                                {
                                    headings.map((heading, i) => {
                                        const isSelected = selected() === heading.slug;
                                      return <div><a class="" href={'#' + heading.slug} aria-selected={isSelected} onclick={() => handleClickHeading(heading)}>{i+1}. {heading.text}</a></div>
                                    })
                                }
                            </div>
                        </div>;
                    } else {
                      return <div><a class="font-bold" href={article.slug}>{article.data.toc || article.data.title}</a></div>;
                    }
                })
            }

        </nav>
    } else {
        return <div class="rb-article__nav" ref={el}>
          {/*<div class="font-bold">Publishing an article on Fdroid</div>*/}
          <nav aria-label="Article Sections" >
            {
                headings.map(heading => {
                    const isSelected = selected() === heading.slug;
                  return <div><a href={'#' + heading.slug} aria-selected={isSelected} onclick={() => handleClickHeading(heading)}>{heading.text}</a></div>
                })
            }
        </nav></div>
    }


};

export default ArticleTOC;
