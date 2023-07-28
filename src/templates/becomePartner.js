import React, { useEffect, useState } from "react"
import Layout from '../components/layout';
import { graphql } from "gatsby"
import SiteTrans from "../components/LangConfig/siteTrans.json";
import CountryListTrans from '../components/LangConfig/countryListTrans';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
var Recaptcha = require('react-recaptcha');

const BecomePartner = (props) => {

    const allWpCategoryemail = props.data.allWpCategoryemail.edges;

    const [sectorShowHide,
        SetSectorShowHide] = useState('d-none');
    const [catShowHide,
        SetCatShowHide] = useState('d-none');

    const [formState,
        setFormState] = useState({
            salutation: '',
            firstname: '',
            lastname: '',
            role_or_position: '',
            company: '',
            company_website: '',
            phone: '',
            email: '',
            country: '',
            countryid: '',
            sector_of_interest: '',
            sector_of_interest_other: '',
            category: '',
            category_other: '',
            // typeofinquiry: "",
            inquiryid: "",
            inquiry: '',
            captcha: false,
            ageConsent: false,
            dataConsent: false,
            subscribeConsent: false,
            status: false,
            statusMsg: '',
            error: false,
            errorMsg: ''
        });

    const [captcha,
        setCaptcha] = useState(false)
    const [errorState,
        setErrorState] = useState({
            salutation: '',
            firstname: '',
            lastname: '',
            role_or_position: '',
            company: '',
            company_website: '',
            phone: '',
            email: '',
            country: '',
            countryid: '',
            sector_of_interest: '',
            sector_of_interest_other: '',
            category: '',
            category_other: '',
            // typeofinquiry: "",
            inquiryid: "",
            inquiry: '',
            captcha: false,
            ageConsent: false,
            dataConsent: false,
            subscribeConsent: false,
            status: false,
            statusMsg: '',
            error: false,
            errorMsg: ''
        });

    useEffect(() => {
        formState.sector_of_interest === 'Other'
            ? SetSectorShowHide('d-block')
            : SetSectorShowHide('d-none')
        formState.category === 'Other'
            ? SetCatShowHide('d-block')
            : SetCatShowHide('d-none')
    }, [formState]);

    let recaptchaInstance;
    var callback = function () {
        console.log('Done!!!!');
    };

    // specifying verify callback function
    // var verifyCallback = function (response) {
    //     console.log(response);
    // };

    const [btnSubmitAction, setBtnSubmitAction] = useState(false);
    const addSubmission = () => {
        setBtnSubmitAction(true);
        let err = false;
        // let errMsg = '';
        let emailErr,
            salutationErr,
            fnameErr,
            lnameErr,
            phoneErr,
            role_or_positionErr,
            countryidErr,
            companyErr,
            company_websiteErr,
            sector_of_interestErr,
            categoryErr,
            inqErr,
            inquiryErr,
            ageConsentErr,
            dataConsentErr,
            subscribeConsentErr,
            captchaErr = "";
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(formState.email)) {
            err = true;
            emailErr = SiteTrans.becomepartner_email_err[currentPage.locale.id];
        }
        if (formState.salutation === '') {
            err = true;
            salutationErr = SiteTrans.becomepartner_salutation_err[currentPage.locale.id];
        }
        if (formState.firstname === '') {
            err = true;
            fnameErr = SiteTrans.becomepartner_fname_err[currentPage.locale.id];
        }
        if (formState.lastname === '') {
            err = true;
            lnameErr = SiteTrans.becomepartner_lname_err[currentPage.locale.id];
        }
        if (formState.role_or_position === '') {
            err = true;
            role_or_positionErr = SiteTrans.becomepartner_role_err[currentPage.locale.id];
        }
        if (formState.company === '') {
            err = true;
            companyErr = SiteTrans.becomepartner_company_err[currentPage.locale.id];
        }
        if (formState.company_website === '') {
            err = true;
            company_websiteErr = SiteTrans.becomepartner_company_err[currentPage.locale.id];
        }
        if (formState.phone === '') {
            err = true;
            phoneErr = SiteTrans.becomepartner_phone_err[currentPage.locale.id];
        }
        if (formState.countryid === '') {
            err = true;
            countryidErr = SiteTrans.becomepartner_country_err[currentPage.locale.id];
        }
        if (formState.sector_of_interest === '') {
            err = true;
            sector_of_interestErr = SiteTrans.becomepartner_sector_interest_err[currentPage.locale.id];
        }
        if (formState.category === '') {
            err = true;
            categoryErr = SiteTrans.becomepartner_category_err[currentPage.locale.id];
        }
        
        if (formState.inquiry === '') {
            err = true;
            inquiryErr = SiteTrans.becomepartner_inquiry_err[currentPage.locale.id];
        }

        if (formState.ageConsent === false) {
            err = true;
            ageConsentErr = SiteTrans.becomepartner_age_confirm_err[currentPage.locale.id];
        }

        if (formState.dataConsent === false) {
            err = true;
            dataConsentErr = SiteTrans.becomepartner_consent_err[currentPage.locale.id];
        }

        
        // if (captcha === false) {
        //     err = true;
        //     captchaErr = "Captcha is required";
        // }
        if (err) {
            setErrorState({
                ...errorState,
                error: true,
                salutation: salutationErr,
                firstname: fnameErr,
                lastname: lnameErr,
                role_or_position: role_or_positionErr,
                company: companyErr,
                company_website: company_websiteErr,
                phone: phoneErr,
                email: emailErr,
                countryid: countryidErr,
                sector_of_interest: sector_of_interestErr,
                category: categoryErr,
                // typeofinquiry: inqErr,
                inquiry: inquiryErr,
                ageConsent: ageConsentErr,
                dataConsent: dataConsentErr,
                subscribeConsent: subscribeConsentErr,
                captcha: captchaErr
            })
        } else {
            var axios = require('axios');




            var FormData = require('form-data');
            var data = new FormData();
            data.append('flag', true);
            data.append('formtype', 'becomepartner');
            data.append('salutation', formState.salutation);
            data.append('firstname', formState.firstname);
            data.append('lastname', formState.lastname);
            data.append('role_or_position', formState.role_or_position);
            data.append('company', formState.company);
            data.append('company_website', formState.company_website);
            data.append('phone', formState.phone);
            data.append('email', formState.email);
            data.append('country', formState.country);
            data.append('countryid', formState.countryid);
            data.append('sector_of_interest', formState.sector_of_interest);
            data.append('sector_of_interest_other', formState.sector_of_interest_other);
            data.append('category', formState.category);
            data.append('category_other', formState.category_other);
            // data.append('typeofinquiry', formState.typeofinquiry);
            data.append('inquiryid', formState.inquiryid);
            data.append('inquiry', formState.inquiry);
            data.append('ageConsent', formState.ageConsent);
            data.append('dataConsent', formState.dataConsent);
            data.append('subscribeConsent', formState.subscribeConsent);

            var config = {
                method: 'post',
                url: 'https://aljcms.lemonhq.io/wp-content/themes/jameelmotors/addCf7.php',
                headers: {},
                data: data
            };









            // var mainJson = {
            //     formEndpoint: 'https://solutioncms.aljhealth.com/wp-json/contact-form-7/v1/contact-forms/7229/f' +
            //             'eedback',
            //     project: 'Jameel Health',
            //     formName: 'Contact Us FormBecome a Partner',
            //     slackUrl: '',
            //     formData: {
            //         salutation: formState.salutation,
            //         firstname: formState.firstname,
            //         lastname: formState.lastname,
            //         role_or_position: formState.role_or_position,
            //         company: formState.company,
            //         company_website: formState.company_website,
            //         phone: formState.phone,
            //         email: formState.email,
            //         country: formState.country,
            //         countryid: formState.countryid,
            //         sector_of_interest: formState.sector_of_interest,
            //         sector_of_interest_other: formState.sector_of_interest_other,
            //         category: formState.category,
            //         category_other: formState.category_other,
            //         inquiry: formState.inquiry,
            //         ageConsent: formState.ageConsent,
            //         dataConsent: formState.dataConsent,
            //         subscribeConsent: formState.subscribeConsent
            //     }
            // }

            // var data = JSON.stringify(mainJson);
            // console.log(data);
            // var config = {
            //     method: 'post',
            //     url: 'https://qb2zboq3ih.execute-api.eu-west-2.amazonaws.com/prod/sqs',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     data: data
            // };

            axios(config).then(function (response) {
                console.log(JSON.stringify(response.data, "-=-=-=-=-=-==-=-"));
                // recaptchaInstance.reset();
                setFormState({
                    ...formState,
                    salutation: '',
                    firstname: '',
                    lastname: '',
                    role_or_position: '',
                    company: '',
                    company_website: '',
                    phone: '',
                    email: '',
                    country: '',
                    countryid: '',
                    sector_of_interest: '',
                    category: '',
                    // typeofinquiry: "",
                    inquiry: '',
                    captcha: false,
                    ageConsent: false,
                    dataConsent: false,
                    subscribeConsent: false,
                    status: true,
                    statusMsg: "Thank you for contacting us! We will be in touch with you shortly.",
                    error: false,
                    errorMsg: ''
                })
                setCaptcha(false)
                setErrorState({
                    salutation: '',
                    firstname: '',
                    lastname: '',
                    role_or_position: '',
                    company: '',
                    company_website: '',
                    phone: '',
                    email: '',
                    country: '',
                    countryid: '',
                    sector_of_interest: '',
                    category: '',
                    // typeofinquiry: "",
                    inquiry: '',
                    captcha: false,
                    ageConsent: false,
                    dataConsent: false,
                    subscribeConsent: false,
                    status: false,
                    statusMsg: '',
                    error: false,
                    errorMsg: ''
                })
            })
                .catch(function (error) {
                    // console.log(error);
                    // recaptchaInstance.reset();
                    setFormState({
                        ...formState,

                        status: false,
                        statusMsg: "",
                        error: true,
                        errorMsg: 'There was an error saving your request. Please try again later.'
                    })
                    setErrorState({
                        salutation: '',
                        firstname: '',
                        lastname: '',
                        role_or_position: '',
                        company: '',
                        company_website: '',
                        phone: '',
                        email: '',
                        country: '',
                        countryid: '',
                        sector_of_interest: '',
                        category: '',
                        // typeofinquiry: "",
                        inquiry: '',
                        captcha: false,
                        ageConsent: false,
                        dataConsent: false,
                        subscribeConsent: false,
                        status: false,
                        statusMsg: '',
                        error: false,
                        errorMsg: ''
                    })
                    setCaptcha(false)
                });
        }

    }

    const checkValidationAfterSubmit = (e) => {
        if (btnSubmitAction === true) {
            let err = false;
            // let errMsg = '';
            let emailErr,
                salutationErr,
                fnameErr,
                lnameErr,
                phoneErr,
                role_or_positionErr,
                countryidErr,
                companyErr,
                company_websiteErr,
                sector_of_interestErr,
                categoryErr,
                inqErr,
                inquiryErr,
                ageConsentErr,
                dataConsentErr,
                subscribeConsentErr,
                captchaErr = "";
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (formState.salutation === '') {
                err = true;
                salutationErr = SiteTrans.becomepartner_salutation_err[currentPage.locale.id];
            }
            if (formState.firstname === '') {
                err = true;
                fnameErr = SiteTrans.becomepartner_fname_err[currentPage.locale.id];
            }
            if (formState.lastname === '') {
                err = true;
                lnameErr = SiteTrans.becomepartner_lname_err[currentPage.locale.id];
            }
            if (formState.role_or_position === '') {
                err = true;
                role_or_positionErr = SiteTrans.becomepartner_role_err[currentPage.locale.id];
            }
            if (formState.company === '') {
                err = true;
                companyErr = SiteTrans.becomepartner_company_err[currentPage.locale.id];
            }
            if (formState.company_website === '') {
                err = true;
                company_websiteErr = SiteTrans.becomepartner_company_err[currentPage.locale.id];
            }
            if (!re.test(formState.email)) {
                err = true;
                emailErr = SiteTrans.becomepartner_email_err[currentPage.locale.id];
            }
            if (formState.phone === '') {
                err = true;
                phoneErr = SiteTrans.becomepartner_phone_err[currentPage.locale.id];
            }
            if (formState.countryid === '') {
                err = true;
                countryidErr = SiteTrans.becomepartner_country_err[currentPage.locale.id];
            }
            if (formState.sector_of_interest === '') {
                err = true;
                sector_of_interestErr = SiteTrans.becomepartner_sector_interest_err[currentPage.locale.id];
            }
            if (formState.category === '') {
                err = true;
                categoryErr = SiteTrans.becomepartner_category_err[currentPage.locale.id];
            }
            
            if (formState.inquiry === '') {
                err = true;
                inquiryErr = SiteTrans.becomepartner_inquiry_err[currentPage.locale.id];
            }

            if (formState.ageConsent === false) {
                err = true;
                ageConsentErr = SiteTrans.becomepartner_age_confirm_err[currentPage.locale.id];
            }

            if (formState.dataConsent === false) {
                err = true;
                dataConsentErr = SiteTrans.becomepartner_consent_err[currentPage.locale.id];
            }

            // if (captcha === false) {
            //     err = true;
            //     captchaErr = "Captcha is required";
            // }
            if (err) {
                setErrorState({
                    ...errorState,
                    error: true,
                    salutation: salutationErr,
                    firstname: fnameErr,
                    lastname: lnameErr,
                    role_or_position: role_or_positionErr,
                    company: companyErr,
                    company_website: company_websiteErr,
                    phone: phoneErr,
                    email: emailErr,
                    countryid: countryidErr,
                    sector_of_interest: sector_of_interestErr,
                    category: categoryErr,
                    // typeofinquiry: inqErr,
                    inquiry: inquiryErr,
                    ageConsent: ageConsentErr,
                    dataConsent: dataConsentErr,
                    subscribeConsent: subscribeConsentErr,
                    captcha: captchaErr
                })
            }
        }
    }

    const currentPage = props.data.wpPage
    const allWpMarket = props.data.allWpMarket.edges


    console.log("allWpMarket");
    console.log(allWpMarket);

    const clickHandler = (e) => { }

    return (
        <React.Fragment>

<Layout
    lang={currentPage.locale.id}
    title={currentPage.seo.opengraphTitle?currentPage.seo.opengraphTitle:null}
    description={currentPage.seo.opengraphDescription?currentPage.seo.opengraphDescription:null}
    image={currentPage.featuredImage.node.sourceUrl?currentPage.featuredImage.node.sourceUrl:null}
    >

<div className="container">
        <div className='col-md-12'>  
<div className='heroSection'>
<GatsbyImage image={getImage(currentPage.featuredImage.node)} alt={currentPage.featuredImage.node?currentPage.featuredImage.node:"image"} />
</div>
</div>
</div>
                <div className="become-a-partner-block">
                    <div
                        onClick={clickHandler} onKeyDown={clickHandler} role="presentation"
                        dangerouslySetInnerHTML={{
                            __html: currentPage.content
                        }} />
                </div>
                <section>
                    <div className="container-fluid contact-us-container second-block-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="contact-us-form">

                                        <div className="row">
                                            <div className="col-md-4">

                                                <div className="form-group mb-4">
                                                    <select
                                                        id="salutation"
                                                        name="salutation"
                                                        className="form-control"
                                                        value={formState.salutation}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                salutation: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}>
                                                        <option>{SiteTrans.becomepartner_salutation[currentPage.locale.id]}</option>
                                                        <option>Mr</option>
                                                        <option>Mrs</option>
                                                        <option>Miss</option>
                                                        <option>Ms</option>
                                                        <option>Dr</option>
                                                        <option>Professor</option>
                                                        <option>Other</option>
                                                    </select>

                                                    {errorState.salutation
                                                        ? <span>{errorState.salutation}</span>
                                                        : null}
                                                </div>

                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="firstname"
                                                        id="firstname"
                                                        placeholder={SiteTrans.becomepartner_fname[currentPage.locale.id]}
                                                        value={formState.firstname}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                firstname: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.firstname
                                                            ? <span>{errorState.firstname}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="lastname"
                                                        id="lastname"
                                                        placeholder={SiteTrans.becomepartner_lname[currentPage.locale.id]}
                                                        value={formState.lastname}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                lastname: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.lastname
                                                            ? <span>{errorState.lastname}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="role_or_position"
                                                        id="role_or_position"
                                                        placeholder={SiteTrans.becomepartner_role[currentPage.locale.id]}
                                                        value={formState.role_or_position}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                role_or_position: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.role_or_position
                                                            ? <span>{errorState.role_or_position}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="company"
                                                        id="company"
                                                        placeholder={SiteTrans.becomepartner_company[currentPage.locale.id]}
                                                        value={formState.company}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                company: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.company
                                                            ? <span>{errorState.company}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="company_website"
                                                        id="company_website"
                                                        placeholder={SiteTrans.becomepartner_company_website[currentPage.locale.id]}
                                                        value={formState.company_website}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                company_website: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.company_website
                                                            ? <span>{errorState.company_website}</span>
                                                            : null}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        id="email"
                                                        placeholder={SiteTrans.becomepartner_email[currentPage.locale.id]}
                                                        value={formState.email}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                email: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.email
                                                            ? <span>{errorState.email}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder={SiteTrans.becomepartner_phone[currentPage.locale.id]}
                                                        value={formState.phone}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                phone: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }} /> {errorState.phone
                                                            ? <span>{errorState.phone}</span>
                                                            : null}

                                                </div>
                                            </div>

                                            <div className="col-md-4">

                                                <div className="form-group mb-4">
                                                    <select
                                                        id="countryid"
                                                        name="countryid"
                                                        className="form-control"
                                                        value={formState.countryid}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                countryid: e.target.value,
                                                                country: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e);
                                                            // addSubmission(e)
                                                        }}>
                                                        <option value="">{SiteTrans.becomepartner_country[currentPage.locale.id]}</option>
                                                        <CountryListTrans lang={currentPage.locale.id} />

                                                    </select>
                                                    {errorState.countryid
                                                        ? <span>{errorState.countryid}</span>
                                                        : null}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <select
                                                        id="sector_of_interest"
                                                        name="sector_of_interest"
                                                        className="form-control"
                                                        value={formState.sector_of_interest}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                sector_of_interest: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}>

                                                        <option>{SiteTrans.becomepartner_sector_interest[currentPage.locale.id]}</option>

                                                        {allWpMarket.map(item => (
                                                            <option>{item.node.title}</option>
                                                        ))}
                                                        <option>Other</option>

                                                    </select>
                                                    {errorState.sector_of_interest
                                                        ? <span>{errorState.sector_of_interest}</span>
                                                        : null}
                                                </div>
                                            </div>

                                            <div className={`col-md-6 ${sectorShowHide}`}>
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="sector_of_interest_other"
                                                        id="sector_of_interest_other"
                                                        placeholder={SiteTrans.becomepartner_sector_interest_other[currentPage.locale.id]}
                                                        value={formState.sector_of_interest_other}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                sector_of_interest_other: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <select id="category" name="Select Category"
                                                        onChange={(e) => {
                                                            var inqID = e.target[e.target.selectedIndex].getAttribute('data-inqid');
                                                            setFormState({
                                                                ...formState,
                                                                category: e.target.value,
                                                                inquiryid: inqID,
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        className="form-control">
                                                        <option value="">
                                                            {SiteTrans.becomepartner_category[currentPage.locale.id]
                                                            }
                                                        </option>
                                                        {allWpCategoryemail ?
                                                            allWpCategoryemail.map((data, key) => (
                                                                <option key={key} value={data.node.title} data-inqid={data.node.databaseId}>{data.node.title}</option>
                                                            ))
                                                            : null}
                                                    </select>
                                                    {errorState.category
                                                        ? (
                                                            <span>{errorState.category}</span>
                                                        )
                                                        : null}
                                                </div>
                                            </div>

                                            <div className={`col-md-6 ${catShowHide}`}>
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="category_other"
                                                        id="category_other"
                                                        placeholder={SiteTrans.becomepartner_category_other[currentPage.locale.id]}
                                                        value={formState.category_other}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                category_other: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }} />
                                                </div>
                                            </div>


                                            <div className="col-md-12">
                                                <div className="form-group mb-4">
                                                    <textarea
                                                        name="inquiry"
                                                        row="5"
                                                        className="form-control"
                                                        placeholder={SiteTrans.becomepartner_inquiry[currentPage.locale.id]}
                                                        value={formState.inquiry}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                inquiry: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }} /> {errorState.inquiry
                                                            ? <span>{errorState.inquiry}</span>
                                                            : null}
                                                </div>
                                                <div className="form-group mb-4">
                                                    <Recaptcha
                                                        ref={e => recaptchaInstance = e}
                                                        render="explicit"
                                                        sitekey="6Ld9CuogAAAAAGCHkeQ0UEP-uBCZN1_8tpgbmcPs"
                                                        verifyCallback={(response) => {
                                                            setCaptcha(true)
                                                        }}
                                                        onloadCallback={callback} /> {errorState.captcha
                                                            ? <span>{errorState.captcha}</span>
                                                            : null}
                                                </div>
                                            </div>

                                            <div className="col-md-12">

                                            <div className="form-check">
                                                    <label className="form-check-label">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        name="ageConsent"
                                                        checked={formState.ageConsent}
                                                        onChange={(e) =>
                                                        setFormState({
                                                            ...formState,
                                                            ageConsent: !formState.ageConsent,
                                                        })
                                                        }
                                                    />
                                                    {/* {SiteTrans.footer_confirm_message[props.lang]} */}
                                                    <p>I confirm that I am over 18 years of age, or over the legal age of majority in my country of residence.</p>

                                                    {errorState.ageConsent ? (
                                                        <span className="checkbox-error">
                                                        {errorState.ageConsent}
                                                        </span>
                                                    ) : null}
                                                    </label>
                                                </div>


                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        name="dataConsent"
                                                        checked={formState.dataConsent}
                                                        onChange={(e) =>
                                                        setFormState({
                                                            ...formState,
                                                            dataConsent: !formState.dataConsent,
                                                        })
                                                        }
                                                    />
                                                    {/* {SiteTrans.footer_consent_message[props.lang]} */}
                                                        <p>I consent to having this website store my submitted information to respond to my inquiry.</p>
                                                    {errorState.dataConsent ? (
                                                        <span className="checkbox-error">
                                                        {errorState.dataConsent}
                                                        </span>
                                                    ) : null}
                                                    </label>
                                                </div>



                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            name="subscribeConsent"
                                                            className="form-check-input"
                                                            checked={formState.subscribeConsent}
                                                            onChange={(e) => {
                                                                setFormState({
                                                                    ...formState,
                                                                    subscribeConsent: !formState.subscribeConsent
                                                                });
                                                                checkValidationAfterSubmit(e)
                                                            }} />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: SiteTrans.becomepartner_subcrible[currentPage.locale.id]
                                                            }} /> 
                                                            
                                                            {errorState.subscribeConsent
                                                                ? <span>{errorState.subscribeConsent}</span>
                                                                : null}
                                                               
                                                    </label>
                                                </div>


                                                
                                            </div>
                                            <div className="col-md-12">
                                                <button type="button" className="readmore btn btn-primary" onClick={addSubmission}>{SiteTrans.becomepartner_submit_lable[currentPage.locale.id]}</button>
                                            </div>
                                            {formState.error
                                                ? <div className="message-error">{formState.errorMsg}</div>
                                                : null}

                                            {formState.statusMsg
                                                ? <div className="thankyoumessage mt-4">
                                                    <strong>{formState.statusMsg}</strong>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </section>



            </Layout>
        </React.Fragment>
    )
}

export default BecomePartner

export const BecomePartnerPageQuery = graphql`
    query BecomePartnerPageQuery($id: String!, $langCode: ID!) {
        wpPage(id: { eq: $id }) {
            title
            content
            slug
            id,
            featuredImage {
                node {
                  gatsbyImage(width: 1320, placeholder: BLURRED)
                  altText
                }
              }
             
            template {
              templateName
            }
            locale {
                id
                locale
            }
            seo {
                opengraphTitle
                opengraphDescription
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
            
        }



        allWpMarket(sort: {menuOrder: ASC} filter: {locale: {id: {eq: $langCode} } }) {
            edges {
                node {
                    id
                    content
                    title
                    link
                    localizedWpmlUrl
                    our_solution_custom_fields {
                    icon {
                        altText
                        sourceUrl
                    }
                    shortDescription
                    }
                }
            }
        }

        allWpCategoryemail(filter: {locale: {id: {eq: $langCode}}}, sort: {menuOrder: ASC}) {
            edges {
              node {
                title
                databaseId
              }
            }
        }


        site {
            id
            siteMetadata {
                title
            }
        }
    
    }
`