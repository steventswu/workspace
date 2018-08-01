import React from 'react';
import styles from './tc-shared.less';

export default function CookiePolicyPage() {
  return (
    <React.Fragment>
      <h1 className={styles.h1}>Cookie Policy</h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      <table className={styles.table}>
        <tr>
          <td>Cookie Type</td>
          <td>Purpose</td>
        </tr>
        <tr>
          <td>Essential /<br />Operational</td>
          <td>These cookies are necessary to allow us to operate CAP as you have requested. For example, they help us recognize what type of subscriber you are and then provide you with services accordingly. Essential Cookies are exempt from the consent requirement. Consent is not required if the cookie is: Used for the sole purpose of carrying out the transmission of a communication; or Strictly necessary in order to provide an information society service explicitly requested by the user or subscriber.</td>
        </tr>
        <tr>
          <td>Performance /<br /> Analytics</td>
          <td>We use these cookies to analyse how CAP is accessed, is used, or is performing. We use this information to maintain, operate, and continually improve the CAP.</td>
        </tr>
        <tr>
          <td>Functional</td>
          <td>These cookies let us operate certain functions of the CAP in line with the choices you make. These cookies mean that when you continue to use or come back to the CAP, we can provide you with our services as you have asked for them to be provided, such as knowing your username, remembering how you have customised our services, and reminding you of content you have enjoyed.</td>
        </tr>
        <tr>
          <td>Targeting /<br />Advertising</td>
          <td>We use these cookies to serve you with advertisements that may be relevant to you and your interests. The information may also be used for frequency capping purposes (e.g., to ensure we do not display the same advertisement to you repeatedly) and to help us regulate the advertisements you receive and measure their effectiveness.</td>
        </tr>
        <tr>
          <td>Third Party</td>
          <td>We may allow our business partners, service providers or vendors, as specified in our Privacy Policy, to use cookies on or outside the CAP for the same purposes identified above, including collecting information about your online activities over time and across different websites.</td>
        </tr>
        <tr>
          <td>Ads</td>
          <td>We work with web publishers, advertising networks, and service providers to deliver CAP ads on other web sites and services. Cookies may be used to serve you with advertisements that may be relevant to you and your interests on other web sites and services and to regulate the advertisements you receive and measure their effectiveness.</td>
        </tr>
      </table>
    </React.Fragment>
  );
}

const content = `
<strong>What are cookies?</strong><br />
<br />
A so-called “cookie” is a small text file placed on your computer, mobile phone, or other device when you visit a website, for the purpose of helping website providers to recognize your device the next time you visit their website.<br />
<br />
<strong>How we use cookies? (Purpose)</strong><br />
<br />
We use mainly Essential Cookies and Performance Cookies. Essential Cookies refer to cookies necessary for the website to function and cannot be switched off. If Essential Cookies are blocked, the website will not work properly with a computer or other device. Performance Cookies refer to cookies that allow the company to measure and improve the performance of its website by counting visits, return visits and providing it with information about the most visited webpages. For more information, we use the following types of cookies for the purposes explained in this chart :<br />
`;
