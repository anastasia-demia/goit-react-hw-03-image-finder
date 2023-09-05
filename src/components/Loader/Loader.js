import { Hourglass } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      colors={['#C3D350', '#E6F14A']}
    />
  )
};
