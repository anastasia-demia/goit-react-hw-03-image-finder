import { Hourglass } from "react-loader-spinner";


export const Loader = () => {
  const addStyle = {
    display: "block",
    margin: '100px auto',
  };

  return (
    <Hourglass
      visible={true}
      height="200"
      width="200"
      ariaLabel="hourglass-loading"
      colors={['#C74540', '#ff6f59']}
      wrapperStyle={addStyle}
    />
  )
};

// const red = '#C74540';
// const orangge = '#ff6f59';
// const drkgreen = '#254441';
// const mint = '#8FBBAE';
// const beige = '#F3EFC5';
