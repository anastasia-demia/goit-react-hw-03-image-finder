import { Hourglass } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      colors={['#C74540', '#ff6f59']}
    />
  )
};

// const red = '#C74540';
// const orangge = '#ff6f59';
// const drkgreen = '#254441';
// const mint = '#8FBBAE';
// const beige = '#F3EFC5';
