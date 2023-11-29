type Props = {
  className?: string;
};

const FrontendMentorIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        d='M15.512 8.388a.448.448 0 0 1-.2-.047l-4.188-2.098a.509.509 0 0 1-.21-.202.594.594 0 0 1 0-.593.509.509 0 0 1 .21-.202l4.189-2.091a.442.442 0 0 1 .373-.011c.12.052.219.155.271.287a.607.607 0 0 1 .01.418.527.527 0 0 1-.257.303l-3.19 1.593 3.191 1.599c.102.05.185.14.236.25.05.112.066.24.043.362a.559.559 0 0 1-.17.31.457.457 0 0 1-.308.122ZM9.804 16c-4.605 0-8.63-3.477-9.788-8.456a.602.602 0 0 1 .051-.414.498.498 0 0 1 .298-.252.443.443 0 0 1 .37.057.543.543 0 0 1 .225.333c.51 2.19 1.656 4.127 3.256 5.51 1.6 1.382 3.566 2.131 5.588 2.13.13 0 .253.058.345.16a.58.58 0 0 1 .143.386.58.58 0 0 1-.143.386.463.463 0 0 1-.345.16ZM8.123 11.467a.463.463 0 0 1-.345-.16.58.58 0 0 1-.143-.385V.546A.58.58 0 0 1 7.778.16.463.463 0 0 1 8.123 0c.13 0 .253.058.345.16a.58.58 0 0 1 .143.386v10.376a.58.58 0 0 1-.143.386.463.463 0 0 1-.345.16Z'
      />
    </svg>
  );
};

export default FrontendMentorIcon;
