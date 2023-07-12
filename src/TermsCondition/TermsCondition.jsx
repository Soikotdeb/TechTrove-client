
import html2pdf from 'html2pdf.js';
import { Link } from 'react-router-dom';
import Condition from '../assets/image/termCondition_banner.webp'

const TermsCondition = () => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('terms-condition');
    const opt = {
      margin: 0.5,
      filename: 'terms_conditions.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const formatDate = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    
    <div
      id="terms-condition"
      className="p-4 border font-extrabold  mt-2 rounded shadow-lg transition duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-50"
      style={{
        backgroundImage: `url(${Condition})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
<div className="absolute bg-black bg-opacity-70"></div>
      <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>

      <p className="mb-4">
        Welcome to our website! These terms and conditions outline the rules and regulations for the use of our website.
      </p>

      <h3 className="text-xl font-bold mb-2">1. Acceptance of Terms</h3>
      <p className="mb-4">
        By accessing and using our website, you accept and agree to be bound by these terms and conditions. If you do not
        agree to these terms, please do not use our website.
      </p>

      <h3 className="text-xl font-bold mb-2">2. Intellectual Property Rights</h3>
      <p className="mb-4">
        Our website and its original content, features, and functionality are owned by us and are protected by international
        copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </p>

      <h3 className="text-xl font-bold mb-2">3. Limitation of Liability</h3>
      <p className="mb-">
        In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or
        use of or inability to access or use our website.
      </p>

      <h3 className="text-xl font-bold mb-2">4. Governing Law</h3>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance with the laws of your country/state and any
        disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts in your
        country/state.
      </p>
      <h3 className="text-xl font-bold  mb-2">5. User Conduct</h3>
      <p className=" mb-4">
        When using our website, you agree to abide by the following rules of conduct:
        <ul className="list-disc list-inside">
          <li>Do not engage in any illegal or unauthorized activities.</li>
          <li>Respect the privacy of other users and do not disclose their personal information without their consent.</li>
          <li>Do not upload or transmit any harmful or malicious content.</li>
          <li>Refrain from harassing, abusing, or threatening other users.</li>
          <li>Do not interfere with the proper functioning of our website or disrupt its infrastructure.</li>
          <li>Comply with all applicable laws and regulations while using our website.</li>
        </ul>
      </p>

      <h3 className="text-xl font-bold  mb-2">6. User Accounts</h3>
      <p className=" mb-4">
        You may be required to create a user account to access certain features or services on our website. When creating an account, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately if you suspect any unauthorized use of your account.
      </p>

      <h3 className="text-xl font-bold mb-2">7. Third-Party Websites</h3>
      <p className=" mb-4">
        Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of these third-party sites. You access and use such sites at your own risk, and you should review the terms and conditions and privacy policies of these sites before engaging with them.
      </p>

      <h3 className="text-xl font-bold mb-2">8. Modifications to the Terms</h3>
      <p className="mb-4">
        We reserve the right to modify or update these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting. It is your responsibility to review the terms periodically for any updates or changes. Continued use of our website after any modifications constitutes your acceptance of the revised terms.
      </p>

      <p className="text-sm">
        Last updated: {formatDate()} By <span className='text-orange-600 font-bold'>TechTrove</span>Team
      </p>

      <button
        className="mt-4 mr-3 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
      <Link to="/logIn">
      <button
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
      >
        GO BACK
      </button>
      </Link>
    </div>
  );
};

export default TermsCondition;

