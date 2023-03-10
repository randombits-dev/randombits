import LocaleSymbol from './LocaleSymbol';


function GroupingSymbols() {

    return <>
        <div class="row">
            <LocaleSymbol code={'44'} type="thousand"></LocaleSymbol>
            <LocaleSymbol code={'46'} type="thousand"></LocaleSymbol>
            <LocaleSymbol code={'160'} type="thousand"></LocaleSymbol>
            <LocaleSymbol code={'8239'} type="thousand"></LocaleSymbol>
            <LocaleSymbol code={'1644'} type="thousand"></LocaleSymbol>
            <LocaleSymbol code={'8217'} type="thousand"></LocaleSymbol>
            {/*<LocaleSymbol code={'none'} type="thousand"></LocaleSymbol>*/}
        </div>
    </>
}

export default GroupingSymbols;
