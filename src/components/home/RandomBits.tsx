interface Props {
}

const digits = [...Array.from({length: 10000})].map(() => {
  return Math.random() < .5 ? 0 : 1;
}).join(' ');

const RandomBits = ({}: Props) => {
  return (
    <>{digits}</>
  );
}

export default RandomBits
