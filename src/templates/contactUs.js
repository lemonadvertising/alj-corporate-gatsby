import React, { useEffect, useState } from "react";
import Layout from '../components/layout';
import { graphql } from "gatsby";
import SiteTrans from "../components/LangConfig/siteTrans.json";
import CountryListTrans from '../components/LangConfig/countryListTrans';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
var Recaptcha = require('react-recaptcha');

const ContactUs = (props) => {
    
    const [formState,
        setFormState] = useState({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            country: "",
            typeofinquiry: "",
            inquiryid: "",
            message: "",
            captcha: false,
            countryid: "",
            ageConsent: false,
            dataConsent: false,
            status: false,
            statusMsg: "",
            error: false,
            errorMsg: ""
        });
    const [captcha,
        setCaptcha] = useState(false);
    const [errorState,
        setErrorState] = useState({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            country: "",
            typeofinquiry: "",
            inquiryid: "",
            message: "",
            countryid: "",
            captcha: "",
            ageConsent: "",
            dataConsent: "",
            error: false,
            errorMsg: ""
        });

    const currentPage = props.data.wpPage;
    
    const allWpInquiryemail = props.data.allWpInquiryemail.edges;


    let recaptchaInstance;
    var callback = function () {
        console.log('Done!!!!');
    };

    const [btnSubmitAction,
        setBtnSubmitAction] = useState(false);
    const addSubmission = () => {
        setBtnSubmitAction(true);

        let err = false;
        // let errMsg = "";
        let emailErr,
            fnameErr,
            lnameErr,
            phoneErr,
            inqErr,
            countryidErr,
            messageErr,
            ageConsentErr,
            dataConsentErr,
            captchaErr = "";
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(formState.email)) {
            err = true;
            emailErr = "Email is invalid";
        }
        if (formState.firstname === "") {
            err = true;
            fnameErr = SiteTrans.contact_fname_err[currentPage.locale.id];
        }
        if (formState.lastname === "") {
            err = true;
            lnameErr = SiteTrans.contact_fname_err[currentPage.locale.id];
        }
        if (formState.typeofinquiry === "") {
            err = true;
            inqErr = SiteTrans.contact_inquiry_type_err[currentPage.locale.id];
        }
        if (formState.phone === "") {
            err = true;
            phoneErr = SiteTrans.contact_phone_err[currentPage.locale.id];
        }
        if (formState.countryid === "") {
            err = true;
            countryidErr = SiteTrans.becomepartner_country_err[currentPage.locale.id];
        }
        if (formState.message === "") {
            err = true;
            messageErr = SiteTrans.contact_message_err[currentPage.locale.id];
        }
        if (formState.ageConsent === false) {
            err = true;
            ageConsentErr = SiteTrans.contact_confirm_message_err[currentPage.locale.id];
        }
        if (formState.dataConsent === false) {
            err = true;
            dataConsentErr = SiteTrans.contact_consent_message_err[currentPage.locale.id];
        }
        // if (captcha === false) {
        //     err = true;
        //     captchaErr = "Captcha is required";
        // }

        if (err) {
            setErrorState({
                ...errorState,
                error: true,
                email: emailErr,
                firstname: fnameErr,
                lastname: lnameErr,
                phone: phoneErr,
                typeofinquiry: inqErr,
                message: messageErr,
                captcha: captchaErr,
                countryid: countryidErr,
                ageConsent: ageConsentErr,
                dataConsent: dataConsentErr
            });
        } else {
            var axios = require("axios");


            var FormData = require('form-data');
            var data = new FormData();
            data.append('flag', true);
            data.append('formtype', 'contact');
            data.append('email', formState.email);
            data.append('firstname', formState.firstname);
            data.append('lastname', formState.lastname);
            data.append('phone', formState.phone);
            data.append('typeofinquiry', formState.typeofinquiry);
            data.append('inquiryid', formState.inquiryid);
            data.append('country', formState.country);
            data.append('message', formState.message);
            data.append('countryid', formState.countryid);
            data.append('ageConsent', formState.ageConsent);
            data.append('dataConsent', formState.dataConsent);

            var config = {
                method: 'post',
                url: 'https://cms.jameelmotors.com/wp-content/themes/jameelmotors/addCf7.php',
                headers: {},
                data: data
            };

            // var mainJson = {
            //     formEndpoint: "https://cms.jameelmotors.com/wp-json/contact-form-7/v1/contact-forms/9/feedback",
            //     project: "Jameel Health",
            //     formName: "Contact Us Form",
            //     slackUrl: "",
            //     formData: {
            //         email: formState.email,
            //         firstname: formState.firstname,
            //         lastname: formState.lastname,
            //         phone: formState.phone,
            //         typeofinquiry: formState.typeofinquiry,
            //         inquiryid:formState.inquiryid,
            //         country: formState.country,
            //         message: formState.message,
            //         countryid: formState.countryid,
            //         ageConsent: formState.ageConsent,
            //         dataConsent: formState.dataConsent
            //     }
            // };

            // var data = JSON.stringify(mainJson);
            // console.log(data);
            // var config = {
            //     method: "post",
            //     url: "https://qb2zboq3ih.execute-api.eu-west-2.amazonaws.com/prod/sqs",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     data: data
            // };

            axios(config).then(function (response) {
                console.log(JSON.stringify(response.data));
                // recaptchaInstance.reset();
                setFormState({
                    ...formState,
                    email: "",
                    firstname: "",
                    lastname: "",
                    phone: "",
                    typeofinquiry: "",
                    inquiryid: "",
                    message: "",
                    country: "",
                    countryid: "",
                    ageConsent: false,
                    dataConsent: false,
                    captcha: false,
                    status: true,
                    statusMsg: "Thank you for contacting us! We will be in touch with you shortly.",
                    error: false,
                    errorMsg: ""
                });
                setCaptcha(false);
                setErrorState({
                    email: "",
                    firstname: "",
                    lastname: "",
                    phone: "",
                    typeofinquiry: "",
                    country: "",
                    countryid: "",
                    message: "",
                    captcha: "",
                    ageConsent: "",
                    dataConsent: "",
                    error: false,
                    errorMsg: ""
                });
            })
                .catch(function (error) {
                    console.log(error);
                    // recaptchaInstance.reset();
                    setFormState({
                        ...formState,

                        status: false,
                        statusMsg: "",
                        error: true,
                        errorMsg: "There was an error saving your request. Please try again later."
                    });
                    setErrorState({
                        email: "",
                        firstname: "",
                        lastname: "",
                        phone: "",
                        typeofinquiry: "",
                        country: "",
                        message: "",
                        countryid: "",
                        ageConsent: "",
                        dataConsent: "",
                        captcha: "",
                        error: false,
                        errorMsg: ""
                    });
                    setCaptcha(false);
                });
        }
    };

    const checkValidationAfterSubmit = (e) => {
        if (btnSubmitAction === true) {
            let err = false;
            // let errMsg = "";
            let emailErr,
                fnameErr,
                lnameErr,
                phoneErr,
                inqErr,
                countryidErr,
                messageErr,
                ageConsentErr,
                dataConsentErr,
                captchaErr = "";
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(formState.email)) {
                err = true;
                emailErr = "Email is invalid";
            }
            if (formState.firstname === "") {
                err = true;
                fnameErr = SiteTrans.contact_fname_err[currentPage.locale.id];
            }
            if (formState.lastname === "") {
                err = true;
                lnameErr = SiteTrans.contact_fname_err[currentPage.locale.id];
            }
            if (formState.typeofinquiry === "") {
                err = true;
                inqErr = SiteTrans.contact_inquiry_type_err[currentPage.locale.id];
            }
            if (formState.phone === "") {
                err = true;
                phoneErr = SiteTrans.contact_phone_err[currentPage.locale.id];
            }
            if (formState.countryid === "") {
                err = true;
                countryidErr = SiteTrans.becomepartner_country_err[currentPage.locale.id];
            }
            if (formState.message === "") {
                err = true;
                messageErr = SiteTrans.contact_message_err[currentPage.locale.id];
            }
            if (formState.ageConsent === false) {
                err = true;
                ageConsentErr = SiteTrans.contact_confirm_message_err[currentPage.locale.id];
            }
            if (formState.dataConsent === false) {
                err = true;
                dataConsentErr = SiteTrans.contact_consent_message_err[currentPage.locale.id];
            }
            // if (captcha === false) {
            //     err = true;
            //     captchaErr = "Captcha is required";
            // }


            if (err) {
                setErrorState({
                    ...errorState,
                    error: true,
                    email: emailErr,
                    firstname: fnameErr,
                    lastname: lnameErr,
                    phone: phoneErr,
                    typeofinquiry: inqErr,
                    message: messageErr,
                    captcha: captchaErr,
                    countryid: countryidErr,
                    ageConsent: ageConsentErr,
                    dataConsent: dataConsentErr
                });
            }
        }
    }
 
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

               
                <div className="contact-us-main-block">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: currentPage.content
                        }} />
                </div>
                <section>
                    <div className="container-fluid contact-us-container contact-us-block-space">
                        <div className="container">
                            
                            <div className="row">
                            <form>
                                <div className="col-md-12">
                                    <div className="contact-us-form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstname"
                                                        value={formState.firstname}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                firstname: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        placeholder={SiteTrans.contact_fname[currentPage.locale.id]} /> {errorState.firstname
                                                            ? (
                                                                <span>{errorState.firstname}</span>
                                                            )
                                                            : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastname"
                                                        value={formState.lastname}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                lastname: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        placeholder={SiteTrans.contact_lname[currentPage.locale.id]} /> {errorState.lastname
                                                            ? (
                                                                <span>{errorState.lastname}</span>
                                                            )
                                                            : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        value={formState.phone}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                phone: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        placeholder={SiteTrans.contact_phone[currentPage.locale.id]} /> {errorState.phone
                                                            ? (
                                                                <span>{errorState.phone}</span>
                                                            )
                                                            : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        value={formState.email}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                email: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        placeholder={SiteTrans.contact_email[currentPage.locale.id]} /> {errorState.email
                                                            ? (
                                                                <span>{errorState.email}</span>
                                                            )
                                                            : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <select
                                                        id="countryid"
                                                        name="country"
                                                        className="form-control"
                                                        value={formState.countryid}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                countryid: e.target.value,
                                                                country: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}>
                                                        <option>
                                                            {SiteTrans.contact_country[currentPage.locale.id]}
                                                        </option>
                                                        <CountryListTrans lang={currentPage.locale.id} />
                                                     
                                                    </select>
                                                    {errorState.countryid
                                                        ? (
                                                            <span>{errorState.countryid}</span>
                                                        )
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-4">
                                                    <select id="typeofinquiry" name="Select Inquiry Type"
                                                        onChange={(e) => {
                                                            var inqID = e.target[e.target.selectedIndex].getAttribute('data-inqid');
                                                            setFormState({
                                                                ...formState,
                                                                typeofinquiry: e.target.value,
                                                                inquiryid: inqID,
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        className="form-control">
                                                        <option value="">
                                                            {SiteTrans.contact_inquiry_type[currentPage.locale.id]
                                                            }
                                                        </option>
                                                        {allWpInquiryemail ?
                                                            allWpInquiryemail.map((data, key) => (
                                                                <option key={key} value={data.node.title} data-inqid={data.node.databaseId}>{data.node.title}</option>
                                                            ))
                                                            : null}
                                                    </select>


                                                    {errorState.typeofinquiry
                                                        ? (
                                                            <span>{errorState.typeofinquiry}</span>
                                                        )
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-4">
                                                    <textarea
                                                        name="message"
                                                        row="5"
                                                        className="form-control"
                                                        value={formState.message}
                                                        onChange={(e) => {
                                                            setFormState({
                                                                ...formState,
                                                                message: e.target.value
                                                            });
                                                            checkValidationAfterSubmit(e)
                                                        }}
                                                        placeholder={SiteTrans.contact_message[currentPage.locale.id]} /> {errorState.message
                                                            ? (
                                                                <span>{errorState.message}</span>
                                                            )
                                                            : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Recaptcha
                                                ref={e => recaptchaInstance = e}
                                                render="explicit"
                                                sitekey="6LdXDFkUAAAAADdwC2RGfnsqXN5n9yiLJYJktrir"
                                                verifyCallback={(response) => {
                                                    setCaptcha(true)
                                                }}
                                                onloadCallback={callback} /> {errorState.captcha
                                                    ? <span>{errorState.captcha}</span>
                                                    : null}
                                        </div>



                                        <div className="row">
                                            <div className="col-12">
                                        <div className="newsltrcheck">


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


                                        </div>
                                        </div>
                                        </div>

                                        <button type="button" className="readmore btn btn-primary" onClick={addSubmission}>
                                            {SiteTrans.contact_submit_lable[currentPage.locale.id]}
                                        </button>

                                        {formState.error
                                            ? <div className="message-error">
                                                {formState.errorMsg}
                                            </div>
                                            : null}

                                        {formState.status
                                            ? <div className="thankyoumessage mt-4">
                                                <strong>
                                                    {formState.statusMsg}
                                                </strong>
                                            </div>
                                            : null}
                                    </div>
                                </div>
                            </form>                
                            </div>
                        </div>
                    </div>
                </section>


            </Layout>
        </React.Fragment>
    );
};

export default ContactUs;
export const ContactUsPageQuery = graphql`
    query ContactUsPageQuery($id: String!, $langCode: ID!) {
        wpPage(id: { eq: $id }) {
            title
            content
            slug
            id
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
        allWpInquiryemail(filter: { locale: { id: { eq: $langCode } } }) {
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
`;