// import { Link } from "gatsby";
import React, { useState } from "react";

import { useStaticQuery, graphql } from "gatsby";

import { Link } from "gatsby";
import SiteTrans from "../../LangConfig/siteTrans.json";
import CookieConsent from "../cookie-consent"

const Footer = (props) => {
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    email: "",
    ageConsent: false,
    dataConsent: false,
    status: false,
    statusMsg: "",
    error: false,
    errorMsg: "",
  });
  const [errorState, setErrorState] = useState({
    fname: "",
    lname: "",
    email: "",
    ageConsent: false,
    dataConsent: false,
    status: false,
    statusMsg: "",
    error: false,
    errorMsg: "",
  });

  const footerSubmission = () => {
    let err = false;
    // let errMsg = "";
    let emailErr,
      fnameErr,
      lnameErr,
      ageConsentErr,
      dataConsentErr;
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formState.fname === "") {
      err = true;
      fnameErr = true;
    }
    if (formState.lname === "") {
      err = true;
      lnameErr = true;
    }
    if (!re.test(formState.email)) {
      err = true;
      emailErr = true;
    }
    if (formState.ageConsent === false) {
      err = true;
      ageConsentErr = "Please confirm the age consent";
    }
    if (formState.dataConsent === false) {
      err = true;
      dataConsentErr = "Please confirm the data consent";
    }

    if (err) {
      setErrorState({
        ...errorState,
        error: true,
        fname: fnameErr,
        lname: lnameErr,
        email: emailErr,
        ageConsent: ageConsentErr,
        dataConsent: ageConsentErr,
      });
    } else {
      var axios = require("axios");

      var FormData = require('form-data');
      var data = new FormData();
      data.append('flag', true);
      data.append('formtype', 'newsletter');
      data.append('email', formState.email);
      data.append('firstname', formState.fname);
      data.append('lastname', formState.lname);
      data.append('ageConsent', formState.ageConsent);
      data.append('dataConsent', formState.dataConsent);

      var config = {
        method: 'post',
        url: 'https://aljcms.lemonhq.io/wp-content/themes/jameelmotors/addCf7.php',
        headers: {},
        data: data
      };


      // var mainJson = {
      //   formEndpoint:
      //     "https://cms.jameelmotors.com/wp-content/themes/jameelmotors/addCf7.php",
      //   project: "Jameel Health",
      //   formName: "Newsletter Subscription",
      //   slackUrl: "",
      //   formData: {
      //     email: formState.email,
      //     firstname: formState.fname,
      //     lastname: formState.lname,
      //     ageConsent: formState.ageConsent,
      //     dataConsent: formState.dataConsent,
      //   },
      // };

      // var data = JSON.stringify(mainJson);
      // var config = {
      //   method: "post",
      //   url: "https://qb2zboq3ih.execute-api.eu-west-2.amazonaws.com/prod/sqs",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: data,
      // };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          // recaptchaInstance.reset();
          setFormState({
            ...formState,
            fname: "",
            lname: "",
            email: "",
            ageConsent: false,
            dataConsent: false,
            status: true,
            statusMsg: "Thank you for subscribing to our newsletter",
            error: false,
            errorMsg: "",
          });
          setErrorState({
            fname: false,
            lname: false,
            email: false,
            ageConsent: false,
            dataConsent: false,
            status: false,
            statusMsg: "",
            error: false,
            errorMsg: "",
          });
        })
        .catch(function (error) {
          // console.log(error);
          // recaptchaInstance.reset();
          setFormState({
            ...formState,

            status: false,
            statusMsg: "",
            error: true,
            errorMsg:
              "There was an error saving your request. Please try again later.",
          });
          setErrorState({
            fname: false,
            lname: false,
            email: false,
            ageConsent: false,
            dataConsent: false,
            status: false,
            statusMsg: "",
            error: false,
            errorMsg: "",
          });
        });
    }
  };

  const fnameErr1 = errorState.fname === true ? "validations-error" : "noerror";
  const lnameErr1 = errorState.lname === true ? "validations-error" : "noerror";
  const emailErr1 = errorState.email === true ? "validations-error" : "noerror";

  return (
    <section className="black-bg grey-bg footer-section bg-light">
      <br/>
      
      <div className="container">

    

        <div className="newsletter-container">
          <div className="row">
            <div className="col-md-8">
              <div className="newsletter">
                <h6>{SiteTrans.footer_newsletter_heading[props.lang]}</h6>
                <div className="row no-gutters mb-4">
                  <div className="col-12 col-md">
                    <input
                      type="text"
                      className={`form-control first-name ${fnameErr1}`}
                      // placeholder={
                      //   SiteTrans.footer_form_firstname[props.lang]
                      // }
                      placeholder="First Name"
                      name="firstName"
                      value={formState.fname}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          fname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md">
                    <input
                      type="text"
                      className={`form-control last-name ${lnameErr1}`}
                      // placeholder={SiteTrans.footer_form_lastname[props.lang]}
                      placeholder="Last Name"
                      name="lastName"
                      value={formState.lname}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          lname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md">
                    <input
                      type="text"
                      className={`form-control email-address ${emailErr1}`}
                      // placeholder={SiteTrans.footer_form_email[props.lang]}
                      placeholder="Email Id"
                      name="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          email: e.target.value,
                        })
                      }
                    />

                    {errorState.email ? (
                      <span>{errorState.email}</span>
                    ) : null}
                  </div>
                  <div className="col-12 col-md">
                  <button
                    type="submit"
                    className="submit-btn btn btn-primary"
                    onClick={footerSubmission}
                  >
                    {SiteTrans.footer_form_submitbtn[props.lang]}{""}
                  </button>
                        </div>

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
              </div>
              <div className="mt-4">
                <strong>
                  {formState.status ? <span className="thankyoumessage-newsletter mb-4"> {formState.statusMsg}</span> : null}
                </strong>
              </div>
            </div>

          </div>
        </div>

        <div className="footerNav">
        <ul className="navbar-nav me-auto">
      <li className="nav-item">
      <Link to="/en/accessibility-policy"> Accessibility Policy</Link> &nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/cookie-policy"> Cookie Policy </Link> &nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/privacy-policy"> Privacy Policy </Link> &nbsp; &nbsp;
    </li>
      </ul>
        </div>




      </div>
      <div className="bottom-footer">
        <div className="container">

          <CookieConsent />

        </div>
      </div>
    </section>
  );
};

export default Footer;
