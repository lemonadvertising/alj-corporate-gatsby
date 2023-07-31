import React, { useState, useEffect } from 'react'
import { graphql, Link } from "gatsby";
import Layout from '../components/layout';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import Cards from "../components/MediaCenter/Cards"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewsListing = (props) => {
  const currentPage = props.data.wpPage;
  const featuredSize = 1;
  const pageSize = 2;
  const [paginateCount, setPaginateCount] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);

  var allPosts = props.data.allWpPressrelease.edges;
  const [fullPosts, setFullPosts] = useState(allPosts);

  const [fixedfeaturedPosts, setFixedFeaturedPosts] = useState([]);
  const [fixedNonFeaturedPosts, setFixedNonFeaturedPosts] = useState([]);

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [nonFeaturedPosts, setNonFeaturedPosts] = useState([]);

  const [visibleNews, setVisibleNews] = useState([]);
  const [sortbyvalue, setSortbyvalue] = useState('');


  /* ******** Fetching Main Data Start ******** */
  let featuredNews = [];
  let allNonFeaturedPostsByDate = [];

  useEffect(() => {
    let featuredCatagoryOne = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-one").slice(0, featuredSize)
    let featuredCatagoryTwo = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-two").slice(0, featuredSize)
    let featuredCatagoryThree = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-three").slice(0, featuredSize)
    featuredNews = [...featuredCatagoryOne, ...featuredCatagoryTwo, ...featuredCatagoryThree]
    setFeaturedPosts(featuredNews);
    setFixedFeaturedPosts(featuredNews);

    let nonFeaturedCatagoryOne = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-one").slice(featuredCatagoryOne.length)
    let nonFeaturedCatagoryTwo = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-two").slice(featuredCatagoryTwo.length)
    let nonFeaturedCatagoryThree = allPosts.filter(item => item.node.newscategories.nodes[0].slug === "category-three").slice(featuredCatagoryThree.length)
    let allNonFeaturedPosts = [...nonFeaturedCatagoryOne, ...nonFeaturedCatagoryTwo, ...nonFeaturedCatagoryThree];
    allNonFeaturedPostsByDate = allNonFeaturedPosts.sort(function (a, b) {
      return new Date(b.node.date) - new Date(a.node.date)
    });
    setNonFeaturedPosts(allNonFeaturedPostsByDate);
    setFixedNonFeaturedPosts(allNonFeaturedPostsByDate);

  }, [allPosts])

  /* ********Fetching Main Data End ******** */



  /* ******** Loadmore Pagination Start ******** */
  useEffect(() => {

    console.log('came here ', nonFeaturedPosts);

    setVisibleNews(nonFeaturedPosts && nonFeaturedPosts.slice(0, (1 * pageSize)))
    if (nonFeaturedPosts.length > pageSize) {
      setShowLoadMore(true)
    } else {
      setShowLoadMore(false)
    }
  }, [nonFeaturedPosts])


  const loadMoreNews = () => {
    let newPage = paginateCount + 1;
    setPaginateCount(paginateCount + 1);
    setVisibleNews(nonFeaturedPosts && nonFeaturedPosts.slice(0, (newPage * pageSize)))
  }

  useEffect(() => {
    if ((paginateCount * pageSize) >= nonFeaturedPosts.length) {
      setShowLoadMore(false);
    }
  }, [paginateCount])

  /* ******** Loadmore Pagination End ******** */






  /* ******** Filter Part Start ******** */
  const [dateFilterShow, setDateFilterShow] = useState(false);
  const [mobileDateFilterShow, setMobileDateFilterShow] = useState(false);

  const handleDateToggle = () => {
    setDateFilterShow(!dateFilterShow)
  }
  const handleMobileDateToggle = () => {
    setMobileDateFilterShow(!mobileDateFilterShow)
  }
  const handleCloseMobilePopUp = () => {
    setMobileDateFilterShow(!mobileDateFilterShow)
  }



  const [category, setCategory] = useState({
    categoryone: "",
    categorytwo: "",
    categorythree: ""
  })

  const [anyDayActive, setAnyDayActive] = useState(false)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [dateFilterData, setDateFilterData] = useState({
    startdate: null,
    enddate: null
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    startSearch()
  }

  const startSearch = () => {
    filterPosts();
  }


  const getDays = (e) => {
    if (e.target.value === "all") {
      setAnyDayActive(true);
    } else {
      setAnyDayActive(false);
    }

    if (e.target.value === "all") {
      dateFilter(new Date("Jan 01 2000"), new Date())
    } else if (e.target.value === "thismonth") {
      dateFilter(new Date(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), new Date())
    } else if (e.target.value === "lastmonth") {
      dateFilter(new Date(new Date().getFullYear(), new Date().getMonth() - 1).getTime(), new Date(new Date().getFullYear(), new Date().getMonth(), 0).getTime())
    } else {
      dateFilter(new Date(new Date().getTime() - (e.target.value * 24 * 60 * 60 * 1000)), new Date())
    }
    // showAllFilter();
    setDateRange([null, null]);
  }

  const getDateRangeFilter = (date) => {
    if (date[0] !== null && date[1] !== null) {
      dateFilter(new Date(date[0].toDateString()), new Date(date[1].toDateString()))
      if (document.querySelector('input[name="days"]:checked') !== null) {
        document.querySelector('input[name="days"]:checked').checked = false;
      }
    } else if (date[0] === null && date[1] === null) {
      // showAllFilter();
      dateFilter(new Date("Jan 01 2000"), new Date())
    }

    setAnyDayActive(false);
  }


  const dateFilter = (startDate, endDate) => {
    setDateFilterData(prevState => ({
      ...prevState,
      startdate: startDate,
      enddate: endDate,
    }));
  }

  useEffect(() => {
    if (dateFilterData.startdate !== null && dateFilterData.enddate !== null) {
      filterPosts();
    }
  }, [dateFilterData]);




  const filterPosts = () => {

    var filteredData = fullPosts;
    if (searchKeyword !== '') {
      filteredData = filteredData.filter((item) => {
        return Object.values(item.node.press_release_acf.shortTitle).join('').toLowerCase().includes(searchKeyword.toLowerCase())
      })
    }
    if (dateFilterData.startdate !== null && dateFilterData.enddate !== null) {
      filteredData = filteredData.filter(news =>
        new Date(news.node.date) > dateFilterData.startdate && new Date(news.node.date) < dateFilterData.enddate
      )
    }


    if (category.categoryone !== "" || category.categorytwo !== "" || category.categorythree !== "") {
      if (searchKeyword === '' && dateFilterData.startdate === null && dateFilterData.enddate === null) {
        filteredData = fixedNonFeaturedPosts;
      }
      filteredData = filteredData.filter(news =>
        news.node.newscategories.nodes[0].slug === category.categoryone || news.node.newscategories.nodes[0].slug === category.categorytwo || news.node.newscategories.nodes[0].slug === category.categorythree
      )
    }



    if (searchKeyword === '' && anyDayActive == true) {

      if (category.categoryone !== "" || category.categorytwo !== "" || category.categorythree !== "") {
        var featuredfiltered = fixedfeaturedPosts;
        featuredfiltered = featuredfiltered.filter(news =>
          news.node.newscategories.nodes[0].slug === category.categoryone || news.node.newscategories.nodes[0].slug === category.categorytwo || news.node.newscategories.nodes[0].slug === category.categorythree
        )
        setFeaturedPosts(featuredfiltered);

      } else {
        setFeaturedPosts(fixedfeaturedPosts);
      }


    } else if (searchKeyword === '' && dateFilterData.startdate === null && dateFilterData.enddate === null) {

      if (category.categoryone !== "" || category.categorytwo !== "" || category.categorythree !== "") {
        var featuredfiltered = fixedfeaturedPosts;
        featuredfiltered = featuredfiltered.filter(news =>
          news.node.newscategories.nodes[0].slug === category.categoryone || news.node.newscategories.nodes[0].slug === category.categorytwo || news.node.newscategories.nodes[0].slug === category.categorythree
        )
        setFeaturedPosts(featuredfiltered);

      } else {
        setFeaturedPosts(fixedfeaturedPosts);
      }

    } else {
      setFeaturedPosts([]);
    }

    setNonFeaturedPosts(filteredData);

    setPaginateCount(1);

    setSortbyvalue('');
  }


  const showAllFilter = () => {
    document.getElementById('showAll').checked = true;
    document.getElementById('categoryone').checked = false
    document.getElementById('categorytwo').checked = false
    document.getElementById('categorythree').checked = false

    setCategory({
      ...category,
      categoryone: "",
      categorytwo: "",
      categorythree: "",
    });

  }



  const clearSearch = () => {
    setFeaturedPosts(fixedfeaturedPosts);
    setNonFeaturedPosts(fixedNonFeaturedPosts);
    setDateRange([null, null]);

    setSearchKeyword('');
    if (document.querySelector('input[name="days"]:checked') !== null) {
      document.querySelector('input[name="days"]:checked').checked = false;
    }
    document.getElementById('anyTime').checked = true;

    setDateFilterData(prevState => ({
      ...prevState,
      startdate: null,
      enddate: null,
    }));

    showAllFilter();
    setSortbyvalue('');
    setPaginateCount(1);
  }




  useEffect(() => {
    if (category.categoryone !== "" || category.categorytwo !== "" || category.categorythree !== "") {
      filterPosts();
      document.getElementById('showAll').checked = false;
    }
    else {
      if(fixedfeaturedPosts.length>0){
        filterPosts();
      }
      document.getElementById('showAll').checked = true;
    }
  }, [category])

  /* ******** Filter Part End ******** */




  /* ******** Sort Start ******** */
  const handleSortBy = async (e) => {
    setSortbyvalue(e.target.value);

    var nonFeatured = nonFeaturedPosts;

    if (e.target.value === "oldest") {
      nonFeatured = nonFeatured.sort(function (b, a) {
        return new Date(b.node.date) - new Date(a.node.date)
      })
    } else {
      nonFeatured = nonFeatured.sort(function (a, b) {
        return new Date(b.node.date) - new Date(a.node.date)
      })
    }

    //setNonFeaturedPosts(nonFeatured);
    setVisibleNews(nonFeatured && nonFeatured.slice(0, (1 * pageSize)))
    setPaginateCount(1);
    setShowLoadMore(true)

  }
  /* ******** Sort End ******** */



  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="customInput" onClick={onClick} ref={ref}>
      {value ? value : "Select dates"}
    </button>
  ));


  return (
    <Layout
      lang={currentPage.locale.id}
      title={currentPage.seo.opengraphTitle?currentPage.seo.opengraphTitle:null}
      description={currentPage.seo.opengraphDescription?currentPage.seo.opengraphDescription:null}
      image={currentPage.featuredImage.node.sourceUrl?currentPage.featuredImage.node.sourceUrl:null}
    >
    <div className='container'>
     
     
        <div className='row'> 

        <div className='col-md-12'>  
        <div className='heroSection'>
      <GatsbyImage image={getImage(currentPage.featuredImage.node)} alt={currentPage.featuredImage.node?currentPage.featuredImage.node:"image"} />
      </div>
      </div>
      </div>
      </div>

 
      {/* FILTER BOX START */}
      <div className='mediaCenterFilterSectionWrapper'>
        <div className='media-center-wrapper-left-bg'>
          <div className='container pr-0 pr-md-auto'>
            <div className='media-center-main-wrapper bg-light'>

              <div className='mediaCenterSearchWrapper'>

                <div className='d-none d-md-block'>

                  <div className='row'>
                    {/* <div className='col-auto pr-0'>
                      <botton className="media-filter-select-date" onClick={handleDateToggle}>Select Date</botton>
                    </div> */}
                    <div className='col-6  pl-0'>
                      <form onSubmit={onFormSubmit} style={{ height: "100%" }}>
                        <input type="text" className="media-filter-select-date-input form-control" name="text" value={searchKeyword} placeholder='Search...'
                          onChange={(e) => setSearchKeyword(e.target.value)} />
                      </form>
                    </div>
                    <div className='col-auto pl-0 pr-0'><botton className="media-filter-go-btn btn btn-primary" onClick={startSearch}>Go</botton></div>
                    <div className='col-auto pl-0'><botton className="media-filter-clear-btn btn btn-secondary" onClick={clearSearch}>Clear All</botton></div>
                  </div>
                </div>

                <div className='d-block d-md-none'>
                  <div className='filter-search-wrapper-mobile'>
                    <div className='filter-left'>
                      <botton className="media-filter-select-date-mobile" onClick={handleMobileDateToggle}><img src="/common/images/bx_filter-alt.png" alt="filter" /></botton>
                    </div>
                    <div className='filter-center'>
                      <form onSubmit={onFormSubmit} style={{ height: "100%" }}>
                        <input type="text" className="media-filter-select-date-input" name="text" value={searchKeyword} placeholder='Search...'
                          onChange={(e) => setSearchKeyword(e.target.value)} />
                      </form>
                    </div>
                    <div className='filter-right'>
                      <botton className="media-filter-go-btn media-filter-go-btn-mobile" onClick={startSearch}><img src="/common/images/fluent_search.png" alt="filter" /></botton>
                    </div>
                  </div>
                  <div className='row filterTagsWrapperMobile'>
                    <div className='col-6'>
                    </div>
                    <div className='col-6'><botton className="media-filter-clear-btn-mobile" onClick={clearSearch}><img src="/common/images/media-close-btn.png" alt="clear" /> Clear All</botton></div>

                    <div className='col-12'>
                      <div className='selectedCategoryMobile'>
                        {category.categoryone !== "" ? <span> Category one</span> : null}
                        {category.categorytwo !== "" ? <span> Category two</span> : null}
                        {category.categorythree !== "" ? <span> Category three</span> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>






              <div className={`mobilePopUpSectionWrapper ${mobileDateFilterShow ? 'show' : 'hide'}`}>
                <div className='d-block d-md-none'>
                  <button className='closeMobilePopUp' onClick={handleCloseMobilePopUp}><img src="/common/images/icons/media-close-icon-mobile.png" alt="close icon" /></button>
                  <div className='mobilePopUpSectionHeader'>
                    <div className='left'>
                      <p>Select Date</p>
                    </div>
                    <div className='right'>
                      <p>Filters</p>
                    </div>
                  </div>
                </div>
                <div className='mobilePopUpSection'>
                  <div className={`dateFilterWrapper ${dateFilterShow ? 'show' : 'hide'}`}>
                    <div className='mediaCenterDaysWrapper'>
                      <div className='col-md-12' onChange={getDays}>
                        <div className='row'>
                          <span className='filter-timeline'></span>
                          <div className='col-12 col-md'>
                            <label>
                              <input type="radio" id='anyTime' value="all" className="option-input radio mediaDateRange" name="days" defaultChecked />
                              <span> Any Time</span>
                            </label>
                          </div>
                          <div className='col-12 col-md'>
                            <label>
                              <input type="radio" value="thismonth" className="option-input radio mediaDateRange" name="days" />
                              <span> This month</span>
                            </label>
                          </div>
                          <div className='col-12 col-md'>
                            <label>
                              <input type="radio" value="lastmonth" className="option-input radio mediaDateRange" name="days" />
                              <span> Last month</span>
                            </label>
                          </div>
                          <div className='col-12 col-md'>
                            <label>
                              <input type="radio" value="30" className="option-input radio mediaDateRange" name="days" />
                              <span> Last 30 Days</span>
                            </label>
                          </div>
                          <div className='col-12 col-md'>
                          <DatePicker
                              maxDate={new Date()}                     
                              placeholderText={'Select dates'}
                              selectsRange={true}
                              startDate={startDate}
                              endDate={endDate}
                              onChange={(update) => {
                                setDateRange(update);
                                getDateRangeFilter(update);
                              }}
                              isClearable={true}
                              calendarClassName="mediaCenterDatePicker"
                              customInput={<CustomInput />}
                              showMonthDropdown
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className='mediaCenterDateWrapper'>
                        <div className='row'>
                          <div className='col-auto'>
                            <DatePicker
                              maxDate={new Date()}
                              placeholderText={'Select dates'}
                              selectsRange={true}
                              startDate={startDate}
                              endDate={endDate}
                              onChange={(update) => {
                                setDateRange(update);
                                getDateRangeFilter(update);
                              }}
                              isClearable={true}
                              calendarClassName="mediaCenterDatePicker"
                              customInput={<CustomInput />}
                              showMonthDropdown
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className='mediaCenterFilterWrapper'>
                    <div className='row'>
                    <div className='col-12 col-md'>
                      <div className="form-check">
                        <input type="checkbox" value="Life Sciences" id="showAll"
                          onChange={showAllFilter}
                        />
                        <label className="form-check-label" for="showAll"> All</label>
                      </div>
                      </div>
                    <div className='col-12 col-md'>
                      <div className="form-check">
                        <input type="checkbox" value="Life Sciences" id="categoryone"
                          onChange={(e) => setCategory({ ...category, categoryone: category.categoryone === "" ? "category-one" : "" })}
                        />
                        <label className="form-check-label" for="categoryone"> Category One</label>
                      </div>
                    </div>
                    <div className='col-12 col-md'>
                      <div className="form-check">
                        <input type="checkbox" value="Life Sciences" id="categorytwo"
                          onChange={(e) => setCategory({ ...category, categorytwo: category.categorytwo === "" ? "category-two" : "" })}
                        />
                        <label className="form-check-label" for="categorytwo"> Category Two</label>
                      </div>
                    </div>
                    <div className='col-12 col-md'>
                      <div className="form-check">
                        <input type="checkbox" value="Life Sciences" id="categorythree"
                          onChange={(e) => setCategory({ ...category, categorythree: category.categorythree === "" ? "category-three" : "" })}
                        />
                        <label className="form-check-label" for="categorythree"> Category Three</label>
                      </div>
                    </div>
                    </div>
                  </div>




                </div>

                <div className='d-block d-md-none showResultBtnWrapper'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-12'>
                        <hr />
                      </div>
                      <div className='col-12'>
                        <button className='showResultBtn' onClick={handleCloseMobilePopUp}>Show results  <img src="/common/images/icons/dashicons_arrow-right-alt2.png" alt="arrow icon" /></button>
                      </div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* FILTER BOX END*/}


    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='featured-article-wrapper'>
          {
            featuredPosts.length > 0 ?
              <div className="row">
                  
                <h4>Featured</h4>
                {featuredPosts.map((data) => {
                  return <Cards
                    url={data.node.localizedWpmlUrl}
                    imageUrl={data.node.featuredImage.node}
                    imageAlt={data.node.featuredImage.node ? data.node.featuredImage.node : "image"}
                    date={data.node.date}
                    location={data.node.press_release_acf.location}
                    shortTitle={data.node.press_release_acf.shortTitle}
                    shortSummary={data.node.press_release_acf.summary}
                    shareUrl={`${props.location.href}${data.node.slug}`}
                    category={data.node.newscategories.nodes[0].name}
                  />
                })}
              </div>
              :
              null
          }


          {
            featuredPosts.length === 0 ?
              <div className='row d-flex justify-content-between mb-4'>
                <div className='col-auto'>

                  {
                    searchKeyword ?
                      <p>{nonFeaturedPosts.length} matching results found for {searchKeyword}</p>
                      :
                      <p>{nonFeaturedPosts.length} matching results found</p>
                  }



                </div>
                <div className='col-auto'>
                  <select className='form-control' value={sortbyvalue} onChange={handleSortBy}>
                    <option selected>Sort by</option>
                    <option value="newest">Latest</option>
                    <option value="oldest">Oldest</option>
                  </select>

                </div>
              </div>

              :
              null
          }
        </div>


         <h4>Non Featured</h4>

          {
            visibleNews.length > 0 ?
              <div className='mediaCenterListingWrapper'>
                <div className="row mediabxwrap">
                  {
                    visibleNews.map((data, key) => (
                      <Cards
                        url={data.node.localizedWpmlUrl}
                        imageUrl={data.node.featuredImage.node}
                        imageAlt={data.node.featuredImage.node ? data.node.featuredImage.node : "image"}
                        date={data.node.date}
                        location={data.node.press_release_acf.location}
                        shortTitle={data.node.press_release_acf.shortTitle}
                        shortSummary={data.node.press_release_acf.summary}
                        shareUrl={props.location.href}
                        category={data.node.newscategories.nodes[0].name}
                      />
                    ))
                  }
                </div>
              </div>




              :
              featuredPosts.length > 0 ? null
                :
                <div className='text-center font-weight-bold no-result-found'>No result found</div>
          }


          <div className='row'>
            {
              showLoadMore ?
                <div className="">
                  <button className='loadmore mediaCenterLoadMore btn btn-secondary' onClick={loadMoreNews}>Load more...</button>
                </div>
                :
                null
            }
          </div>

        </div>
      </div>
    </div>














    </Layout>
  )
}


export default NewsListing;

export const pageQuery = graphql`
query mainPage($id: String!, $langCode: ID!) {
  wpPage(id: { eq: $id }) {
    title
    content      
    id 
    featuredImage {
      node {
        gatsbyImage(width: 1320, placeholder: BLURRED)
        altText
        sourceUrl
      }
    }
    locale {
      id
    }
    seo {
      opengraphTitle
      opengraphDescription
    }

  }

  allWpPressrelease(filter: {locale: {id: {eq: $langCode}}}, sort: {fields: date, order: DESC}) {
    edges {
        node {
            title
            id
            localizedWpmlUrl
            slug
            date(formatString: "MMMM D, Y")
            featuredImage {
                node {
                  gatsbyImage(width: 730, placeholder: BLURRED)
                  altText
                }
            }
            locale {
                id
                locale
            }
            translated {
                id
                localizedWpmlUrl
                locale {
                    id
                    locale
                }
                slug
                title
            }
            newscategories {
              nodes {
                name
                slug
              }
            }
            press_release_acf {
                summary
                shortTitle
                featured
                location
            }
        }
    }
}
}
`;
