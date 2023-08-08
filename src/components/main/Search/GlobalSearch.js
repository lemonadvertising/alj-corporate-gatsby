
import React, {useEffect, useState} from "react"
import { useStaticQuery, graphql, Link } from 'gatsby'

// import $ from 'jquery';


const Search = (props) => {

    let searchiconurl = 'https://media.aljhealth.com/wp-content/uploads/2022/06/23120102/search-black.png';
    let loadingiconurl = 'https://media.aljhealth.com/wp-content/uploads/2022/07/15121616/blue-spin.gif';


    const [skeyword,
        SetSkeyword] = useState('');
    const [searchResult,
        SetSearchResult] = useState('');
    const [searchResultLoop,
        SetSearchResultLoop] = useState('');
    const [searchPageIcon,
        SetSearchPageIcon] = useState(searchiconurl);
    const [partnersResult,
        SetPartnersResult] = useState('');
    const [pageResult,
        SetPageResult] = useState('');
    const [intheNewsResult,
        SetIntheNewsResult] = useState('');
    const [solutionsResult,
        SetSolutionsResult] = useState('');
    const [peoplesResult,
        SetPeoplesResult] = useState('');
    const [newsResult,
        SetNewsResult] = useState('');
    const [insightsResult,
        SetInsightsResult] = useState('');
    const [isActive,
        setIsActive] = useState(false);

 
    const siteSearch = () => {

        if (skeyword !== null && skeyword !== '') {
            let searchlang = props.lang === "en_US"
                ? 'en'
                : props.lang === 'ar'
                    ? 'ar'
                    : 'tr';
            SetSearchPageIcon(loadingiconurl);
            var axios = require('axios');
            axios
                .get("https://2krdwpsvdf.execute-api.eu-west-2.amazonaws.com/prod/alj-health?keyword=" + skeyword + "&lang=" + searchlang + "&per_page=100")
                .then(function (response) {

                    if (response !== null && response !== '') {
                        SetSearchResult(response.data)
                        SetSearchResultLoop(response.data);
                    }

                    SetSearchPageIcon(searchiconurl);
                })
                .catch(function (error) {
                    SetSearchPageIcon(searchiconurl);
                    // console.log(error);
                });
        } else {
            SetSearchResult(null)
            SetSearchResultLoop(null);
            SetPartnersResult('');
            SetPageResult('');
            SetSolutionsResult('');
            SetPartnersResult('');
            SetIntheNewsResult('');
            SetNewsResult('');
            SetInsightsResult('');
            SetPeoplesResult('');
        }
    }

    function filterSearch(type, active) {
        SetSearchResultLoop(type)
        setIsActive(active);
    }

    const handleSearchChange = event => {
        SetSkeyword(event.target.value);
    };

  

  

    useEffect(() => {

        if (searchResult !== null && searchResult !== '') {
            let partnerslist,
                solutionslist,
                poepleslist,
                newslist,
                insightslights,
                inthenewslist,
                pagelist

            partnerslist = searchResult.filter(list => list.subtype === 'partners');
            SetPartnersResult(partnerslist);

            pagelist = searchResult.filter(list => list.subtype === 'page');
            SetPageResult(pagelist)

            solutionslist = searchResult.filter(list => list.subtype === 'solutions');
            SetSolutionsResult(solutionslist);

            inthenewslist = searchResult.filter(list => list.subtype === 'inthenews');
            SetIntheNewsResult(inthenewslist);

            newslist = searchResult.filter(list => list.subtype === 'pressrelease');
            SetNewsResult(newslist);

            insightslights = searchResult.filter(list => list.subtype === 'perspective');
            SetInsightsResult(insightslights);

            poepleslist = searchResult.filter(list => list.subtype === 'ourpeople');
            SetPeoplesResult(poepleslist);

        }

    }, [searchResult]);


    return (
        <header className={props.cls}>
            <div className="container">

     




                
                <div className="row justify-content-between align-items-center">
                    

                    <div className="mr-auto col-auto">
                     <a href="#/" data-bs-toggle="modal" data-bs-target="#searchmodal">
                            {/* <img className='search-white-icon' src='https://media.aljhealth.com/wp-content/uploads/2022/06/23113736/search-white.png' alt="img" /> */}
                            <img className='search-black-icon' src='https://media.aljhealth.com/wp-content/uploads/2022/06/23120102/search-black.png' alt="img" />
                        </a> 


                    </div>

                    <div className="search-model-container">
                        {/* <div className="modal fade" id="searchmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"> */}
                        <div className="modal" id="searchmodal">
                        <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Search</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                    <div className="modal-body">
                                        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><img src='https://media.aljhealth.com/wp-content/uploads/2022/06/24084158/search-closepop.png' alt="img" /></span>
                                            
                                        </button> */}
                                        {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                        <div className="container">
                                            <div className="search-wrapper">
                                                <div className="styled-search-root-sc-17d2bsu-0 fxTRBf">
                                                    <form className="styled-search-box-sc-fds6jn-0 buxDGr" action='#'>
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <input className="SearchInput form-control" type="text" placeholder="Search" aria-label="Search" onChange={handleSearchChange} onKeyUp={siteSearch} onKeyPress={(ev) => {
                                                                    if (ev.key === "Enter") {
                                                                        ev.preventDefault();
                                                                        siteSearch()
                                                                    }
                                                                }} />
                                                            </div>
                                                            <div className="col-md-2">
                                                                {searchPageIcon ?
                                                                    <img className="SearchPageIcon" src={searchPageIcon} onClick={siteSearch} alt="img" />
                                                                    : null}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="search-scroll">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="search-pagination">
                                                            <ul>
                                                                {pageResult !== "" && pageResult.length > 0 ?
                                                                    <li><a className={isActive === 'pageResult' ? 'active' : ''} onClick={() => filterSearch(pageResult, 'pageResult')}>Page ({pageResult.length})</a></li>
                                                                    : null}
                                                                {solutionsResult !== "" && solutionsResult.length > 0 ?
                                                                    <li><a className={isActive === 'solutionsResult' ? 'active' : ''} onClick={() => filterSearch(solutionsResult, 'solutionsResult')}>Solutions ({solutionsResult.length})</a></li>
                                                                    : null}
                                                                {partnersResult !== "" && partnersResult.length > 0 ?
                                                                    <li><a className={isActive === 'partnersResult' ? 'active' : ''} onClick={() => filterSearch(partnersResult, 'partnersResult')}>Our Partner ({partnersResult.length})</a></li>
                                                                    : null}

                                                                {peoplesResult !== "" && peoplesResult.length > 0 ?
                                                                    <li><a className={isActive === 'peoplesResult' ? 'active' : ''} onClick={() => filterSearch(peoplesResult, 'peoplesResult')}> Our Peoples ({peoplesResult.length})</a></li>
                                                                    : null}

                                                                {newsResult !== "" && newsResult.length > 0 ?
                                                                    <li><a className={isActive === 'newsResult' ? 'active' : ''} onClick={() => filterSearch(newsResult, 'newsResult')}>News ({newsResult.length})</a></li>
                                                                    : null}

                                                                {intheNewsResult !== "" && intheNewsResult.length > 0 ?
                                                                    <li><a className={isActive === 'intheNewsResult' ? 'active' : ''} onClick={() => filterSearch(intheNewsResult, 'intheNewsResult')}>In the News ({intheNewsResult.length})</a></li>
                                                                    : null}

                                                                {insightsResult !== "" && insightsResult.length > 0 ?
                                                                    <li><a className={isActive === 'insightsResult' ? 'active' : ''} onClick={() => filterSearch(insightsResult, 'insightsResult')}>Insights ({insightsResult.length})</a></li>
                                                                    : null}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`search-result ${props.lang === "ar" ? 'search-result-ar' : ''}`}>
                                                    <div className="row mt-3">
                                                        <div className="col-md-12 mb-4 text-right">
                                                            {searchResultLoop !== null && searchResultLoop !== '' ?
                                                                <>
                                                                    {searchResultLoop.length} results
                                                                </>
                                                                : null}
                                                        </div>
                                                        {
                                                            searchResultLoop !== null && searchResultLoop !== '' ?
                                                                searchResultLoop.map(result => (
                                                                    <div className="col-md-6 mb-4">
                                                                        <a href={result.url.replace(/^.*\/\/[^\/]+/, '')} target="_blank" rel="noreferrer">
                                                                            <span dangerouslySetInnerHTML={{ __html: result.title }}></span>
                                                                        </a>
                                                                    </div>
                                                                ))
                                                                : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
         
        </header>
    )
}

export default Search
