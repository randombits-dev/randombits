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
        setSelected(heading.slug);
        // document.querySelector()
        // document.querySelector(`a[href="#${heading.slug}"]`).classList.add('bg-header');
    };

    if (relatedPages) {
        return <div class="card rb-article__nav" ref={el}>
            {
                relatedPages.sort((a, b) => a.data.order - b.data.order).map(article => {
                    const showLink = path.endsWith(article.slug);
                    if (showLink) {
                        return <><a class="font-bold"  aria-selected={!selected()} href={article.slug}>{article.data.toc || article.data.title}</a>
                            <div class="rb-article__sub-nav">
                                {
                                    headings.map(heading => {
                                        const isSelected = selected() === heading.slug;
                                        return <a class="text-[16px]" href={'#' + heading.slug} aria-selected={isSelected} onclick={() => handleClickHeading(heading)}>{heading.text}</a>
                                    })
                                }
                            </div>
                        </>;
                    } else {
                        return <a class="font-bold" href={article.slug}>{article.data.toc || article.data.title}</a>;
                    }
                })
            }

        </div>
    } else {
        return <div class="card rb-article__nav" ref={el}>
            {
                headings.map(heading => {
                    const isSelected = selected() === heading.slug;
                    return <a class="text-[16px]" href={'#' + heading.slug} aria-selected={isSelected} onclick={() => handleClickHeading(heading)}>{heading.text}</a>
                })
            }
        </div>
    }


};

export default ArticleTOC;
