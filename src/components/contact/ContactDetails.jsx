import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const contacts = [
  {
    id: 1,
    name: "sanepa, lalitpur",
    icon: <FiMapPin />,
  },
  {
    id: 2,
    name: "prasannajoshitech@gmail.com",
    icon: <FiMail />,
  },
  {
    id: 3,
    name: "9803513810",
    icon: <FiPhone />,
  },
];

const ContactDetails = () => {
  return (
    <div className="w-full lg:w-1/2 mt-5">
      <div className="text-left max-w-xl px-6 overflow-hidden">
        <ul className="font-general-regular">
          {contacts.map((contact) => (
            <li className="flex " key={contact.id}>
              <i className="text-2xl text-gray-500 dark:text-gray-400 mr-4">
                {contact.icon}
              </i>
              <span className="text-base mb-4 text-ternary-dark dark:text-ternary-light">
                {contact.name}
              </span>
            </li>
          ))}
        </ul>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d656.4530896994182!2d85.30114802439653!3d27.684106242998535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1913b45a6b95%3A0x8f9c088a5de78b!2sBishnu%20Recondition%20House%20P.%20Ltd.!5e0!3m2!1sen!2snp!4v1734659495544!5m2!1sen!2snp"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactDetails;
